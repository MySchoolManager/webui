// Create sign up object, add functions to object.
$(function() {
  // ready event
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
                name: ['empty', 'maxLength[140]'],
                address1: ['empty', 'maxLength[140]'],
                address2: ['empty', 'maxLength[140]'],
                zip: ['empty', 'number', 'maxLength[16]'],
                city: ['empty', 'maxLength[140]'],
                state: ['empty'],
                country: ['empty'],
                type: ['empty'],
                phone: ['empty', 'number', 'minLength[10]', 'maxLength[10]'],
              }
            })
            .on('submit', function(event) {
              event.stopPropagation();
              event.preventDefault();
              if ($(this).form('is valid')) {
                var formData = $(this).addClass('loading').form('get values');
                formData.type = formData.type.join();
                $(this).find('.processing').removeClass('hidden');
                $(this).find('.failed').addClass('hidden').find('p').text('');
                $.ajax({
                   url: formData.guid ? `/api/update/school` :
                                        '/api/create/school',
                   data: formData,
                   method: 'POST'
                 })
                    .done(function() {
                      if (window.location.pathname.indexOf('signup') === -1) {
                        window.location = '/school';
                      } else {
                        window.location = '/signup/success';
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
        const types = $('.form').form('get value', 'types');
        if (types && types.length) {
          $('.form').form('set values', {type: types.split(',')});
        }

        if (!$('.form').form('get value', 'guid')) {
          const timeStamp = new Date().getTime();
          $('.form').form('set values', {
            name: 'School Name ' + timeStamp,
            address1: 'Address 1 ' + timeStamp,
            address2: 'Address 2 ' + timeStamp,
            zip: timeStamp,
            city: 'City ' + timeStamp,
            state: 'CA',
            country: 'US',
            phone: 1234567890,
            type: ['HS', 'MS']
          });
        }
      };
    };

    return signUpObj;
  })();
});
