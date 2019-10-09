$(function(){
  var _sel = $('#btn-bar-tggl');
  
  _sel.change(function(){
    var _this = $(this);
    var _cls = _this.val();
    var _tgt = _this.siblings('.answr-grp');
    
    _tgt.attr('class', 'answr-grp primary ' + _cls);
  })
});