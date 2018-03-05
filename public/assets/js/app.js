// Create app name space
const app = {};

$(function() {
  if (app.firebaseUtil) {
    app.firebaseInstance = new app.firebaseUtil();
    app.firebaseInstance.initialize();
  }

  if (app.landingPage) {
    // Create and initialize landing page
    const landingPage = new app.landingPage();
    landingPage.initialize();
  }

  if (app.signUp) {
    const signUp = new app.signUp();
    signUp.initialize();
  }

  if (app.notification) {
    const notification = new app.notification();
    notification.initialize();
  }
});
