$(function(){
  var _scope = $('.simple-date-picker');
  var btnUp = _scope.find('button.up');
  var btnDn = _scope.find('button.down');
  var datePicker = $('select.simple-date');
  var timePicker = $('select.simple-time');
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
  
  datePicker.change(function(){
    timePicker.html(times['times-' + $(this).val()]);
    timePicker.children().eq(0).prop('selected', true).trigger('change');
  });
  
  btnUp.click(function(){
    var _select = $(this).siblings('select');
    var currentVal = _select.find(':selected');
    var prevVal = currentVal.prev();
    var _offset = (_select.height() / 2.5);
    if(currentVal.index() > 0) {
      currentVal.prop('selected', false);
      prevVal.prop('selected', true);
      _select.scrollTo(_select.find(':selected'),800, {offset: -_offset});
      _select.trigger('change');
    }
    return false;
  });
  
  btnDn.click(function(){
    var _select = $(this).siblings('select');
    var currentVal = _select.find(':selected');
    var upperLim = _select.children().length;
    var nextVal = currentVal.next();
    var _offset = (_select.height() / 2.5);
    if(currentVal.index() < upperLim) {
      currentVal.prop('selected', false);
      nextVal.prop('selected', true);
      _select.scrollTo(_select.find(':selected'),800, {offset: -_offset});
      _select.trigger('change');
    }
    return false;
  });
});