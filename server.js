const Express = require('express');
const BodyParser = require('body-parser');
const DB = require('./models');
const env = process.env.NODE_ENV || 'development';
const APP = Express();
const session = require('express-session');

const FireBaseUtil = require('./firebaseutil');
const firebaseInstance = new FireBaseUtil(APP);
firebaseInstance.initialize();

const PORT = process.env.PORT || 3000;

// Serve static content for the APP from the "public" directory in the
// application directory.
APP.use(Express.static('public'));

// parse application/x-www-form-urlencoded
APP.use(BodyParser.urlencoded({extended: false}));

// parse application/json
APP.use(BodyParser.json());

// Set Handlebars.
const exphbs = require('express-handlebars');

var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  defaultLayout: 'main',
  helpers: {
      equals: function (lhs, rhs) { return lhs === rhs ? "selected" : ''; },
      includes: function (arrayInput, item) { return arrayInput && arrayInput.split(',').includes(item) ? "selected" : ''; }
  }
});

APP.engine('handlebars', hbs.engine);
APP.set('view engine', 'handlebars');

// Import routes and give the server access to them.
require('./controllers/loginController')(APP, firebaseInstance);
require('./controllers/signUpController')(APP, firebaseInstance);
require('./controllers/homeController')(APP, firebaseInstance);


let syncOpt = {};

function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.redirect('/servererror');
};

// APP.use(errorHandler);

DB.sequelize.sync({ }).then(function() {
  APP.listen(PORT, function() {
    console.log('APP listening on PORT ' + PORT);
  });
});
