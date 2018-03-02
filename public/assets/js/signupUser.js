// Create sign up object, add functions to object.
$(function() {
  app.signUp = (function() {
    var signUpObj = function() {
      this.showSignUpErrors = this.showSignUpErrors.bind(this);
      this.hideSignUpErrors = this.hideSignUpErrors.bind(this);
      this.createUser = this.createUser.bind(this);
    };

    // Show sign up page when sign up button is clicked.
    // Hide sign up page when cancel button is clicked.
    signUpObj.prototype.initialize = function(dashboardViewModel) {
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
              phone: ['empty', 'number', 'minLength[10]', 'maxLength[10]'],
              email: ['empty', 'email', 'maxLength[140]'],
              password: ['empty', 'minLength[6]', 'maxLength[140]']
            }
          })
          .on('submit', function(event) {
            event.stopPropagation();
            event.preventDefault();
            console.log();
            if ($(this).form('is valid')) {
              var formData = $(this).addClass('loading').form('get values');
              $(this).find('.processing').removeClass('hidden');
              $(this).find('.failed').addClass('hidden').find('p').text('');
              $.ajax({
                 url: formData.guid ? `/api/update/user/${formData.guid}` :
                                      '/api/create/user',
                 data: formData,
                 method: 'POST'
               })
                  .done(function() {
                    app.firebaseInstance
                        .signInUser(formData.email, formData.password)
                        .then(function() {
                          window.location = '/signup/school';
                        });
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
        $('.form').form('set values', {
          firstName: 'Test Value',
          lastName: 'Test Value',
          address1: 'Test Value',
          address2: 'Test Value',
          zip: 123456,
          city: 'Test Value',
          state: 'CA',
          country: 'US',
          phone: 1234567890,
          email: `test${new Date().getTime()}@test.com`,
          password: 'TestValue'
        });
      }
    };

    // Remove is hidden class from error container to display sign up errors.
    signUpObj.prototype.showSignUpErrors = function(error) {};

    // Add is hidden class from error container to hide sign up errors.
    signUpObj.prototype.hideSignUpErrors = function() {};

    // Create create user function.
    // Hide sign up errors and popover.
    signUpObj.prototype.createUser = function(event) {
      event.preventDefault();
      this.hideSignUpErrors();
      $('[data-toggle="popover"]').addClass('is-hidden');
      this.errorMessage.text('');
      const email = this.email.val().trim();
      const password = this.password.val().trim();
      const confirmPassword = this.confirmPassword.val().trim();
      let message = '';
      $(event.target)
          .find('.form-control')
          .removeClass('form-control--invalid');

      let valid = true;

      // Call validator.js to validate email input.
      // If email addreess is invalid add form control invalid class and display
      // error message
      if (!this.validatorUtil.validateEmail(email)) {
        valid = false;
        this.email.addClass('form-control--invalid');
        message = 'Invalid email format !!';
      }

      // If password is invalid add form control invalid class and display error
      // message
      if (valid && !this.validatorUtil.validatePassword(password)) {
        valid = false;
        this.password.addClass('form-control--invalid');
        message = 'Invalid password format !!';
        $('[data-toggle="popover"]').removeClass('is-hidden').popover();
      }

      // If passwords do not match add form control invalid class and display
      // error message
      if (valid &&
          !this.validatorUtil.validateAreEqual(password, confirmPassword)) {
        valid = false;
        this.password.addClass('form-control--invalid');
        this.confirmPassword.addClass('form-control--invalid');
        message = 'Passwords did not match';
      }

      // If anything is invalid display messages.
      if (!valid) {
        this.showSignUpErrors({message: message});
        return false;
      }

      this.firebaseUtil.createUser(email, password, this.showSignUpErrors);
    };

    return signUpObj;
  })();
});
