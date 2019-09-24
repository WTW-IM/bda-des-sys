import 'bootstrap';

import '../scss/index.scss';

$('#alert').click(() => {
  alert('jQuery works!');
});

// Your jQuery code


var scrollOffset = 50;

$('body').scrollspy({
  offset: scrollOffset + 5
});

$('#es-ui-side-nav a').click(function(event) {
  event.preventDefault();
  $($(this).attr('href'))[0].scrollIntoView();
  window.location.hash = $(this).attr('href');
  scrollBy(0, -scrollOffset);
});




$('.multi-tier ul a').click(function(){
  var _this = $(this);
  _this.siblings().removeClass('active');
  _this.addClass('active');
});

$('.multi-tier .folder > a').click(function() {
  var fldr = $(this).parent();
  if (fldr.hasClass('open')) {
    fldr.removeClass('open');
  } else {
    fldr.addClass('open');
  }
  return false;
});

var scrollOffset = 50; $('body').scrollspy({
  offset: scrollOffset + 5
}); $('#es-ui-side-nav a').click(function (event) {
  event.preventDefault();
  $($(this).attr('href'))[0].scrollIntoView();
  window.location.hash = $(this).attr('href');
  scrollBy(0, -scrollOffset);
});



if (navigator.userAgent.indexOf("Safari") > -1) {
  $('[data-trigger="focus"]').click(function () {
    $(this).focus();
  });
}