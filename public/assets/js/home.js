
$(function() {
  // fix menu when passed
  $('.masthead').visibility({
    once: false,
    onBottomPassed: function() {
      $('.fixed.menu').transition('fade in');
    },
    onBottomPassedReverse: function() {
      $('.fixed.menu').transition('fade out');
    }
  });

  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item');

  $('.signout').on('click', function(event){
    event.stopPropagation();
    event.preventDefault();
    app.firebaseInstance.signOutUser().then(function(){
      $.ajax({
        url: '/signout'
      });
    });
  });
});