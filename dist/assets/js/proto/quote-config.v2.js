$(function(){
  var _what = $('.step.what');
  var _mc = $('.step.who > .medicare');
  var _ifp = $('.step.who > .ifp');
  var mcButtons = _mc.find('.btn-icon');
  var ifpButtons = _ifp.find('.btn-icon');
  var mcSelected;
  var ifpSelected;
  var _whenWhere = $('.step.when-where');
  var _cta = $('.cta');
  var fadeTime = 250;
  var now = new Date();
  
  // == Check for selected HHMs for hide/show of date, ZIP, and CTA ============
  var checkSelected = function(){
    if ($('.step.who:visible .btn-icon').hasClass('selected')) {
      _whenWhere.fadeIn(fadeTime, function(){
        _cta.fadeIn(fadeTime);
      });
    } else {
      _cta.fadeOut(fadeTime, function(){
        _whenWhere.fadeOut(fadeTime);
      });
    }
  };
  
  var enableUnflaggingIfp = function (){
    _mc.find('.selected').click(function(){
      _ifp.removeClass('incompatible');
    });
  };
  
  var enableUnflaggingMc = function(){
    _ifp.find('.selected').click(function(){
      var _this = $(this);
      var likeSibs = _this.parent().parent().find('.btn-icon').hasClass('selected');
      
      if(!likeSibs) {
        _mc.removeClass('incompatible');
      }
    });
  };
  
  
  // == People selection =======================================================
  $('.option-selector .btn-icon').not(':disabled, .disabled').click(function(){
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
      if (_this.hasClass('selected')) {
        _this.removeClass('selected');
      } else {
        sibs.removeClass('selected');
        _this.addClass('selected');
      }
    }
    
    checkSelected();
  });
  
  
  // == Make MC and IPF selectors mutually exclusive ===========================
  var checkHhmSelections = function(){
    mcSelected = mcButtons.hasClass('selected');
    ifpSelected = ifpButtons.hasClass('selected');
  };
  
  var mutuallyExclusiveHhmBtns = function(){
    ifpButtons.click(function(){
      _ifp.removeClass('incompatible');
      _mc.find('.btn-icon').removeClass('selected');
      _mc.addClass('incompatible');
      
      checkHhmSelections();
      if (!ifpSelected) {
        _mc.removeClass('incompatible');
      }
    });
    
    mcButtons.click(function(){
      _mc.removeClass('incompatible');
      _ifp.find('.btn-icon').removeClass('selected');
      _ifp.addClass('incompatible');
      
      checkHhmSelections();
      if (!mcSelected) {
        _ifp.removeClass('incompatible');
      }
    });
  };
  
  mutuallyExclusiveHhmBtns();
  
  
  // == ESRD messaging =========================================================
  _mc.find('[type=checkbox]').change(function(){
    var _this = $(this);
    var _checked = this.checked;
    var _button = _this.parents('.selection-row').find('button.btn-icon');
    var _otherBtns = _this.parents('.option-selector').find('button.btn-icon');
    var _alert = _this.parents('.selection-row').find('.alert');
    
    if (_checked) {
      _button.removeClass('selected', function(){
        _button.prop('disabled', true);
      });
      _alert.fadeIn(fadeTime, function() {
        _cta.fadeOut(fadeTime, function(){
          _whenWhere.fadeOut(fadeTime);
        });
      });
    } else {
      _button.prop('disabled', function(){
        if(_otherBtns.hasClass('selected')) {
          _alert.fadeOut(fadeTime);
          return false;
        } else {
          _alert.fadeOut(fadeTime, function(){
            _whenWhere.fadeIn(fadeTime, function(){
              _cta.fadeIn(fadeTime);
            });
          });
          _button.addClass('selected');
          return false;
        }
      });
    }
  });
  
  
  // == Display Eligibility Dates for dual-elegible HHM ========================
  var ifpEndDateObj = new Date(now.getFullYear(), now.getMonth() + 3, 0).toString().split(' ');
  var mcStartDateObj = new Date(now.getFullYear(), now.getMonth() + 3, 1).toString().split(' ');
  
  var convertMonth = function(obj){
    switch(obj) {
      case 'Jan':
        return 'January';
      case 'Feb':
        return 'February';
      case 'Mar':
        return 'March';
      case 'Apr':
        return 'April';
      case 'May':
        return 'May';
      case 'Jun':
        return 'June';
      case 'Jul':
        return 'July';
      case 'Aug':
        return 'August';
      case 'Sep':
        return 'September';
      case 'Oct':
        return 'October';
      case 'Nov':
        return 'November';
      case 'Dec':
        return 'December';
      default:
        return false;
    }
  }
  
  var convertDay = function(obj){
    return obj.replace(/^0+/, '');
  }
  
  var msStartDate = convertMonth(mcStartDateObj[1]) + ' ' + convertDay(mcStartDateObj[2]) + ', ' + mcStartDateObj[3];
  var ifpEndDate = convertMonth(ifpEndDateObj[1]) + ' ' + convertDay(ifpEndDateObj[2]) + ', ' + ifpEndDateObj[3];
  
  $('#mcStartDate').text(msStartDate);
  $('#ifpEndDate').text(ifpEndDate);
  
  
  // == Display realistic effective date =======================================
  var monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
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
  $('#view-plans-btn').click(function(){
    var _urlPrefix = '/qc-uat-q3-2016-quoting';
    
    checkHhmSelections();
    
    if (mcSelected) {
      window.location = _urlPrefix + '-medicare.v2.html';
    } else if (ifpSelected) {
      window.location = _urlPrefix + '.v2.html';
    } else {
      return false;
    }
  });
  
  
  // == Engage Popovers! =======================================================
  $("[data-toggle=popover]").popover();
  
  
  // == Force Popovers to work in FF, Safari, etc... o_O =======================
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
  
  // Safari 3.0+ "[object HTMLElementConstructor]" 
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

  if (isFirefox || isSafari) {
    $('[data-toggle="popover"]').click(function(){
      $(this).focus();
    });
  }
  
});