const db = require('../models');

module.exports = function(app, firebaseInstance) {
  // Create all our routes and set up logic within those routes where required.
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/forgot', function(req, res) {
    res.render('forgot');
  });

  app.get('/resetsuccess/:email', function(req, res) {
    res.render('resetsuccess', {email: req.params.email});
  });

  app.get('/servererror', function(req, res) {
    res.render('servererror');
  });

  app.post('/api/signin/:uid', function(req, res) {
    if (req.session && !req.session.uid) {
      req.session.uid = req.params.uid;
    }

    db.User.findOne({where: {guid: req.session.uid}}).then(function(user) {
      if (user && user.dataValues) {
        if (req.session && !req.session.sid) {
          req.session.sid = user.dataValues.SchoolId;
        }

        res.status(200).send({message: 'User Logged in'});
      }
    });
  });

  app.get('/signout', function(req, res) {
    if (req.session) {
      req.session.uid = null;
      req.session.sid = null;
    }
    res.redirect('/');
  });
};
