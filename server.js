const Express = require("express");
const BodyParser = require("body-parser");
const DB = require("./models");
const env = process.env.NODE_ENV || 'development';
const APP = Express();

const FireBaseUtil = require('./firebaseutil');
const firebaseInstance = new FireBaseUtil(APP);
firebaseInstance.initialize();

const PORT = process.env.PORT || 3000;

// Serve static content for the APP from the "public" directory in the application directory.
APP.use(Express.static("public"));

// parse application/x-www-form-urlencoded
APP.use(BodyParser.urlencoded({ extended: false }));

// parse application/json
APP.use(BodyParser.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

APP.engine("handlebars", exphbs({ defaultLayout: "main" }));
APP.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./controllers/loginController")(APP, firebaseInstance);
require("./controllers/homeController")(APP, firebaseInstance);

let syncOpt = {};

DB.sequelize.sync(syncOpt).then(function() {
  APP.listen(PORT, function() {
    console.log("APP listening on PORT " + PORT);
  });
});
