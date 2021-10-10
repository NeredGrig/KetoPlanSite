"use strict";

$('.js-payform').submit(function (e) {
  var email = $('.form__input').val(); // var name = $(this).children('.name').val();
  // var nameValidate = /^[a-zA-Zа-яА-ЯёЁ0-9'][a-zA-Z-а-яА-ЯёЁ0-9' ]+[a-zA-Zа-яА-ЯёЁ0-9']?$/;

  var emailValidate = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

  if (emailValidate.test(email.toLowerCase())) {
    $('.error-alert').remove(); // $('.form__input').val('');

    $('.basket__button').prop('disabled', true);

    try {
      ym(80078182, 'reachGoal', 'pay');
    } catch (err) {
      console.error(err);
    }
  } else {
    e.preventDefault();
    $('.error-alert').text('Укажите корректный email');
  }
});