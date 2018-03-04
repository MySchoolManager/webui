module.exports = function(app, firebaseInstance) {
  // Create all our routes and set up logic within those routes where required.
  app.get('/home', function(req, res) {
    res.render('home');
  });
};