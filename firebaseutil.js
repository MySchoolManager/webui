const firebase = require('firebase');

// Declare a class for all Firebase related API calls
// Firebase configuration details.
const config = {
  apiKey: 'AIzaSyDYOXE6M2zG0SknHUzJAEGk504MCzCOnIE',
  authDomain: 'myschoolmanager-96a69.firebaseapp.com',
  databaseURL: 'https://myschoolmanager-96a69.firebaseio.com',
  projectId: 'myschoolmanager-96a69',
  storageBucket: 'myschoolmanager-96a69.appspot.com',
  messagingSenderId: '244490455917'
};

// Firebase util constructor
const FireBaseUtil = function() {
  // Firebase util initialze
  // 1. Creats database instance
  // 2. Handles user authentication state change
  // @param {function} showSignIn callback function to route user to sign page
  // @param {function} showDashboard callback function to route user to dashboard page
  this.initialize = function(showSignIn, showDashboard) {
    firebase.initializeApp(config);
    this.database = firebase.database();
  };

  // Creates user
  // @param {string} email validated user email
  // @param {string} password validated user password
  // @param {function} erroCallBack callback function to call when create user fails
  this.createUser = function(user) {
    return firebase.auth().createUserWithEmailAndPassword(
        user.email, user.password);
  };

  // Function to add a child to a list in firebase database
  // @param {string} reference to the list in firebase database to which child has to be added
  // @param {object} child child object that needs to be added
  this.pushChild = function(reference, child) {
    return this.database.ref(reference).push(child);
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

const firebaseInstance = new FireBaseUtil();
firebaseInstance.initialize();

module.exports = firebaseInstance;