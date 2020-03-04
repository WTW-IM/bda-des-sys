import "bootstrap";

import "../scss/index.scss";

$("#alert").click(() => {
  alert("jQuery works!");
});

// Your jQuery code

$(".multi-tier ul a").click(function() {
  var _this = $(this);
  _this.siblings().removeClass("active");
  _this.addClass("active");
});

$(".multi-tier .folder > a").click(function() {
  var fldr = $(this).parent();
  if (fldr.hasClass("open")) {
    fldr.removeClass("open");
  } else {
    fldr.addClass("open");
  }
  return false;
});

if (navigator.userAgent.indexOf("Safari") > -1) {
  $('[data-trigger="focus"]').click(function() {
    $(this).focus();
  });
}
