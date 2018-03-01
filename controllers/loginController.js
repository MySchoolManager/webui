var express = require("express");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/signup/user", function(req, res) {
    res.render("signupuser");
});

router.get("/signup/school", function(req, res) {
    res.render("signupschool");
});

// Export routes for server.js to use.
module.exports = router;
