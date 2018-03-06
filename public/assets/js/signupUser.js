// Create sign up object, add functions to object.
$(function() {
  $('.ui.dropdown').dropdown();
  
  app.signUp = (function() {
    var signUpObj = function() {
      // Show sign up page when sign up button is clicked.
      // Hide sign up page when cancel button is clicked.
      this.initialize = function(dashboardViewModel) {
        $('.form')
            .form({
              inline: true,
              fields: {
                firstName: ['empty', 'maxLength[140]'],
                lastName: ['empty', 'maxLength[140]'],
                address1: ['empty', 'maxLength[140]'],
                address2: ['empty', 'maxLength[140]'],
                zip: ['empty', 'number', 'maxLength[16]'],
                city: ['empty', 'maxLength[140]'],
                state: ['empty'],
                country: ['empty'],
                phone: ['empty', 'minLength[10]', 'maxLength[12]'],
                email: ['empty', 'email', 'maxLength[140]'],
                password: ['empty', 'minLength[6]', 'maxLength[140]']
              }
            })
            .on('submit', function(event) {
              event.stopPropagation();
              event.preventDefault();
              if ($(this).form('is valid')) {
                var formData = $(this).addClass('loading').form('get values');
                $(this).find('.processing').removeClass('hidden');
                $(this).find('.failed').addClass('hidden').find('p').text('');
                console.log('(**********' + formData.guid);
                $.ajax({
                   url: formData.guid ? `/api/update/user/${formData.guid}` :
                                        '/api/create/user',
                   data: formData,
                   method: 'POST'
                 })
                    .done(function() {
                      if (formData.guid) {
                        if (window.location.pathname.indexOf('signup') === -1) {
                          window.location = '/user/' + formData.guid;
                        } else {
                          window.location = '/signup/school';
                        }
                      } else {
                        app.firebaseInstance
                            .signInUser(formData.email, formData.password)
                            .then(function() {
                              if (window.location.pathname.indexOf('signup') !== -1) {
                                window.location = '/signup/school';
                              } else {
                                window.location = '/users';                                
                              }
                            });
                      }
                    })
                    .fail(function(error, textMessage, state) {
                      $(this).removeClass('loading');
                      $(this)
                          .find('.failed')
                          .removeClass('hidden')
                          .find('p')
                          .text(
                              error.responseJSON ? error.responseJSON.message :
                                                   textMessage);
                      $(this).find('.processing').addClass('hidden');
                    }.bind(this));
              }
            });

        if (!$('.form').form('get value', 'guid')) {
          const timeStamp = new Date().getTime();
          $('.form').form('set values', {
            firstName: 'First Name ' + timeStamp,
            lastName: 'Last Name ' + timeStamp,
            address1: 'Address 1 ' + timeStamp,
            address2: 'Address 2 ' + timeStamp,
            zip: timeStamp,
            city: 'City ' + timeStamp,
            state: 'CA',
            country: 'US',
            phone: 1234567890,
            email: `testuser@ucbtest.com`,
            password: 'TestValue'
          });
        }
      };
    };

    return signUpObj;
  })();
});
