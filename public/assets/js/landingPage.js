// Create landing page class
$(function() {
  app.landingPage = (function() {
    // Landing page constructor
    let landingPageObj = function() {};

    // If user is signed in, show topics and initial message container with
    // comic strip. Else, hide topics and initial message container.
    landingPageObj.prototype.initialize = function() {
      $('#signin').form({
        inline: true,        
        fields: {
          email: {
            identifier: 'email',
            rules: [
              {type: 'empty', prompt: 'Please enter your e-mail'},
              {type: 'email', prompt: 'Please enter a valid e-mail'}
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {type: 'empty', prompt: 'Please enter your password'}, {
                type: 'length[6]',
                prompt: 'Your password must be at least 6 characters'
              }
            ]
          }
        }
      });
    };

    return landingPageObj;
  })();
});
