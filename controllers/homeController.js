const db = require('../models');

module.exports = function(app, firebaseInstance) {
  // Create all our routes and set up logic within those routes where required.
  app.get('/home', function(req, res) {
    res.render('home');
  });

  app.get('/school', function(req, res) {
    if (req.session && req.session.uid) {
      db.User.findOne({where: {guid: req.session.uid}})
          .then(function(user) {
            if (user.SchoolId) {
              db.School.findOne({where: {id: user.SchoolId}})
                  .then(function(school) {
                    if (school && school.dataValues) {
                      school.dataValues.readonly = true;
                      res.render('school/school', school.dataValues);
                    } else {
                      res.render('signupschool');
                    }
                  })
                  .catch(function() {
                    res.render('servererror');
                  });
            } else {
              res.redirect('/signup/school');
            }
          })
          .catch(function() {
            res.redirect('/signout');
          });
    } else {
      res.redirect('/');
    }
  });

  app.get('/edit/school', function(req, res) {
    if (req.session && req.session.uid) {
      db.User.findOne({where: {guid: req.session.uid}})
          .then(function(user) {
            if (user.SchoolId) {
              db.School.findOne({where: {id: user.SchoolId}})
                  .then(function(school) {
                    if (school && school.dataValues) {
                      school.dataValues.readonly = false;
                      res.render('school/school', school.dataValues);
                    } else {
                      res.render('signupschool');
                    }
                  })
                  .catch(function() {
                    res.render('servererror');
                  });
            } else {
              res.render('signupschool');
            }
          })
          .catch(function() {
            res.render('servererror');
          });
    } else {
      res.redirect('/');
    }
  });

  app.get('/users', function(req, res) {
    res.render('users/users');
  });

  app.get('/user/:uid', function(req, res) {
    db.User.findOne({where: {guid: req.params.uid}})
        .then(function(user) {
          if (user && user.dataValues) {
            user.dataValues.readonly = true;
            res.render('users/user', user.dataValues);
          } else {
            res.render('signupuser');
          }
        })
        .catch(function() {
          res.render('servererror');
        });
  });

  app.get('/edit/user/:uid', function(req, res) {
    db.User.findOne({where: {guid: req.params.uid}})
        .then(function(user) {
          if (user && user.dataValues) {
            user.dataValues.readonly = false;
            res.render('users/user', user.dataValues);
          } else {
            res.render('signupuser');
          }
        })
        .catch(function() {
          res.render('servererror');
        });
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