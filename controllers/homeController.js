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
    if (req.session && req.session.sid) {
      db.User.findAll({where: {SchoolId: req.session.sid}})
          .then(function(users) {
            res.render('users/users', {users: users});
          })
          .catch(function() {
            res.render('servererror');
          });
    } else {
      res.redirect('/');
    }
  });

  app.get('/notifications', function(req, res) {
    if (req.session && req.session.sid) {
      db.Message.findAll({where: {SchoolId: req.session.sid}})
          .then(function(messages) {
            res.render('notifications/notifications', {messages: messages});
          })
          .catch(function() {
            res.render('servererror');
          });
    } else {
      res.redirect('/');
    }
  });

  app.get('/notification/:uid', function(req, res) {
    db.Message.findOne({where: {guid: req.params.uid}})
        .then(function(message) {
          if (message && message.dataValues) {
            message.dataValues.readonly = true;
            res.render('notifications/notification', user.dataValues);
          }
        })
        .catch(function() {
          res.render('servererror');
        });
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

  app.get('/create/user', function(req, res) {
    res.render('users/user', { guid: req.session ? req.session.uid : null });
  });

  app.get('/create/notification', function(req, res) {
    res.render('notifications/notification');
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

  app.get('/edit/notification/:uid', function(req, res) {
    db.Message.findOne({where: {guid: req.params.uid}})
        .then(function(notification) {
          if (notification && notification.dataValues) {
            notification.dataValues.readonly = false;
            res.render('notifications/notification', notification.dataValues);
          }
        })
        .catch(function() {
          res.render('servererror');
        });
  });

  app.post('/api/create/notification', function(req, res) {
    firebaseInstance.createNotification(req.body)
        .then(function(data) {
          const notificationData = Object.assign({}, req.body);
          notificationData.guid = data.uid;
          if (req.session && !req.session.uid) {
            req.session.uid = data.uid;
          }

          if (req.session && req.session.sid) {
            notificationData.SchoolId = req.session.sid;
          }

          notificationData.timestamp = new Date().getTime();
          db.Message.create(notificationData)
              .then(function(notification) {
                res.status(200).send({message: 'notification created'});
              })
              .catch(function(error) {
                res.status(500).send({message: error.message});
              });
        })
        .catch(function(error) {
          res.status(400).send({message: error.message});
        });
  });

  app.post('/api/update/notification/:uid', function(req, res) {
    const notificationData = Object.assign({}, req.body);
    const guid = notificationData.guid;
    delete notificationData.guid;
    delete notificationData.id;

    db.Message.update(notificationData, {where: {guid: guid}})
        .then(function() {
          res.status(200).send({message: 'Notification updated'});
        })
        .catch(function(error) {
          res.status(500).send({message: error.message});
        });
  });
};