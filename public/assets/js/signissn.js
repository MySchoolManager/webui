$(document).ready(function() {


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