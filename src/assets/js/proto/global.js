$(() => {
  // == Mobile-Style Navigation Menu ===========================================
  var _menuBtn = $('#global-nav');
  var _menu = $('#nav-menu');
  var _closeBtn = $('#nav-menu h2 span');

  $(_menuBtn).click(() => {
    _menu.addClass('open');
  });

  $(_closeBtn).click(() => {
    _menu.removeClass('open');
  });

  // == Fun with background elements ===========================================
  var bg_num = Math.floor(Math.random() * 4) + 1;
  // $("body").addClass("variant-" + bg_num);
  $('html').addClass('variant-' + bg_num);
});
