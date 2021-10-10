"use strict";

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var cens = urlParams.get('cens');
  var tariff = urlParams.get('tariff');

  if (cens) {
    $('.version1').hide();
    $('.censor').show();
  }

  if (tariff) {
    $('.contacts__tariff').show();
  }
});