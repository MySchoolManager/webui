$(document).ready(function() {
  $('#signin').form({
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

  $('#resetPassword').form({
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {type: 'empty', prompt: 'Please enter your e-mail'},
          {type: 'email', prompt: 'Please enter a valid e-mail'}
        ]
      }
    }
  });

  // ToDo Save user
  $('#signupUserSubmit').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.location = '/signup/school';
  });

  // ToDo Save School  
  $('#signupSchoolSubmit').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.location = '/signup/success';
  });

  // ToDo Verify authentication and go to home
  $('#goToDashboard').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.location = '/home';
  });
});