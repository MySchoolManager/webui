$(function() {
  $('#goToDashboard').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.location = '/home';
  });
});