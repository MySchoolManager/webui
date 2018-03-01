var express = require("express");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/forgot", function(req, res) {
    res.render("forgot", {email: "test"});
});

router.get("/signup", function(req, res) {
    res.redirect("/signup/user");
});

router.get("/signup/user", function(req, res) {
    res.render("signupuser");
});

router.get("/signup/school", function(req, res) {
    res.render("signupschool");
});

router.get("/signup/success", function(req, res) {
    res.render("signupsuccess");
});

// Export routes for server.js to use.
module.exports = router;
