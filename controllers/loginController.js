const db = require('../models');

module.exports = function(app, firebaseInstance) {
  // Create all our routes and set up logic within those routes where required.
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/forgot', function(req, res) {
    res.render('forgot', {email: 'test'});
  });

  app.get('/signup', function(req, res) {
      res.redirect('/signup/user');
  });

  app.get('/signup/user', function(req, res) {
    if (req.session.uid) {
      res.redirect(`/signup/user/${req.session.uid}`);
    } else {
      res.render('signupuser');
    }
  });

  app.get('/signup/user/:uid', function(req, res) {
    db.User.findOne({where: {guid: req.params.uid}})
        .then(function(user) {
          if (user && user.dataValues) {
            res.render('signupuser', user.dataValues);
          } else {
            res.render('signupuser');
          }
        })
        .catch(function() {
          res.render('servererror');
        });
  });

  app.get('/signup/school', function(req, res) {
    if (req.session.firetoken) {
      firebaseInstance.getUser(req.session.firetoken)
          .then(function(decodedToken) {
            if (decodedToken) {
              res.redirect(`/signup/school/${req.session.uid}`);
            } else {
              res.redirect('/');
            }
          })
          .catch(function(error) {
            res.redirect('/servererror');
          });
    } else {
      res.render('signupschool');
    }
  });

  app.get('/signup/school/:uid', function(req, res) {
    db.User.findOne({where: {guid: req.params.uid}})
        .then(function(user) {
          if (user.SchoolId) {
            db.School.findOne({where: {id: user.SchoolId}})
                .then(function(school) {
                  if (school && school.dataValues) {
                    res.render('signupschool', school.dataValues);
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
  });

  app.get('/signup/success', function(req, res) {
    res.render('signupsuccess');
  });

  app.post('/api/create/user', function(req, res) {
    firebaseInstance.createUser(req.body)
        .then(function(data) {
          const userData = Object.assign({}, req.body);
          userData.guid = data.uid;
          req.session.uid = data.uid;          
          delete userData.password;

          db.User.create(userData)
              .then(function(user) {
                res.status(200).send({message: 'User created'});
              })
              .catch(function(error) {
                res.status(500).send({message: error.message});
              });
        })
        .catch(function(error) {
          res.status(400).send({message: error.message});
        });
  });

  app.post('/api/update/user/:uid', function(req, res) {
    const userData = Object.assign({}, req.body);
    const guid = userData.guid;
    delete userData.guid;
    delete userData.id;
    delete userData.email;

    db.User.update(userData, {where: {guid: guid}})
        .then(function() {
          res.status(200).send({message: 'User updated'});
        })
        .catch(function(error) {
          res.status(500).send({message: error.message});
        });
  });

  app.post('/api/create/school', function(req, res) {
    firebaseInstance.createSchool()
        .then(function(data) {
          const schoolData = Object.assign({}, req.body);
          schoolData.guid = data.uid;
          delete schoolData.password;

          db.School.create(schoolData)
              .then(function() {
                res.status(200).send({message: 'School created'});
              })
              .catch(function(error) {
                res.status(500).send({message: error.message});
              });
        })
        .catch(function(error) {
          res.status(400).send({message: error.message});
        });
  });

  app.post('/api/update/school', function(req, res) {
    const schoolData = Object.assign({}, req.body);
    const guid = schoolData.guid;
    delete schoolData.guid;
    delete schoolData.id;

    db.School.update(schoolData, {where: {guid: guid}})
        .then(function() {
          res.status(200).send({message: 'School updated'});
        })
        .catch(function(error) {
          res.status(500).send({message: error.message});
        });
  });

  app.get('/servererror', function(req, res) {
    res.render('servererror');
  });
};
