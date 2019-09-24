$(function(){
  var filterTabs = $('.filters a');
  var filterDrawers = $('.filter-drawer');
  var viewTabs = $('.sort-view a');
  var planTiles = $('#plan-tiles');
  var _results = $('#plan-tiles > ol');
  var curtain = $('#curtain');
  var isSafari = navigator.vendor == "Apple Computer, Inc.";
  var isMozilla = navigator.vendor == "";
  
  // Retrieve JSON data and build quote results display
  $.getJSON("/assets/js/proto/ifp.dev.json", function(data){
    $.each(data.plans, function(i) {
      var _name = this.name;
      var _carrier = this.carrier;
      var _premium = this.premium.toFixed(2);
      var _premiumElems = _premium.toString().split('.');
      var _premiumDollars = _premiumElems[0];
      var _premiumCents = _premiumElems[1];
      var _metalTier = this.metal;
      var _metalClass = _metalTier.toLowerCase();
      var _networkType = this.network;
      var _annualEstimate = this.annual;
      var _annualData = (_annualEstimate / 10);
      var _ratingObj = this.rating;
      var _rating = _ratingObj.aggregate;
      var _ratingExp = _ratingObj.experience;
      var _ratingCare = _ratingObj.care;
      var _ratingAdmin = _ratingObj.admin;
      var _starFillAgg = ((_rating/5) * 100);
      var _starFillExp = ((_ratingExp/5) * 100);
      var _starFillCare = ((_ratingCare/5) * 100);
      var _starFillAdmin = ((_ratingAdmin/5) * 100);
      var _deductible = this.deductible;
      var _oop = this.oop;
      var _drBase = this.doctor;
      var _drDeductible = _drBase.deductible;
      var _drCoinsurance = _drBase.coinsurance;
      var _drCostShare = _drBase.copay;
      var _rxBaseGen = this.drugs.generic;
      var _rxBaseBrand = this.drugs.brand;
      var _rxGenericDeductible = _rxBaseGen.deductible;
      var _rxGenericCoinsurance = _rxBaseGen.coinsurance;
      var _rxGenericCostShare = _rxBaseGen.copay;
      var _rxBrandDeductible = _rxBaseBrand.deductible;
      var _rxBrandCoinsurance = _rxBaseBrand.coinsurance;
      var _rxBrandCostShare = _rxBaseBrand.copay;
      var _hmcDrugs = this.hmc.drugs;
      var _totalDrugs = _hmcDrugs.length;
      var _hmcDocs = this.hmc.doctors;
      var _totalDocs = _hmcDocs.length;
      var _drugList = $('<ol>');
      var _docList = $('<ol>');
      
      // Calculate number of drugs covered by each plan
      var _drugsCovered = _hmcDrugs.reduce(function(n, drug){
        return n + (drug.isCovered == true);
      }, 0);
      
      // Calculate number of doctors covered by each plan
      var _docsCovered = _hmcDocs.reduce(function(n, doc){
        return n + (doc.isCovered == true);
      }, 0);
      
      var _docsPct = ((_docsCovered / _totalDocs) * 100) + 1;
      
      var _docsBarClass = function(){
        if (_docsPct <= 10) {
          return 'drs10';
        } else if (_docsPct > 10 && _docsPct <= 20) {
          return 'drs20';
        } else if (_docsPct > 20 && _docsPct <= 30) {
          return 'drs30';
        } else if (_docsPct > 30 && _docsPct <= 40) {
          return 'drs40';
        } else if (_docsPct > 40 && _docsPct <= 50) {
          return 'drs50';
        } else if (_docsPct > 50 && _docsPct <= 60) {
          return 'drs60';
        } else if (_docsPct > 60 && _docsPct <= 70) {
          return 'drs70';
        } else if (_docsPct > 70 && _docsPct <= 80) {
          return 'drs80';
        } else if (_docsPct > 80 && _docsPct <= 90) {
          return 'drs90';
        } else if (_docsPct > 90 && _docsPct <= 101) {
          return 'drs100';
        }
      };
      
      
      // Build drugs covered list
      var buildDrugList = function(){
        $.each(_hmcDrugs, function(i, drug) {
          var _icon = drug.isCovered ? 'ok' : 'remove';
          var _item = '<li>' + drug.name + ' <span class="icon ' + _icon + '"></span></li>';
          _drugList.append(_item);
        });
      };
      
      
      // Build doctors covered list
      var buildDocList = function(){
        $.each(_hmcDocs, function(i, doc) {
          var _icon = doc.isCovered ? 'ok' : 'remove';
          var _item = '<li>' + doc.name + ' <span class="icon ' + _icon + '"></span></li>';
          _docList.append(_item);
        });
      };
      
      buildDrugList();
      buildDocList();
      
      
      // Code for each <li/> in the results <ol/>
      var _el = 
        '<li data-carrier="' + _carrier + '" data-premium="' + _premiumDollars + '.' + _premiumCents + '" data-rating="' + _rating + '" data-doctors="' + (_docsPct / 10) + '" data-annual="' + _annualData + '">' +
        '  <h5><a href="javascript:;" class="trigger" title="' + _name + '">' + _name + '</a></h5>' +
        '  <a href="javascript:;" class="carrier-logo trigger"><img src="../assets/img/carriers/' + _carrier + '.gif"/></a>' +
        '  <span class="premium">' +
        '    <strong class="h1"><sup>$</sup>' + _premiumDollars + '<sup class="cents">.' + _premiumCents + '</sup></strong> <sup>Monthly</sup>' +
        '      <a href="javascript:;" class="plan-details-link trigger">Plan Details</a>' +
        '  </span> <!-- /.premium -->' +
        '  <span class="details-card">' +
        '    <span class="detail-row clearfix">' +
        '      <!-- <span class="label-style">Estimate:</span> --> <button type="button" class="popover-link h4" data-details="annual-estimate" data-trigger="focus" data-placement="right" data-html="true" data-container="body" data-title="Estimated Annual Cost" data-content="<p>Content TBD ...</p>" data-original-title="" title="Estimated Annual Cost"><sup>$</sup>' + _annualEstimate + '</button> estimated yearly cost<!-- <sup>Yearly</sup> -->' +
        '    </span>' +
        '    <span class="detail-row hmc clearfix">' +
        '      <img src="../assets/img/quote-results/hmc/ifp/cards/hmc-dataViz-' + i +'.png" class="data-viz">' +
        '      <button type="button" class="popover-link ifp-prem-det-' + i + '" data-details="plan-premium" title="Plan Premiums for a Year: $' + (_premium * 12).toFixed(2) + '">Premium over twelve months: $' + (_premium * 12).toFixed(2) + '</button>' +
        '      <button type="button" class="popover-link ifp-rx-det-' + i + '" data-details="drugs-covered" data-container="#plan-tiles" title="Drug Costs for a Year: $XXX.XX" aria-hidden="true">' + _drugsCovered + ' of ' + _totalDrugs + ' drugs</button>' +
        '      <button type="button" class="popover-link ifp-med-det-' + i + '" data-details="health-care-utilization" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-content="<p>This estimate is based on the health care costs reported by people in your age group who gave the same answers you did regarding their health.</p>" title="Medical Costs for a Year: $XXX.XX">Medical Usage Estimate</button>' +
        '      <span class="plan-premium-popover-content"><p>Monthly cost: <span class="pull-right">$' + _premium + '</span></p><p>Over a year: <span class="pull-right">&times; 12</span></p><p style="border-top: 1px solid #aaa; padding-top: 10px;">Total: <span class="pull-right"><strong>$' + (_premium * 12).toFixed(2) + '</strong></span></p></span>' +
        '      <span class="drugs-covered-popover-content"><p>Drug coverage for this plan:</p><ol>' + _drugList.html() + '</ol></span>' +
        '    </span>' +
        '    <span class="detail-row clearfix">' +
        '      <ol class="clearfix">' +
        '        <li><span class="label ' + _metalClass + '"><button type="button" class="popover-link" data-details="metal-tier" title="Metal Tiers*">' + _metalTier + '</button></span></li>' +
        '        <li><span class="sr-only">Network type:</span> <span class="network-type h4"><button type="button" class="popover-link" data-details="network-type">' + _networkType + '</button></span></li>' +
        '        <li>' +
        '          <span class="star-rating">' +
        '            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156 27" enable-background="new 0 0 156 27" xml:space="preserve">' +
        '              <g class="bg">' +
        '                <rect x="0" y="0" display="inline"/>' +
        '              </g>' +
        '              <g class="mask">' +
        '                <rect class="bar" x="0" y="0" display="inline" style="width: ' + _starFillAgg +'%"/>' +
        '                <path fill="#FFFFFF" d="M0,0v27h156V0H0z M21.4,24.8L14,20l-7.4,4.9l2.3-8.5L2,10.7l8.8-0.5L14,2l3.2,8.3l8.8,0.5l-6.9,5.6L21.4,24.8z M53.4,24.8L46,20l-7.4,4.9l2.3-8.5L34,10.7l8.8-0.5L46,2l3.2,8.3l8.8,0.5l-6.9,5.6L53.4,24.8z M85.4,24.8L78,20l-7.4,4.9l2.3-8.5L66,10.7l8.8-0.5L78,2l3.2,8.3l8.8,0.5l-6.9,5.6L85.4,24.8z M117.4,24.8L110,20l-7.4,4.9l2.3-8.5L98,10.7l8.8-0.5L110,2l3.2,8.3l8.8,0.5l-6.9,5.6L117.4,24.8z M149.4,24.8L142,20l-7.4,4.9l2.3-8.5l-6.9-5.6l8.8-0.5L142,2l3.2,8.3l8.8,0.5l-6.9,5.6L149.4,24.8z"/>' +
        '              </g>' +
        '            </svg>' +
        '          </span> <!-- /star-rating -->' +
        '          <span class="star-rating-popover-content">' +
        '            <strong>Member Experience</strong>' +
        '            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156 27" enable-background="new 0 0 156 27" xml:space="preserve">' +
        '              <g class="bg">' +
        '                <rect x="0" y="0" display="inline"/>' +
        '              </g>' +
        '              <g class="mask">' +
        '                <rect class="bar" x="0" y="0" display="inline" style="width: ' + _starFillExp +'%"/>' +
        '                <path fill="#FFFFFF" d="M0,0v27h156V0H0z M21.4,24.8L14,20l-7.4,4.9l2.3-8.5L2,10.7l8.8-0.5L14,2l3.2,8.3l8.8,0.5l-6.9,5.6L21.4,24.8z M53.4,24.8L46,20l-7.4,4.9l2.3-8.5L34,10.7l8.8-0.5L46,2l3.2,8.3l8.8,0.5l-6.9,5.6L53.4,24.8z M85.4,24.8L78,20l-7.4,4.9l2.3-8.5L66,10.7l8.8-0.5L78,2l3.2,8.3l8.8,0.5l-6.9,5.6L85.4,24.8z M117.4,24.8L110,20l-7.4,4.9l2.3-8.5L98,10.7l8.8-0.5L110,2l3.2,8.3l8.8,0.5l-6.9,5.6L117.4,24.8z M149.4,24.8L142,20l-7.4,4.9l2.3-8.5l-6.9-5.6l8.8-0.5L142,2l3.2,8.3l8.8,0.5l-6.9,5.6L149.4,24.8z"/>' +
        '              </g>' +
        '            </svg>' +
        '            <strong>Medical Care</strong>' +
        '            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156 27" enable-background="new 0 0 156 27" xml:space="preserve">' +
        '              <g class="bg">' +
        '                <rect x="0" y="0" display="inline"/>' +
        '              </g>' +
        '              <g class="mask">' +
        '                <rect class="bar" x="0" y="0" display="inline" style="width: ' + _starFillCare +'%"/>' +
        '                <path fill="#FFFFFF" d="M0,0v27h156V0H0z M21.4,24.8L14,20l-7.4,4.9l2.3-8.5L2,10.7l8.8-0.5L14,2l3.2,8.3l8.8,0.5l-6.9,5.6L21.4,24.8z M53.4,24.8L46,20l-7.4,4.9l2.3-8.5L34,10.7l8.8-0.5L46,2l3.2,8.3l8.8,0.5l-6.9,5.6L53.4,24.8z M85.4,24.8L78,20l-7.4,4.9l2.3-8.5L66,10.7l8.8-0.5L78,2l3.2,8.3l8.8,0.5l-6.9,5.6L85.4,24.8z M117.4,24.8L110,20l-7.4,4.9l2.3-8.5L98,10.7l8.8-0.5L110,2l3.2,8.3l8.8,0.5l-6.9,5.6L117.4,24.8z M149.4,24.8L142,20l-7.4,4.9l2.3-8.5l-6.9-5.6l8.8-0.5L142,2l3.2,8.3l8.8,0.5l-6.9,5.6L149.4,24.8z"/>' +
        '              </g>' +
        '            </svg>' +
        '            <strong>Plan Administration</strong>' +
        '            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156 27" enable-background="new 0 0 156 27" xml:space="preserve">' +
        '              <g class="bg">' +
        '                <rect x="0" y="0" display="inline"/>' +
        '              </g>' +
        '              <g class="mask">' +
        '                <rect class="bar" x="0" y="0" display="inline" style="width: ' + _starFillAdmin +'%"/>' +
        '                <path fill="#FFFFFF" d="M0,0v27h156V0H0z M21.4,24.8L14,20l-7.4,4.9l2.3-8.5L2,10.7l8.8-0.5L14,2l3.2,8.3l8.8,0.5l-6.9,5.6L21.4,24.8z M53.4,24.8L46,20l-7.4,4.9l2.3-8.5L34,10.7l8.8-0.5L46,2l3.2,8.3l8.8,0.5l-6.9,5.6L53.4,24.8z M85.4,24.8L78,20l-7.4,4.9l2.3-8.5L66,10.7l8.8-0.5L78,2l3.2,8.3l8.8,0.5l-6.9,5.6L85.4,24.8z M117.4,24.8L110,20l-7.4,4.9l2.3-8.5L98,10.7l8.8-0.5L110,2l3.2,8.3l8.8,0.5l-6.9,5.6L117.4,24.8z M149.4,24.8L142,20l-7.4,4.9l2.3-8.5l-6.9-5.6l8.8-0.5L142,2l3.2,8.3l8.8,0.5l-6.9,5.6L149.4,24.8z"/>' +
        '              </g>' +
        '            </svg>' +
        '            <small><em>For more information about these ratings, see the details for this plan.</em></small>' +
        '          </span><!-- /star-rating-popover-content -->' +
        '        </li>' +
        '      </ol>' +
        '    </span>' +
        '  </span> <!-- /.details-card -->' +
        '  <span class="details-large">' +
        '    <span class="detail-row">' +
        '      <span class="label ' + _metalClass + '"><button type="button" class="popover-link" data-details="metal-tier" title="Metal Tiers*">' + _metalTier + '</button></span> <span class="sr-only">Network type:</span> <span class="network-type h4"><button type="button" class="popover-link" data-details="network-type">' + _networkType + '</button></span>' +
        '    </span>' +
        '    <span class="detail-row">' +
        '      <span class="star-rating">' +
        '        <button data-details="star-rating" class="popover-link">' +
        '          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156 27" enable-background="new 0 0 156 27" xml:space="preserve">' +
        '            <g class="bg">' +
        '              <rect x="0" y="0" display="inline"/>' +
        '            </g>' +
        '            <g class="mask">' +
        '              <rect class="bar" x="0" y="0" display="inline" style="width: ' + _starFillAgg +'%"/>' +
        '                <path fill="#FFFFFF" d="M0,0v27h156V0H0z M21.4,24.8L14,20l-7.4,4.9l2.3-8.5L2,10.7l8.8-0.5L14,2l3.2,8.3l8.8,0.5l-6.9,5.6L21.4,24.8z M53.4,24.8L46,20l-7.4,4.9l2.3-8.5L34,10.7l8.8-0.5L46,2l3.2,8.3l8.8,0.5l-6.9,5.6L53.4,24.8z M85.4,24.8L78,20l-7.4,4.9l2.3-8.5L66,10.7l8.8-0.5L78,2l3.2,8.3l8.8,0.5l-6.9,5.6L85.4,24.8z M117.4,24.8L110,20l-7.4,4.9l2.3-8.5L98,10.7l8.8-0.5L110,2l3.2,8.3l8.8,0.5l-6.9,5.6L117.4,24.8z M149.4,24.8L142,20l-7.4,4.9l2.3-8.5l-6.9-5.6l8.8-0.5L142,2l3.2,8.3l8.8,0.5l-6.9,5.6L149.4,24.8z"/>' +
        '            </g>' +
        '          </svg>' +
        '        </button>' +
        '        <span class="star-rating-popover-content">' +
        '          <strong>Member Experience</strong>' +
        '          <span class="star-rating">' +
        '            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156 27" enable-background="new 0 0 156 27" xml:space="preserve">' +
        '              <g class="bg">' +
        '                <rect x="0" y="0" display="inline"/>' +
        '              </g>' +
        '              <g class="mask">' +
        '                <rect class="bar" x="0" y="0" display="inline" style="width: ' + _starFillExp +'%"/>' +
        '                <path fill="#FFFFFF" d="M0,0v27h156V0H0z M21.4,24.8L14,20l-7.4,4.9l2.3-8.5L2,10.7l8.8-0.5L14,2l3.2,8.3l8.8,0.5l-6.9,5.6L21.4,24.8z M53.4,24.8L46,20l-7.4,4.9l2.3-8.5L34,10.7l8.8-0.5L46,2l3.2,8.3l8.8,0.5l-6.9,5.6L53.4,24.8z M85.4,24.8L78,20l-7.4,4.9l2.3-8.5L66,10.7l8.8-0.5L78,2l3.2,8.3l8.8,0.5l-6.9,5.6L85.4,24.8z M117.4,24.8L110,20l-7.4,4.9l2.3-8.5L98,10.7l8.8-0.5L110,2l3.2,8.3l8.8,0.5l-6.9,5.6L117.4,24.8z M149.4,24.8L142,20l-7.4,4.9l2.3-8.5l-6.9-5.6l8.8-0.5L142,2l3.2,8.3l8.8,0.5l-6.9,5.6L149.4,24.8z"/>' +
        '              </g>' +
        '            </svg>' +
        '          </span>' +
        '          <strong>Medical Care</strong>' +
        '          <span class="star-rating">' +
        '            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156 27" enable-background="new 0 0 156 27" xml:space="preserve">' +
        '              <g class="bg">' +
        '                <rect x="0" y="0" display="inline"/>' +
        '              </g>' +
        '              <g class="mask">' +
        '                <rect class="bar" x="0" y="0" display="inline" style="width: ' + _starFillCare +'%"/>' +
        '                <path fill="#FFFFFF" d="M0,0v27h156V0H0z M21.4,24.8L14,20l-7.4,4.9l2.3-8.5L2,10.7l8.8-0.5L14,2l3.2,8.3l8.8,0.5l-6.9,5.6L21.4,24.8z M53.4,24.8L46,20l-7.4,4.9l2.3-8.5L34,10.7l8.8-0.5L46,2l3.2,8.3l8.8,0.5l-6.9,5.6L53.4,24.8z M85.4,24.8L78,20l-7.4,4.9l2.3-8.5L66,10.7l8.8-0.5L78,2l3.2,8.3l8.8,0.5l-6.9,5.6L85.4,24.8z M117.4,24.8L110,20l-7.4,4.9l2.3-8.5L98,10.7l8.8-0.5L110,2l3.2,8.3l8.8,0.5l-6.9,5.6L117.4,24.8z M149.4,24.8L142,20l-7.4,4.9l2.3-8.5l-6.9-5.6l8.8-0.5L142,2l3.2,8.3l8.8,0.5l-6.9,5.6L149.4,24.8z"/>' +
        '              </g>' +
        '            </svg>' +
        '          </span>' +
        '          <strong>Plan Administration</strong>' +
        '          <span class="star-rating">' +
        '            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 156 27" enable-background="new 0 0 156 27" xml:space="preserve">' +
        '              <g class="bg">' +
        '                <rect x="0" y="0" display="inline"/>' +
        '              </g>' +
        '              <g class="mask">' +
        '                <rect class="bar" x="0" y="0" display="inline" style="width: ' + _starFillAdmin +'%"/>' +
        '                <path fill="#FFFFFF" d="M0,0v27h156V0H0z M21.4,24.8L14,20l-7.4,4.9l2.3-8.5L2,10.7l8.8-0.5L14,2l3.2,8.3l8.8,0.5l-6.9,5.6L21.4,24.8z M53.4,24.8L46,20l-7.4,4.9l2.3-8.5L34,10.7l8.8-0.5L46,2l3.2,8.3l8.8,0.5l-6.9,5.6L53.4,24.8z M85.4,24.8L78,20l-7.4,4.9l2.3-8.5L66,10.7l8.8-0.5L78,2l3.2,8.3l8.8,0.5l-6.9,5.6L85.4,24.8z M117.4,24.8L110,20l-7.4,4.9l2.3-8.5L98,10.7l8.8-0.5L110,2l3.2,8.3l8.8,0.5l-6.9,5.6L117.4,24.8z M149.4,24.8L142,20l-7.4,4.9l2.3-8.5l-6.9-5.6l8.8-0.5L142,2l3.2,8.3l8.8,0.5l-6.9,5.6L149.4,24.8z"/>' +
        '              </g>' +
        '            </svg>' +
        '          </span>' +
        '          <small><em>For more information about these ratings, see the details for this plan.</em></small>' +
        '        </span><!-- /star-rating-popover-content -->' +
        '      </span> <!-- /star-rating -->' +
        '    </span>' +
        '    <!-- help-me-choose -->' +
        '    <span class="hmc">' +
        '      <h6 class="h5"><button type="button" class="popover-link" data-toggle="popover" data-trigger="focus" data-placement="right" data-html="true" data-container="#plan-tiles" data-content="<p>Help Me Choose™ brings together information, such as:</p><ul><li>an estimate of your <strong>annual costs</strong> under this plan</li><li>how many of <strong>your doctors</strong> accept this plan</li><li>how many of <strong>your prescriptions</strong> are covered by this plan</li></ul><p>to help you decide if this plan is right for you and your budget.</p>" title="Help Me Choose&trade;">Help Me Choose&trade;</button></h6>' +
        '      <span class="docs-covered">' +
        '        <svg viewbox="0 0 64 64" class="donut">' +
        '          <circle class="bar ' + _docsBarClass() + '" r="25%" cx="50%" cy="50%" style="stroke-dasharray: ' + _docsPct + ' 100;"></circle>' +
        '          <circle class="hole" r="35%" cx="50%" cy="50%"></circle>' +
        '        </svg>' +
        '        <button type="button" class="popover-link' + (_docsCovered > 9 ? ' double-digit' : '') + '" data-details="docs-covered" title="Doctors Covered"><span class="h3">' + _docsCovered + '</span><span class="h5">' + _totalDocs + '</span><small>doctors</small></button>' +
        '        <span class="docs-covered-popover-content"><ol>' + _docList.html() + '</ol><small>Last updated on 12/08/2016.</small></span>' +
        '      </span>' +
        '      <button type="button" class="popover-link ifp-prem-det-' + i + '" data-details="plan-premium" title="Plan Premiums for a Year: $' + (_premium * 12).toFixed(2) + '">Premium over twelve months: $' + (_premium * 12).toFixed(2) + '</button>' +
        '      <button type="button" class="popover-link ifp-prem-det-' + i + '-bar" data-details="plan-premium" title="Plan Premiums for a Year: $' + (_premium * 12).toFixed(2) + '">Premium over twelve months: $' + (_premium * 12).toFixed(2) + '</button>' +
        '      <button type="button" class="popover-link ifp-rx-det-' + i + '" data-details="drugs-covered" data-container="#plan-tiles" title="Drug Costs for a Year: $XXX.XX">' + _drugsCovered + ' of ' + _totalDrugs + ' drugs</button>' +
        '      <button type="button" class="popover-link ifp-rx-det-' + i + '-bar" data-details="drugs-covered" data-container="#plan-tiles" title="Drug Costs for a Year: $XXX.XX" aria-hidden="true">' + _drugsCovered + ' of ' + _totalDrugs + ' drugs</button>' +
        '      <button type="button" class="popover-link ifp-med-det-' + i + '" data-details="health-care-utilization" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-content="<p>This estimate is based on the health care costs reported by people in your age group who gave the same answers you did regarding their health.</p>" title="Medical Costs for a Year: $XXX.XX"></button>' +
        '      <button type="button" class="popover-link ifp-med-det-' + i + '-bar" data-details="health-care-utilization" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-content="<p>This estimate is based on the health care costs reported by people in your age group who gave the same answers you did regarding their health.</p>" title="Medical Costs for a Year: $XXX.XX"></button>' +
        '      <span class="plan-premium-popover-content"><p>Monthly cost: <span class="pull-right">$' + _premium + '</span></p><p>Over a year: <span class="pull-right">&times; 12</span></p><p style="border-top: 1px solid #aaa; padding-top: 10px;">Total: <span class="pull-right"><strong>$' + (_premium * 12).toFixed(2) + '</strong></span></p></span>' +
        '      <span class="drugs-covered-popover-content"><p>Drug coverage for this plan:</p><ol>' + _drugList.html() + '</ol></span>' +
        '      <img src="../assets/img/quote-results/hmc/ifp/hmc-dataViz-' + i +'.png" class="data-viz"/>' +
        '      <strong>$' + _annualEstimate + '</strong>' +
        '    </span><!-- /help-me-choose -->' +
        '  </span> <!-- /.details-large -->' +
        '  <table class="snapshot-full">' +
        '    <thead>' +
        '      <tr>' +
        '        <th><button type="button" class="popover-link" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-content="<p>The amount you have to pay before the plan begins to pay for medications and services.</p>" title="Deductible">Deductible</button></th>' +
        '        <th><button type="button" class="popover-link" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-content="<p>The limit on the amount much you will pay in a year before the plan pays 100% for covered services. This amount includes include deductibles, coinsurance, copayments, or similar charges for qualified medical expenses.</p>" title="Maximum Out-of-Pocket Limit">Maximum</button></th>' +
        '        <th><button type="button" class="popover-link" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-content="<p>If you need to see a physician or specialist, focusing on a specific area of medicine or a group of patients, who directly provides or coordinates a range of health care services in a clinic or their office.</p>" title="Doctors&rsquo; Office Visits">Office Visit</button></th>' +
        '        <th><button type="button" class="popover-link" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-content="<p>The amount you will pay for prescription drugs. Some plans have different levels, or &ldquo;tiers&rdquo;, of drugs, with different costs (copayments or coinsurance) at each level.</p>" title="Prescription Drug Coverage">Prescription Drugs</button></th>' +
        '      </tr>' +
        '    </thead>' +
        '    <tbody>' +
        '      <tr>' +
        '        <td>$' + _deductible + '/year</td>' +
        '        <td>$' + _oop + '/year</td>' +
        '        <td class="full">' + (_drDeductible ? _drCoinsurance ? _drCostShare + '% cosinsurance after deductible' : '$' + _drCostShare + ' copay after deductible' : _drCostShare + ' copay') + '</td>' +
        '        <td class="full"><button type="button" class="popover-link" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-html="true" data-container="#plan-tiles" data-content="<ol><li>Preferred Generic: ' + (_rxGenericDeductible ? _rxGenericCoinsurance ? _rxGenericCostShare + '% coinsurance after deductible' : '$' + _rxGenericCostShare + ' copay after deductible' : '$' + _rxGenericCostShare + ' copay') + '</li><li>Preferred Brand: ' + (_rxBrandDeductible ? _rxBrandCoinsurance ? _rxBrandCostShare + '% coinsurance after deductible' : '$' + _rxBrandCostShare + ' copay after deductible' : '$' + _rxBrandCostShare + ' copay') + '</li></ol><small>For copayments for other tiers of drugs under this plan, please see the plan details.</small>" title="Prescription Drug Coverage">' + (_rxGenericDeductible ? _rxGenericCoinsurance ? _rxGenericCostShare + '%' : '$' + _rxGenericCostShare : '$' + _rxGenericCostShare) + ' / ' + (_rxBrandDeductible ? _rxBrandCoinsurance ? _rxBrandCostShare + '%' : '$' + _rxBrandCostShare : '$' + _rxBrandCostShare) + '</button></td>' +
        '      </tr>' +
        '    </tbody>' +
        '  </table>' +
        '  <table class="snapshot-card">' +
        '    <tbody>' +
        '      <tr>' +
        '        <th><button type="button" class="popover-link" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-title="Deductible" data-content="<p>The amount you have to pay before the plan begins to pay for medications and services.</p>" title="Deductible">Deductible</button></th>' +
        '        <td>$' + _deductible + '/year</td>' +
        '        <th><button type="button" class="popover-link" data-toggle="popover" data-trigger="focus" data-placement="top" data-html="true" data-container="#plan-tiles" data-content="<p>The limit on the amount much you will pay in a year before the plan pays 100% for covered services. This amount includes include deductibles, coinsurance, copayments, or similar charges for qualified medical expenses.</p>" title="Maximum Out-of-Pocket Limit">Max.</button></th>' +
        '        <td>$' + _oop + '/year</td>' +
        '      </tr>' +
        '    </tbody>' +
        '  </table>' +
        '  <span class="plan-footer clearfix">' +
        '    <div class="checkbox chckbx pull-left disabled">' +
        '      <label>' +
        '        <input type="checkbox" value="" disabled>' +
        '        Compare' +
        '        <span class="check"></span>' +
        '      </label>' +
        '    </div>' +
        '    <button type="button" class="btn btn-primary-alt pull-right">Add to Cart <span class="icon double-chevron-right"></span></button>' +
        '  </span>' +
        '</li>';
      _results.append(_el);
    });
    
    
    // Enable popovers for dynamically generated links
    $("[data-toggle=popover]").popover();
    
    
    // Metal Tiers, Explained popover
    $('[data-details="metal-tier"]').popover({
      content: $('#metal-tiers-explained').html(),
      html: true,
      trigger: 'focus',
      container: '#plan-tiles',
      animation: true,
      placement: 'right'
    });
    
    
    // Popovers with advanced formatting -- Drugs, Doctors covered, etc.
    $('[data-details$=covered]').popover({
      content: function () {
        // Get the content from the hidden sibling.
        return $(this).siblings('.' + $(this).attr('data-details') + '-popover-content').html();
      },
      html: true,
      trigger: 'focus',
      container: '#plan-tiles',
      // container: '#plan-tiles',
      animation: true,
      placement: 'bottom'
    });
    
    $('[data-details="star-rating"]').popover({
      animation: true,
      container: '#plan-tiles',
      content: function () {
        // Get the content from the hidden sibling.
        return $(this).siblings('.' + $(this).attr('data-details') + '-popover-content').html();
      },
      html: true,
      placement: 'right',
      title: 'Plan Rating Details',
      trigger: 'focus'
    });
    
    
    // Plan Premiums for a Year (HMC) popovers
    $('[data-details="plan-premium"]').popover({
      content: function () {
        // Get the content from the hidden sibling.
        return $(this).siblings('.' + $(this).attr('data-details') + '-popover-content').html();
      },
      html: true,
      trigger: 'focus',
      container: '#plan-tiles',
      animation: true,
      placement: 'top'
    });
    
    
    // Network-Type Modal
    $('.network-type > button').click(function(){
      $('#network-types-modal').modal('show')
    });
    
    
    // Task Success modal triggers
    $('.trigger').click(function(){
  		$('#success-modal').modal('show');
  	});
  	
  	
  	// Overcome Firefox and Safari wackiness...
  	if (isSafari || isMozilla) {
  	  $('button').click(function(){$(this).focus()});
  	}
  });
  
  
  // Display realistic effective date
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
  
  $('#effectiveDate').text(monthToShow)
  
  
  // Filter drawer functionality
  filterTabs.click(function(){
    var _this = $(this);
    var _target = _this.attr('aria-controls');
    var _sibs = _this.parents('ul').find('a');
    
    if (_this.hasClass('open')) {
      filterDrawers.hide();
      _this.removeClass('open');
      _this.attr('aria-expanded','false');
    } else {
      _sibs.removeClass('open');
      _sibs.attr('aria-expanded','false');
      _this.addClass('open');
      _this.attr('aria-expanded','true');
      filterDrawers.hide();
      $('#' + _target).show();
      $(window).click(function(){
        filterDrawers.hide();
        curtain.hide();
        _this.removeClass('open');
        _this.attr('aria-expanded','false');
      });
      $('.filters').click(function(e){
        e.stopPropagation();
      });
    };
    
    return false;
  });
  
  
  // Carrier filter functionality
  $('#carrier input').click(function(e){
    e.stopImmediatePropagation();
    
    var _checkBoxes = $(this).parents('ol').find('input:checked');
    console.log(_checkBoxes.length);
    
    _results.find('> li').fadeOut(250);
    
    _checkBoxes.each(function(){
      var _this = $(this);
      var _target = _this.val();
      
      _results.find('[data-carrier=' + _target + ']').fadeIn(250);
    });
    
    if (_checkBoxes.length == 0) {
      _results.find('> li').fadeIn(250);
    }
  });
  
  
  // "Sort by" functionality
  $('#results-sorter').change(function(){
    var _this = $(this);
    var _metric = _this.find(':selected').val();
    var _mode = _this.find(':selected').data('mode');
    var _plans = _results.find('> li');
    
    _plans.fadeOut(250, function(){
      _plans.sort(function(a, b){
        if (_mode == 'ascend') {
          return ($(b).data(_metric)) < ($(a).data(_metric)) ? 1 : -1;
        } else if (_mode == 'descend') {
          return ($(b).data(_metric)) > ($(a).data(_metric)) ? 1 : -1;
        } else {
          console.log('An error has occurred...');
          return false;
        }
      }).appendTo(_results).fadeIn(500);
    });
  });
  
  
  // "Sort by" functionality
  $('#results-sorter2 button').click(function(){
    var _this = $(this);
    var _sibs = _this.siblings();
    var _metric = _this.val();
    var _mode = _this.data('mode');
    var _plans = _results.find('> li');
    
    _sibs.removeClass('active');
    _this.addClass('active');
    
    _plans.fadeOut(250, function(){
      _plans.sort(function(a, b){
        if (_mode == 'ascend') {
          return ($(b).data(_metric)) < ($(a).data(_metric)) ? 1 : -1;
        } else if (_mode == 'descend') {
          return ($(b).data(_metric)) > ($(a).data(_metric)) ? 1 : -1;
        } else {
          console.log('An error has occurred...');
          return false;
        }
      }).appendTo(_results).fadeIn(500);
    });
  });
  
  
  // Change the view mode for plan tiles
  viewTabs.click(function(){
    var _this = $(this);
    var _sibs = _this.parents('ul').find('a');
    var _setting = _this.attr('class');
    
    _sibs.removeClass('selected');
    planTiles.attr('class', _setting);
    _this.addClass('selected');
  });
});
