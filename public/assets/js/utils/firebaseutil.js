// Declare a class for all Firebase related API calls
$(function() {
  app.firebaseUtil = (function() {
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
    var firebaseUtilObj = function() {
      this.handleAuthChange = this.handleAuthChange.bind(this);
      this.signOutUser = this.signOutUser.bind(this);
    };

    // Firebase util initialze
    // 1. Creats database instance
    // 2. Handles user authentication state change
    firebaseUtilObj.prototype.initialize = function() {
      firebase.initializeApp(config);
      this.database = firebase.database();
      const self = this;
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      firebase.auth().onAuthStateChanged(this.handleAuthChange);
    };

    // Handles authentication change
    firebaseUtilObj.prototype.handleAuthChange = function(user) {
      // If user is authenticated route to home
      // else route to sign in page
      if (window.location.pathname.indexOf('signup') === -1) {
        if (user) {
          window.location = '/home';
        } else if (window.location.pathname !== '/') {
          window.location = '/';
        }
      } else if (window.location.pathname.indexOf('user') !== -1) {
        if (user && window.location.pathname.indexOf(user.uid) === -1) {
          window.location = `/signup/user/${user.uid}`;
        }
      } else if (window.location.pathname.indexOf('school') !== -1) {
        if (user && window.location.pathname.indexOf(user.uid) === -1) {
          window.location = `/signup/school/${user.uid}`;
        }
      }
    };

    // Sign In user utility
    // @param {string} email validated user email
    // @param {string} password validated user password
    firebaseUtilObj.prototype.signInUser = function(email, password) {
      return firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .catch(this.erroCallBack);
    };

    // Sends password reset email
    firebaseUtilObj.prototype.resetPassword = function(email, successCallback) {
      firebase.auth()
          .sendPasswordResetEmail(email)
          .then(successCallback)
          .catch(this.erroCallBack);
    };

    // Sign out user utility
    firebaseUtilObj.prototype.signOutUser = function() {
      this.removeOnlineUser();
      firebase.auth().signOut();
    };

    // Redirect to error page
    firebaseUtilObj.prototype.erroCallBack = function() {
      window.location = '/servererror';
    };

    // Function to watch a list for child added event
    // @param {string} reference to the list in firebase database that has to be watched
    // @param {function} handler call back function to handle when a child is added to the list
    firebaseUtilObj.prototype.watchList = function(reference, handler) {
      this.database.ref(reference).on('child_added', handler);
    };

    // Function to stop watching a list
    // @param {string} reference to the list in firebase database that has to be watched
    firebaseUtilObj.prototype.stopWatchingList = function(reference) {
      this.database.ref(reference).off('child_added');
    };

    return firebaseUtilObj;
  })();
});
