const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);
const firebase = require('firebase-admin');

// Declare a class for all Firebase related API calls
// Firebase configuration details.
const config = {
  databaseURL: 'https://myschoolmanager-96a69.firebaseio.com',
  serviceAccountKey: './config/MySchoolManager-2ed8d8dfcd47.json'
};

// Firebase util constructor
const FireBaseUtil = (function() {
  var fireBase = function(app) {
    this.app = app;

    // Firebase util initialze
    // 1. Creats database instance
    // 2. Handles user authentication state change
    // @param {function} showSignIn callback function to route user to sign page
    // @param {function} showDashboard callback function to route user to dashboard page
    this.initialize = function() {
      const ref = firebase.initializeApp({
        credential: firebase.credential.cert(config.serviceAccountKey),
        databaseURL: config.databaseURL
      });

      this.app.use(session({
        store: new FirebaseStore({
          database: ref.database()
        }),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
      }));

      this.database = ref.database();
    };

    // Creates user
    // @param {string} email validated user email
    // @param {string} password validated user password
    // @param {function} erroCallBack callback function to call when create user fails
    this.createUser = function(user) {
      return firebase.auth().createUser(
          {email: user.email, password: user.password});
    };

    this.createSchool = function() {
      return this.pushChild('/schools', {});
    };

    this.createNotification = function() {
      return this.pushChild('/notifications', {});
    };

    // Function to add a child to a list in firebase database
    // @param {string} reference to the list in firebase database to which child has to be added
    // @param {object} child child object that needs to be added
    this.pushChild = function(reference, child) {
      return this.database.ref(reference).push(child);
    };

    this.signInUser = function(email, password) {
      return firebase.auth()
          .signInWithEmailAndPassword(email, password);
    };

    this.signOutUser = function() {
      firebase.auth().signOut();
    };

    // Removes a child from list of elements in Firebase
    this.removeChild = function(reference) {
      return this.database.ref(reference).remove();
    };

    // Gets Firebase object for one time
    this.getFirebaseObject = function(reference, callback) {
      this.database.ref(reference).once('value', callback);
    };
  };
  return fireBase;
})();

module.exports = FireBaseUtil;