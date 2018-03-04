const db = require('../models');

module.exports = function(app, firebaseInstance) {
  // Create all our routes and set up logic within those routes where required.
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/forgot', function(req, res) {
    res.render('forgot', {email: 'test'});
  });

  app.get('/servererror', function(req, res) {
    console.log('servererror');
    res.render('servererror');
  });

  app.post('/api/signin/:uid', function(req, res) {
    req.session.uid = req.params.uid;
    res.status(200).send({message: 'User Logged in'});
  });

  app.get('/signout', function(req, res) {
    req.session.uid = null;
    res.redirect('/');
  });
};
