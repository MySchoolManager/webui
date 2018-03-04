module.exports = function(app, firebaseInstance) {
  // Create all our routes and set up logic within those routes where required.
  app.get('/home', function(req, res) {
    res.render('home');
  });

  app.get('/school', function(req, res) {
    res.render('school/readonlyschool');
  });

  app.get('/edit/school', function(req, res) {
    res.render('school/editableschool');
  });

  app.get('/users', function(req, res) {
    res.render('users/users');
  });

  app.get('/user/:uid', function(req, res) {
    res.render('users/readonlyuser');
  });

  app.get('/edit/user/:uid', function(req, res) {
    res.render('users/editableuser');
  });

  app.get('/notifications', function(req, res) {
    res.render('notifications/notifications');
  });

  app.get('/notification/:uid', function(req, res) {
    res.render('notifications/readonlynotification');
  });

  app.get('/edit/notification/:uid', function(req, res) {
    res.render('notifications/editablenotification');
  });
};