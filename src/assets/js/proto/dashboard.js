$(() => {
  // == Mobile-Style Navigation Menu ===========================================
  var _balances = [36, 66];
  var _accountTypes = ['hra', 'hsa'];

  // console.log(Math.floor(-((_balances[0]/100)*360))-89);

  var _acctTools = $('#acct-tools');
  var _acctViewBtn = _acctTools.find('.switch-view a');
  var _gauges = $('.donut');
  var _planTools = $('#plan-tools');
  var _planViewBtn = _planTools.find('.switch-view a');
  var _msgBucket = $('#msg-ctr');
  var _readMsgs = _msgBucket.find('.read');
  var _msgTools = $('#msg-tools');
  var _msgViewBtn = _msgTools.find('.switch-view a');
  var _msgFilter = $('#msg-filter');
  var _msgFltrBtn = _msgFilter.find('button');

  var loadBalances = function () {
    _gauges.each(function (idx) {
      var _this = $(this);
      var _legend = _this.parent().siblings('.legend');
      var _bar = _this.find('.bar');
      var _spinner = _this.siblings('.spinner');
      var _bal = _this.siblings('.bal-fig');
      var _offsetKey = _balances[idx];
      var _speedFactor = (100 - _offsetKey) / 100;
      var _speed = (_speedFactor * 2000);
      var _acctClass = _accountTypes[idx];
      _this.attr('class', 'donut ' + _acctClass);
      _legend.addClass(_acctClass);
      _spinner.fadeOut(250, () => {
        _bar.animate({ 'stroke-dashoffset': _offsetKey }, _speed, () => {
          _bal.fadeIn(250);
        });
      });
    });
  };

  _acctViewBtn.click(function () {
    var _this = $(this);
    var _sibTabs = _this.parents('ul').find('a');
    var _setting = _this.attr('data-display');
    var _bucket = _acctTools.siblings('.view-wrapper');

    _sibTabs.removeClass('selected');
    switch (_setting) {
      case 'cards': {
        _bucket.removeClass('full');
        _bucket.addClass(_setting);
        break;
      }
      case 'full': {
        _bucket.removeClass('cards');
        _bucket.addClass(_setting);
        break;
      }
    }
    _this.addClass('selected');
  });

  _planViewBtn.click(function () {
    var _this = $(this);
    var _sibTabs = _this.parents('ul').find('a');
    var _setting = _this.attr('data-display');
    var _bucket = _planTools.siblings('.view-wrapper');

    _sibTabs.removeClass('selected');
    switch (_setting) {
      case 'cards': {
        _bucket.removeClass('full');
        _bucket.addClass(_setting);
        break;
      }
      case 'full': {
        _bucket.removeClass('cards');
        _bucket.addClass(_setting);
        break;
      }
    }
    _this.addClass('selected');
  });

  _msgFltrBtn.click(function () {
    var _this = $(this);
    var _sibs = _this.siblings('button');
    var _setting = _this.val();

    _sibs.removeClass('active');
    if (_setting == 'unread') {
      _readMsgs.slideUp(250);
    } else {
      _readMsgs.slideDown(250);
    }
    _this.addClass('active');
  });

  _msgViewBtn.click(function () {
    var _this = $(this);
    var _sibTabs = _this.parents('ul').find('a');
    var _showSnip = _this.attr('data-view-snippet');

    _sibTabs.removeClass('selected');
    if (_showSnip == 'true') {
      _msgBucket.addClass('full');
    } else {
      _msgBucket.removeClass('full');
    }
    _this.addClass('selected');
  });

  setTimeout(loadBalances, 3500);
});
