// Create sign up object, add functions to object.
$(function() {
  app.notification = (function() {
    var notificationObj = function() {
      // Show sign up page when sign up button is clicked.
      // Hide sign up page when cancel button is clicked.
      this.initialize = function(dashboardViewModel) {
        $('.form')
            .form({
              inline: true,
              fields: {
                subject: ['empty', 'maxLength[140]'],
                description: ['empty', 'maxLength[140]']
              }
            })
            .on('submit', function(event) {
              event.stopPropagation();
              event.preventDefault();
              if ($(this).form('is valid')) {
                var formData = $(this).addClass('loading').form('get values');
                $(this).find('.processing').removeClass('hidden');
                $(this).find('.failed').addClass('hidden').find('p').text('');
                $.ajax({
                   url: formData.guid ?
                       `/api/update/notification/${formData.guid}` :
                       '/api/create/notification',
                   data: formData,
                   method: 'POST'
                 })
                    .done(function() {
                      if (formData.guid) {
                        window.location = '/notification/' + formData.guid;
                      } else {
                        window.location = '/notifications';
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
            subject: 'Subject ' + timeStamp,
            description: 'Description ' + timeStamp
          });
        }
      };
    };

    return notificationObj;
  })();
});
