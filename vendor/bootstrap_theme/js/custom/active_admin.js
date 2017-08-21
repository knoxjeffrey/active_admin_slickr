$(document).ready(function() {
  // Add meta view port
  $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

  // Dropdown menus
  $(window).resize(function(){
    if ($(window).width() <= 768) {
      $('.header-item.tabs').addClass('collapse');
    } else {
      $('.header-item.tabs').removeClass('collapse');
    }
  });

  html_responsive = ' \
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation"> \
      <span class="navbar-toggler-bar bar1"></span> \
      <span class="navbar-toggler-bar bar2"></span> \
      <span class="navbar-toggler-bar bar3"></span> \
    </button> \
  '

  $(html_responsive).prependTo('#header');

  $(".header-item").wrapAll( "<div class='navbar-collapse collapse' id='navbarResponsive' aria-expanded='false'>");

  $(".dropdown_menu_button").attr("data-toggle", "dropdown");

  $(".has_nested a:first").attr("data-toggle", "dropdown");

  $(".datepicker").addClass("date-picker form-control");
  $(".datepicker").attr("data-datepicker-color", "primary");
  $(".date-picker").removeClass("datepicker");
});
