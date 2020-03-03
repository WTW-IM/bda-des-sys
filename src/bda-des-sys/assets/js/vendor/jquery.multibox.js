(function($) {
 
  $.fn.multibox = function(options) {
 
    // Options
    var settings = $.extend({
      // These are the defaults.
      //color: "#556b2f",
      //backgroundColor: "white"
    }, options);
 
    // Set variables for the most relevent elements in the DOM
    var _scope = this;
    var dateSelect = _scope.find('select[name*=date]');
    var timeSelect = _scope.find('select[name*=time]');
    
    // Fake ajax data
    var times = {
      'times-20160524':
        '<option value="1300">1:00 PM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1330">1:30 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1430">2:30 PM</option>',
      'times-20160525':
        '<option value="1115">11:15 AM</option>' +
        '<option value="1130">11:30 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1215">12:15 AM</option>' +
        '<option value="1230">12:30 AM</option>' +
        '<option value="1300">1:00 PM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1515">3:15 PM</option>' +
        '<option value="1545">3:45 PM</option>',
      'times-20160526':
        '<option value="1000">10:00 AM</option>' +
        '<option value="1015">10:15 AM</option>' +
        '<option value="1030">10:30 AM</option>' +
        '<option value="1045">10:45 AM</option>' +
        '<option value="1100">11:00 AM</option>' +
        '<option value="1115">11:15 AM</option>' +
        '<option value="1130">11:30 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1330">1:30 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1430">2:30 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1500">3:00 PM</option>',
      'times-20160527':
        '<option value="0900">9:00 AM</option>' +
        '<option value="0915">9:15 AM</option>' +
        '<option value="0930">9:30 AM</option>' +
        '<option value="0945">9:45 AM</option>' +
        '<option value="1015">10:15 AM</option>' +
        '<option value="1045">10:45 AM</option>' +
        '<option value="1100">11:00 AM</option>' +
        '<option value="1115">11:15 AM</option>' +
        '<option value="1130">11:30 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1215">12:15 AM</option>' +
        '<option value="1230">12:30 AM</option>' +
        '<option value="1245">12:45 AM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1430">2:30 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1500">3:00 PM</option>' +
        '<option value="1515">3:15 PM</option>' +
        '<option value="1530">3:30 PM</option>' +
        '<option value="1545">3:45 PM</option>',
      'times-20160530':
        '<option value="0800">8:00 AM</option>' +
        '<option value="0815">8:15 AM</option>' +
        '<option value="0830">8:30 AM</option>' +
        '<option value="0845">8:45 AM</option>' +
        '<option value="0900">9:00 AM</option>' +
        '<option value="0915">9:15 AM</option>' +
        '<option value="0945">9:45 AM</option>' +
        '<option value="1015">10:15 AM</option>' +
        '<option value="1030">10:30 AM</option>' +
        '<option value="1045">10:45 AM</option>' +
        '<option value="1100">11:00 AM</option>' +
        '<option value="1115">11:15 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1200">12:00 AM</option>' +
        '<option value="1215">12:15 AM</option>' +
        '<option value="1230">12:30 AM</option>' +
        '<option value="1245">12:45 AM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1330">1:30 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1430">2:30 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1500">3:00 PM</option>' +
        '<option value="1515">3:15 PM</option>' +
        '<option value="1530">3:30 PM</option>' +
        '<option value="1545">3:45 PM</option>',
      'times-20160531':
        '<option value="0700">7:00 AM</option>' +
        '<option value="0715">7:15 AM</option>' +
        '<option value="0730">7:30 AM</option>' +
        '<option value="0745">7:45 AM</option>' +
        '<option value="0800">8:00 AM</option>' +
        '<option value="0815">8:15 AM</option>' +
        '<option value="0830">8:30 AM</option>' +
        '<option value="0845">8:45 AM</option>' +
        '<option value="0900">9:00 AM</option>' +
        '<option value="0915">9:15 AM</option>' +
        '<option value="0930">9:30 AM</option>' +
        '<option value="0945">9:45 AM</option>' +
        '<option value="1000">10:00 AM</option>' +
        '<option value="1015">10:15 AM</option>' +
        '<option value="1030">10:30 AM</option>' +
        '<option value="1045">10:45 AM</option>' +
        '<option value="1100">11:00 AM</option>' +
        '<option value="1115">11:15 AM</option>' +
        '<option value="1130">11:30 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1200">12:00 AM</option>' +
        '<option value="1215">12:15 AM</option>' +
        '<option value="1230">12:30 AM</option>' +
        '<option value="1245">12:45 AM</option>' +
        '<option value="1300">1:00 PM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1330">1:30 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1430">2:30 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1500">3:00 PM</option>' +
        '<option value="1515">3:15 PM</option>' +
        '<option value="1530">3:30 PM</option>' +
        '<option value="1545">3:45 PM</option>',
      'times-20160601':
        '<option value="0800">8:00 AM</option>' +
        '<option value="0815">8:15 AM</option>' +
        '<option value="0830">8:30 AM</option>' +
        '<option value="0845">8:45 AM</option>' +
        '<option value="0900">9:00 AM</option>' +
        '<option value="0915">9:15 AM</option>' +
        '<option value="0945">9:45 AM</option>' +
        '<option value="1015">10:15 AM</option>' +
        '<option value="1030">10:30 AM</option>' +
        '<option value="1045">10:45 AM</option>' +
        '<option value="1100">11:00 AM</option>' +
        '<option value="1115">11:15 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1200">12:00 AM</option>' +
        '<option value="1215">12:15 AM</option>' +
        '<option value="1230">12:30 AM</option>' +
        '<option value="1245">12:45 AM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1330">1:30 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1430">2:30 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1500">3:00 PM</option>' +
        '<option value="1515">3:15 PM</option>' +
        '<option value="1530">3:30 PM</option>' +
        '<option value="1545">3:45 PM</option>',
      'times-20160602':
        '<option value="0900">9:00 AM</option>' +
        '<option value="0915">9:15 AM</option>' +
        '<option value="0930">9:30 AM</option>' +
        '<option value="0945">9:45 AM</option>' +
        '<option value="1015">10:15 AM</option>' +
        '<option value="1045">10:45 AM</option>' +
        '<option value="1100">11:00 AM</option>' +
        '<option value="1115">11:15 AM</option>' +
        '<option value="1130">11:30 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1215">12:15 AM</option>' +
        '<option value="1230">12:30 AM</option>' +
        '<option value="1245">12:45 AM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1430">2:30 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1500">3:00 PM</option>' +
        '<option value="1515">3:15 PM</option>' +
        '<option value="1530">3:30 PM</option>' +
        '<option value="1545">3:45 PM</option>',
      'times-20160603':
        '<option value="1000">10:00 AM</option>' +
        '<option value="1015">10:15 AM</option>' +
        '<option value="1030">10:30 AM</option>' +
        '<option value="1045">10:45 AM</option>' +
        '<option value="1100">11:00 AM</option>' +
        '<option value="1115">11:15 AM</option>' +
        '<option value="1130">11:30 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1330">1:30 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1430">2:30 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1500">3:00 PM</option>',
      'times-20160606':
        '<option value="1115">11:15 AM</option>' +
        '<option value="1130">11:30 AM</option>' +
        '<option value="1145">11:45 AM</option>' +
        '<option value="1215">12:15 AM</option>' +
        '<option value="1230">12:30 AM</option>' +
        '<option value="1300">1:00 PM</option>' +
        '<option value="1315">1:15 PM</option>' +
        '<option value="1345">1:45 PM</option>' +
        '<option value="1400">2:00 PM</option>' +
        '<option value="1415">2:15 PM</option>' +
        '<option value="1445">2:45 PM</option>' +
        '<option value="1515">3:15 PM</option>' +
        '<option value="1545">3:45 PM</option>'
    };
    
    // Build the Selector UI elements from the <select> elements
    _scope.find('select').each(function() {
      var select = $(this);
      var bucket = document.createElement('div');
      var tumbler = document.createElement('div');
      var isDate = select.attr('name').toLowerCase().indexOf('date') > -1;
      var isTime = select.attr('name').toLowerCase().indexOf('time') > -1;
      
      if (isDate) {
        bucket.setAttribute('class', 'bucket date-select');
      }
      if (isTime) {
        bucket.setAttribute('class', 'bucket time-select');
      };
      
      select.children().each(function(i) {
        var instance = $(this);
        var _select = $(this).parent();
        var target = document.createElement('a');
        var targetText = document.createTextNode(instance.html());
        target.appendChild(targetText);
        if (isDate) {
          target.setAttribute('id', 'date-' + instance.val());
        }
        if (isTime) {
          target.setAttribute('id', 'time-' + instance.val());
        }
        target.setAttribute('href', 'javascript:;');
        target.setAttribute('tabindex', '-1');
        tumbler.appendChild(target);
      });
      tumbler.setAttribute('class', 'tumbler');
      tumbler.setAttribute('tabindex', '0');
      bucket.appendChild(tumbler);
      this.parentElement.appendChild(bucket);
    });
    
    $('.multibox .bucket').each(function() {
      
      // Build the "Up" buttons
      var newBtnUp = document.createElement('button');
      newBtnUp.setAttribute('class', 'btn btn-default up');
      newBtnUp.setAttribute('aria-hidden', 'true');
      newBtnUp.setAttribute('tabindex', '-1');
      var NS = 'http://www.w3.org/2000/svg';
      var newChevronUp = document.createElementNS(NS, 'svg');
      newChevronUp.setAttribute('width', '35');
      newChevronUp.setAttribute('height', '10');
      newBtnUp.appendChild(newChevronUp);
      var newChevronUpGroup = document.createElementNS(NS, 'g');
      newChevronUp.appendChild(newChevronUpGroup);
      var newChevronUpPath = document.createElementNS(NS, 'path');
      newChevronUpPath.setAttribute('fill', 'none');
      newChevronUpPath.setAttribute('stroke', '#444');
      newChevronUpPath.setAttribute('stroke-width', '3px');
      newChevronUpPath.setAttribute('stroke-linecap', 'butt');
      newChevronUpPath.setAttribute('stroke-linejoin', 'miter');
      newChevronUpPath.setAttribute('stroke-opacity', '1');
      newChevronUpPath.setAttribute('d', 'm0,13l17.5,-10l17.5,10');
      newChevronUpGroup.appendChild(newChevronUpPath);
      this.appendChild(newBtnUp);
      
      // Build the "Down" buttons
      var newBtnDown = document.createElement('button');
      newBtnDown.setAttribute('class', 'btn btn-default down');
      newBtnDown.setAttribute('aria-hidden', 'true');
      newBtnDown.setAttribute('tabindex', '-1');
      var NS = 'http://www.w3.org/2000/svg';
      var newChevronDown = document.createElementNS(NS, 'svg');
      newChevronDown.setAttribute('width', '35');
      newChevronDown.setAttribute('height', '10');
      newBtnDown.appendChild(newChevronDown);
      var newChevronDownGroup = document.createElementNS(NS, 'g');
      newChevronDown.appendChild(newChevronDownGroup);
      var newChevronDownPath = document.createElementNS(NS, 'path');
      newChevronDownPath.setAttribute('fill', 'none');
      newChevronDownPath.setAttribute('stroke', '#444');
      newChevronDownPath.setAttribute('stroke-width', '3px');
      newChevronDownPath.setAttribute('stroke-linecap', 'butt');
      newChevronDownPath.setAttribute('stroke-linejoin', 'miter');
      newChevronDownPath.setAttribute('stroke-opacity', '1');
      newChevronDownPath.setAttribute('d', 'm0,-3l17.5,10l17.5,-10');
      newChevronDownGroup.appendChild(newChevronDownPath);
      this.appendChild(newBtnDown);

    });
    
    var tmblr = $('.tumbler');
    var btnDn = $('.btn.down');
    var btnUp = $('.btn.up');
    
    // Set the first option in each Selector UI element to 'selected'
    tmblr.each(function() {
      this.firstChild.setAttribute('class', 'selected');
    });
    
    // Make the links in the Selector UI "options" change state and trigger the hidden <select> elements
    var activateLinks = function() {
      tmblr.find('a').click(function() {
        var clicked = $(this);
        var ident = clicked.attr('id').toLowerCase();
        var _isDate = ident.indexOf('date') > -1;
        var _isTime = ident.indexOf('time') > -1;
        
        clicked.siblings().removeClass('selected');
        clicked.addClass('selected');
        
        if (_isDate) {
          var _option = ident.split('-')[1];
          var currentVal = dateSelect.find(':selected');
          var newVal = dateSelect.find('[value='+ _option +']');
          
          currentVal.prop('selected', false);
          newVal.prop('selected', true);
          dateSelect.trigger('change');
        }
        
        if (_isTime) {
          var _option = ident.split('-')[1];
          var currentVal = timeSelect.find(':selected');
          var newVal = timeSelect.find('[value='+ _option +']');
          
          currentVal.prop('selected', false);
          newVal.prop('selected', true);
          timeSelect.trigger('change');
        }
        
        return false;
      });
    };
    
    activateLinks();
    
    // Generic function to select the value before the currently selected one
    btnUp.each(function(){
      var _this = $(this);
      var _tumbler = _this.siblings('.tumbler');
      var _offset = (_tumbler.height() / 2.5);
      var currentVal = _tumbler.children('.selected');
      var _currIdx = currentVal.index();
      
      var scrollFx = function() {
        _tumbler.scrollTo(_tumbler.children('.selected'), 500, {offset: -_offset})
      }

      $(this).click(function() {
        clearTimeout(scrollTime);
        var currentVal = _tumbler.children('.selected');
        var _currIdx = currentVal.index();

        if(_currIdx > 0) {
          var currentVal = _tumbler.children('.selected');
          var prevVal = currentVal.prev();
          prevVal.click();
          var scrollTime = setTimeout(scrollFx, 750);
        } else {
          return false;
        }

        return false;
      });
    });
    
    // Generic function to select the value after the currently selected one
    btnDn.each(function(){
      var _this = $(this);
      var _tumbler = _this.siblings('.tumbler');
      var _offset = (_tumbler.height() / 2.5);
      var currentVal = _tumbler.children('.selected');
      var _currIdx = currentVal.index();
      
      var scrollFx = function() {
        _tumbler.scrollTo(_tumbler.children('.selected'), 500, {offset: -_offset})
      }

      _this.click(function() {
        clearTimeout(scrollTime);
        var upperLim = _tumbler.children().length;
        var currentVal = _tumbler.children('.selected');
        var _currIdx = currentVal.index();

        if(_currIdx < upperLim) {
          var nextVal = currentVal.next();
          nextVal.click();
          var scrollTime = setTimeout(scrollFx, 750);
        } else {
          return false;
        }

        return false;
      });
    });
    
    // Delegate arrow keys to move selection within tumblers
    var bindArrows = function() {
      tmblr.each(function() {
        $(this).keydown(function(e) {
          switch(e.which) {
            case 37: // left arrow
            $(this).siblings(btnUp).click();
            break;
            
            case 38: // up arrow
            $(this).siblings(btnUp).click();
            break;
            
            case 39: // right arrow
            $(this).siblings(btnDn).click();
            break;
            
            case 40: // down arrow
            $(this).siblings(btnDn).click();
            break;
            
            default: return;
          }
          e.preventDefault();
        });
      });
      
      // $(document).delegate(tmblr, 'keypress', function(e){
      //   switch(e.which) {
      //     case 37: // left arrow
      //     $(this).siblings(btnUp).click();
      //     break;
          
      //     case 38: // up arrow
      //     $(this).siblings(btnUp).click();
      //     break;
          
      //     case 39: // right arrow
      //     $(this).siblings(btnDn).click();
      //     break;
          
      //     case 40: // down arrow
      //     $(this).siblings(btnDn).click();
      //     break;
          
      //     default: return;
      //   }
      //   e.preventDefault();
      // });
      
    };
    
    bindArrows();
    
    // Will this fix the keydown not working subsequent times?
    tmblr.each(function() {
      $(this).keyup(function() {
        bindArrows();
      });
    });
    
    dateSelect.change(function() {
      var timeUI = _scope.find('div.time-select .tumbler');
      
      // ajax call would be here... faking it for demo purposes.
      timeSelect.html(times['times-' + $(this).val()]);
      timeSelect.children().eq(0).prop('selected', true).trigger('change');
      
      // Clear the Time Selector UI element
      timeUI.html('');
      
      // Rebuild the Time Selector UI element
      timeSelect.children().each(function() {
        var _this = $(this);
        var _val = _this.val();
        var _text = _this.text();
        var _selected = _this.prop('selected');
        var newTimeOpt = document.createElement('a');
        var newTimeTxt = document.createTextNode(_text);
        newTimeOpt.setAttribute('id', 'time-' + _val);
        newTimeOpt.setAttribute('tabindex', '-1');
        newTimeOpt.appendChild(newTimeTxt);
        if (_selected) {
          newTimeOpt.setAttribute('class', 'selected');
        }
        timeUI.append(newTimeOpt);
      });
      activateLinks();
      bindArrows();
    });
 
  };
 
}(jQuery));