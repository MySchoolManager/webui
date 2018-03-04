// Create landing page class
$(function() {
  app.landingPage = (function() {
    // Landing page constructor
    let landingPageObj = function() {};
    // If user is signed in, show topics and initial message container with
    // comic strip. Else, hide topics and initial message container.
    landingPageObj.prototype.initialize = function() {
      $('#resetPassword')
          .form({
            inline: true,
            fields: {
              email: {
                identifier: 'email',
                rules: [
                  {type: 'empty', prompt: 'Please enter your e-mail'},
                  {type: 'email', prompt: 'Please enter a valid e-mail'}
                ]
              }
            }
          })
          .on('submit', function(event) {
            event.stopPropagation();
            event.preventDefault();
            if ($(this).form('is valid')) {
              var formData = $(this).addClass('loading').form('get values');
              $(this).find('.failed').addClass('hidden').find('p').text('');
              app.firebaseInstance.resetPassword(formData.email)
                  .then(function() {
                    $(this).removeClass('loading');    
                    window.location = '/resetsuccess/' + formData.email;                
                  }.bind(this))
                  .catch(function(error) {
                    $(this).removeClass('loading');
                    $(this)
                        .find('.failed')
                        .removeClass('hidden')
                        .find('p')
                        .text('Email or Password is incorrect');
                  }.bind(this));
            }
          });
    };

    return landingPageObj;
  })();
});
