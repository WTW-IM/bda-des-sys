$(function(){
  var _what = $('.step.what');
  var _medicare = $('.step.who.medicare');
  var _ifp = $('.step.who.ifp');
  var _whenWhere = $('.step.when-where');
  var _cta = $('.cta');
  var fadeTime = 250;
  var _selectedProduct;
  
  // Create Base64 Object
  var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
  
  // REMOVE IF YOU IMPLEMENT HASHING
  var string = 'Hello world!';
  
  // Encode the String
  var encodedString = Base64.encode(string);
  console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
  
  // Decode the String
  var decodedString = Base64.decode(encodedString);
  console.log(decodedString); // Outputs: "Hello World!"

  
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
      sibs.removeClass('selected');
      _this.addClass('selected');
    }
    
    checkSelected();
  });
  
  // == Switch between product types (Medicare, IFP, etc.) =====================
  $('.step.what button').click(function(){
    var _this = $(this);
    
    if (_this.text().toLowerCase().search('medicare') >= 0) {
      if (_ifp.is(':visible')) {
        _ifp.fadeOut(fadeTime, function(){
          _medicare.fadeIn(fadeTime, function(){
            checkSelected();
          });
        });
      } else {
        _medicare.fadeIn(fadeTime, function(){
          checkSelected();
        });
      }
    } else if (_this.text().toLowerCase().search('family') >= 0) {
      if (_medicare.is(':visible')) {
        _medicare.fadeOut(fadeTime, function(){
          _ifp.fadeIn(fadeTime, function(){
            checkSelected();
          });
        });
      } else {
        _ifp.fadeIn(fadeTime, function(){
          checkSelected();
        });
      }
    }
    
    _selectedProduct = _what.find('.selected').attr('id').split('-')[0];
  });
  
  // == ESRD messaging =========================================================
  _medicare.find('[type=checkbox]').change(function(){
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
  
  
  // == Popovers for inelegibles ===============================================
  $('.step.who .btn-icon[disabled]').click(function(){
    console.log('Disabled person button clicked...');
    
    var _this = $(this);
    
    switch(_selectedProduct) {
      case 'medicare':
        _this.popover({
          content: '<p>This family member is eligible for an Individual & Family plan.</p><p>To shop for this family member, select "Individual & Family" in the previous step.</p>',
          html: true,
          trigger: 'focus',
          // container: '#plan-tiles',
          animation: true,
          placement: 'right'
        });
        break;
      case 'ifp':
        _this.popover({
          content: '<p>This family member is eligible for Medicare coverage.</p><p>To shop for this family member, select "Medicare" in the previous step.</p>',
          html: true,
          trigger: 'focus',
          // container: '#plan-tiles',
          animation: true,
          placement: 'right'
        });
        break;
      default:
        return false;
    }
  });
  
  
  // == Display realistic effective date =======================================
  var now = new Date();
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
  
  
  // == Geolocation Test =======================================================
  if(navigator.geolocation) {
    var fallback = setTimeout(function() { fail('10 seconds expired'); }, 10000);
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        clearTimeout(fallback);
        console.log('pos', pos);
        var point = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        new google.maps.Geocoder().geocode({'latLng': point}, function (res, status) {
          if(status == google.maps.GeocoderStatus.OK && typeof res[0] !== 'undefined') {
            var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
            if(zip) {
              $('#quoteZip, #changeQuoteZipPopover').text(zip[1]);
            } else fail('Failed to parse');
          } else {
            fail('Failed to reverse');
          }
        });
      }, function(err) {
        fail(err.message);
      }
    );
  } else {
   fail('Geolocation not supported... :\'(');
  }
  function fail(err) {
    console.log('err', err);
  }
  
  // if(navigator.geolocation) {
  //   alert('Pssst! I could know where you are...');
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log(position.address.postalCode);
  //     $("#quoteZIP").text(position.address.postalCode);
  //   });
  // }
  
  
  // == Proceed to Plans Logic =================================================
  $('#view-plans-btn').click(function(){
    var _urlPrefix = 'https://qa-es-ui-guidelines-whitlockjohn.c9users.io/qc-uat-q3-2016-quoting';
    
    switch (_selectedProduct) {
      case 'medicare':
        window.location = _urlPrefix + '-medicare.html';
        break;
      case 'ifp':
        window.location = _urlPrefix + '.html'
        break;
      default:
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