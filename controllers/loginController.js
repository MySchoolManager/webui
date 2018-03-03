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
    res.render('signupuser');
  });

  app.get('/signup/user/:uid', function(req, res) {
    db.User.findOne({where: {guid: req.params.uid}})
        .then(function(user) {
          res.render('signupuser', user.dataValues);
        })
        .catch(function() {
          res.render('servererror');
        });
  });

  app.get('/signup/school', function(req, res) {
    res.render('signupschool');
  });

  app.get('/signup/success', function(req, res) {
    res.render('signupsuccess');
  });

  app.post('/api/create/user', function(req, res) {
    firebaseInstance.createUser(req.body)
        .then(function(data) {
          const userData = Object.assign({}, req.body);
          userData.guid = data.uid;
          delete userData.password;

          db.User.create(userData)
              .then(function(dbTodo) {
                // We have access to the new todo as an argument inside of the
                // callback function
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

    console.log(guid);
    console.log(userData);

    db.User.update(userData, {where: {guid: guid}})
        .then(function(dbTodo) {
          // We have access to the new todo as an argument inside of the
          // callback function
          res.status(200).send({message: 'User created'});
        })
        .catch(function(error) {
          res.status(500).send({message: error.message});
        });
  });


  app.get('/servererror', function(req, res) {
    res.render('servererror');
  });
};
