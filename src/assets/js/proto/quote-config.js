$(() => {
  var _what = $('.step.what');
  var _medicare = $('.step.who.medicare');
  var _ifp = $('.step.who.ifp');
  var _whenWhere = $('.step.when-where');
  var _cta = $('.cta');
  var fadeTime = 250;
  var _selectedProduct;

  // == Check for selected HHMs for hide/show of date, ZIP, and CTA ============
  var checkSelected = function () {
    if ($('.step.who:visible .btn-icon').hasClass('selected')) {
      _whenWhere.fadeIn(fadeTime, () => {
        _cta.fadeIn(fadeTime);
      });
    } else {
      _cta.fadeOut(fadeTime, () => {
        _whenWhere.fadeOut(fadeTime);
      });
    }
  };

  // == People selection =======================================================
  $('.option-selector .btn-icon').not(':disabled, .disabled').click(function () {
    var _this = $(this);
    var multiSel = _this.parent().parent().hasClass('multi-select');

    if (multiSel) {
      if (_this.hasClass('selected')) {
        _this.removeClass('selected');
      } else {
        _this.addClass('selected');
      }
    } else {
      var sibs = _this.parent().parent().find('.btn-icon');
      sibs.removeClass('selected');
      _this.addClass('selected');
    }

    checkSelected();
  });

  // == Switch between product types (Medicare, IFP, etc.) =====================
  $('.step.what button').click(function () {
    var _this = $(this);

    if (_this.text().toLowerCase().search('medicare') >= 0) {
      if (_ifp.is(':visible')) {
        _ifp.fadeOut(fadeTime, () => {
          _medicare.fadeIn(fadeTime, () => {
            checkSelected();
          });
        });
      } else {
        _medicare.fadeIn(fadeTime, () => {
          checkSelected();
        });
      }
    } else if (_this.text().toLowerCase().search('family') >= 0) {
      if (_medicare.is(':visible')) {
        _medicare.fadeOut(fadeTime, () => {
          _ifp.fadeIn(fadeTime, () => {
            checkSelected();
          });
        });
      } else {
        _ifp.fadeIn(fadeTime, () => {
          checkSelected();
        });
      }
    }

    _selectedProduct = _what.find('.selected').attr('id').split('-')[0];
  });

  // == ESRD messaging =========================================================
  _medicare.find('[type=checkbox]').change(function () {
    var _this = $(this);
    var _checked = this.checked;
    var _button = _this.parents('.selection-row').find('button.btn-icon');
    var _otherBtns = _this.parents('.option-selector').find('button.btn-icon');
    var _alert = _this.parents('.selection-row').find('.alert');

    if (_checked) {
      _button.removeClass('selected', () => {
        _button.prop('disabled', true);
      });
      _alert.fadeIn(fadeTime, () => {
        _cta.fadeOut(fadeTime, () => {
          _whenWhere.fadeOut(fadeTime);
        });
      });
    } else {
      _button.prop('disabled', () => {
        if (_otherBtns.hasClass('selected')) {
          _alert.fadeOut(fadeTime);
          return false;
        }
        _alert.fadeOut(fadeTime, () => {
          _whenWhere.fadeIn(fadeTime, () => {
            _cta.fadeIn(fadeTime);
          });
        });
        _button.addClass('selected');
        return false;
      });
    }
  });

  // == Popovers for inelegibles ===============================================
  $('.step.who .btn-icon[disabled]').click(function () {
    console.log('Disabled person button clicked...');

    var _this = $(this);

    switch (_selectedProduct) {
      case 'medicare': {
        _this.popover({
          content: '<p>This family member is eligible for an Individual & Family plan.</p><p>To shop for this family member, select "Individual & Family" in the previous step.</p>',
          html: true,
          trigger: 'focus',
          // container: '#plan-tiles',
          animation: true,
          placement: 'right'
        });
        break;
      }
      case 'ifp': {
        _this.popover({
          content: '<p>This family member is eligible for Medicare coverage.</p><p>To shop for this family member, select "Medicare" in the previous step.</p>',
          html: true,
          trigger: 'focus',
          // container: '#plan-tiles',
          animation: true,
          placement: 'right'
        });
        break;
      }
      default: {
        return false;
      }
    }
  });

  // == Display realistic effective date =======================================
  var now = new Date();
  var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  if (now.getMonth() == 11 && now.getDate() >= 15) {
    var current = new Date(now.getFullYear() + 1, 1, 1);
  } else if (now.getMonth() == 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
  } else if (now.getDate() >= 15) {
    var current = new Date(now.getFullYear(), now.getMonth() + 2, 1);
  } else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  var monthToShow = monthArray[current.getMonth()];

  $('#effectiveDate').text(monthToShow);

  // == Proceed to Plans Logic =================================================
  $('#view-plans-btn').click(() => {
    var _urlPrefix = '/qc-uat-q3-2016-quoting';

    switch (_selectedProduct) {
      case 'medicare': {
        window.location = _urlPrefix + '-medicare.html';
        break;
      }
      case 'ifp': {
        window.location = _urlPrefix + '.html';
        break;
      }
      default: {
        return false;
      }
    }
  });

  // == Engage Popovers! =======================================================
  $('[data-toggle=popover]').popover();

  // == Force Popovers to work in FF, Safari, etc... o_O =======================
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; }(!window.safari || safari.pushNotification));

  if (isFirefox || isSafari) {
    $('[data-toggle="popover"]').click(function () {
      $(this).focus();
    });
  }
});
