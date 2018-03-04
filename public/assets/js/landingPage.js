// Create landing page class
$(function() {
  app.landingPage = (function() {
    // Landing page constructor
    let landingPageObj = function() {};

    // If user is signed in, show topics and initial message container with
    // comic strip. Else, hide topics and initial message container.
    landingPageObj.prototype.initialize = function() {
      $('#signin')
          .form({
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
          })
          .on('submit', function(event) {
            event.stopPropagation();
            event.preventDefault();
            if ($(this).form('is valid')) {
              var formData = $(this).addClass('loading').form('get values');
              $(this).find('.failed').addClass('hidden').find('p').text('');
              app.firebaseInstance.signInUser(formData.email, formData.password)
                  .then(function(user) {
                    if (user && user.uid) {
                      $.ajax({
                         url: `/api/signin/${user.uid}`,
                         data: formData,
                         method: 'POST'
                       })
                          .done(function() {
                            window.location('/home');
                          })
                          .fail(function(error, textMessage, state) {
                            $(this).removeClass('loading');
                            $(this)
                                .find('.failed')
                                .removeClass('hidden')
                                .find('p')
                                .text(
                                    error.responseJSON ?
                                        error.responseJSON.message :
                                        textMessage);
                          }.bind(this));
                    } else {
                      $(this).removeClass('loading');
                      $(this)
                          .find('.failed')
                          .removeClass('hidden')
                          .find('p')
                          .text('Email or Password is incorrect');
                    }
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
