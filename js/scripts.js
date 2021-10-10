"use strict";
"use strict";
"use strict";
"use strict";

$(document).ready(function () {
  var hash,
      flagVersion2 = false;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('.');

    if (hash[0] == 'ver=2') {
      flagVersion2 = true;
    }
  }

  if (flagVersion2) {
    $('.creation__success.version1').remove();
  }
});
"use strict";

$('.faqPage__item').on('click', function () {
  $(this).toggleClass('active');
  $(this).children('.faqPage__item-text').slideToggle(300);
});
"use strict";
"use strict";
"use strict";
"use strict";
"use strict";

$(document).ready(function () {
  $('.resume__item-help').on('click', function () {
    $(this).siblings('.resume__popup').css("display", "flex").animate({
      width: ["100%", "swing"]
    }, 600);
  });
  $('.resume__popup-close').on('click', function () {
    $(this).parent('.resume__popup').fadeOut('slow');
  }); // =========================================== Data collection

  var resumeCards = document.querySelectorAll('.resume__item');
  var dataComplete = false;

  var UserData = function UserData() {
    this.data = {
      userName: 'Посетитель',
      gender: null,
      activity: null,
      protein: null,
      vegetables: null,
      food: null,
      labor: null,
      habbits: null,
      age: null,
      weight: null,
      height: null,
      new_weight: null
    };

    this.handleChange = function (name, value) {
      var _this = this;

      if (name in this.data) {
        this.data[name] = value;

        for (var i = 0; i < resumeCards.length; i++) {
          calc(i, this.data);
        }

        dataComplete = Object.keys(this.data).every(function (key) {
          return !!_this.data[key];
        });
      }
    };

    this.checkKey = function (name) {
      if (this.data[name]) {
        return true;
      }

      return false;
    };
  };

  var data = new UserData();
  var gendorButtons = document.querySelectorAll('.getplan__item');
  var activityArr = document.getElementsByName('activity');
  var meatArr = document.getElementsByName('meat');
  var seafoodArr = document.getElementsByName('seafood');
  var proteinArr = document.querySelectorAll('.js-protein');
  var vegetablesArr = document.getElementsByName('vegetables');
  var foodArr = document.getElementsByName('food');
  var laborArr = document.getElementsByName('labor');
  var habbitsArr = document.getElementsByName('habbits');
  var limit2 = document.querySelectorAll('.js-limit-2');
  var limit3 = document.querySelectorAll('.js-limit-3');
  var busy = false;
  gendorButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      data.handleChange('gender', this.value);
    });
  }); // =========================================== inputs click change styles

  activityArr.forEach(function (item) {
    item.addEventListener('change', function () {
      changeRadio(activityArr, item);
      data.handleChange('activity', this.value);
    });
  });
  meatArr.forEach(function (item) {
    item.addEventListener('change', function () {
      var label = item.closest('label');
      var labelActive = label.classList.contains('active');
      var restrict = item.dataset.restrict === "meat";

      if (restrict) {
        for (var i = 0; i < meatArr.length; i++) {
          meatArr[i].closest('label').classList.remove('active');
        }

        if (labelActive) {
          label.classList.remove('active');
        } else {
          label.classList.add('active');
        }
      } else if (!labelActive && !restrict) {
        label.classList.add('active');

        for (var _i = 0; _i < meatArr.length; _i++) {
          if (meatArr[_i].dataset.restrict === "meat" && meatArr[_i].closest('label').classList.contains('active')) {
            meatArr[_i].closest('label').classList.remove('active');
          }
        }
      } else {
        label.classList.remove('active');
      }
    });
  });
  seafoodArr.forEach(function (item) {
    item.addEventListener('change', function () {
      var label = item.closest('label');
      var labelActive = label.classList.contains('active');
      var restrict = item.dataset.restrict === "seafood";

      if (restrict) {
        for (var i = 0; i < seafoodArr.length; i++) {
          seafoodArr[i].closest('label').classList.remove('active');
        }

        if (labelActive) {
          label.classList.remove('active');
        } else {
          label.classList.add('active');
        }
      } else if (!labelActive && !restrict) {
        label.classList.add('active');

        for (var _i2 = 0; _i2 < seafoodArr.length; _i2++) {
          if (seafoodArr[_i2].dataset.restrict === "seafood" && seafoodArr[_i2].closest('label').classList.contains('active')) {
            seafoodArr[_i2].closest('label').classList.remove('active');
          }
        }
      } else {
        label.classList.remove('active');
      }
    });
  });
  proteinArr.forEach(function (item) {
    item.addEventListener('change', function () {
      if (verifyCheckboxChecked(proteinArr)) {
        data.handleChange('protein', this.value);
      } else {
        data.handleChange('protein', null);
      }
    });
  });
  vegetablesArr.forEach(function (item) {
    item.addEventListener('change', function () {
      changeCheckbox(item);

      if (verifyCheckboxChecked(vegetablesArr)) {
        data.handleChange('vegetables', this.value);
      } else {
        data.handleChange('vegetables', null);
      }
    });
  });
  habbitsArr.forEach(function (item) {
    item.addEventListener('change', function () {
      changeCheckbox(item);

      if (verifyCheckboxChecked(habbitsArr)) {
        data.handleChange('habbits', this.value);
      } else {
        data.handleChange('habbits', null);
      }
    });
  });
  foodArr.forEach(function (item) {
    item.addEventListener('change', function () {
      changeCheckbox(item);

      if (verifyCheckboxChecked(foodArr)) {
        data.handleChange('food', this.value);
      } else {
        data.handleChange('food', null);
      }
    });
  });
  laborArr.forEach(function (item) {
    item.addEventListener('change', function () {
      changeRadio(laborArr, item);
      data.handleChange('labor', this.value);
    });
  }); // =========================================== Limit input characters

  limit2.forEach(function (item) {
    item.addEventListener('keyup', function () {
      limitInputCharacters(2, item);
    });
  });
  limit3.forEach(function (item) {
    item.addEventListener('keyup', function () {
      limitInputCharacters(3, item);
    });
  }); // =========================================== user params collect to Data

  var personData = document.getElementsByName('person-data');
  personData.forEach(function (item) {
    item.addEventListener('change', function () {
      if (item.id === "age") {
        data.handleChange('age', parseInt(item.value));
      } else if (item.id === "height") {
        data.handleChange("height", parseInt(item.value));
      } else if (item.id === "weight") {
        data.handleChange("weight", parseInt(item.value));
      } else if (item.id === "wish-weight") {
        data.handleChange("new_weight", parseInt(item.value));
      }
    });
  }); // =========================================== supporting functions

  function limitInputCharacters(limitNumber, item) {
    var characters = item.value.split('');

    if (characters.length > limitNumber) {
      item.value = item.value.substring(0, limitNumber);
    }
  }

  function changeCheckbox(item) {
    var label = item.closest('label');
    var labelActive = label.classList.contains('active');

    if (labelActive) {
      label.classList.remove('active');
    } else {
      label.classList.add('active');
    }
  }

  function changeRadio(arr, item) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].closest('label').classList.remove('active');
    }

    item.closest('label').classList.add('active');
  }

  function verifyCheckboxChecked(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].checked) {
        return true;
      }
    }
  } // =========================================== Data calculation function


  function calc(item, data) {
    var sex = data.gender;
    var age = data.age;
    var height = data.height;
    var weight = data.weight;
    var active = data.activity;
    var new_weight = data.new_weight;
    var text_value = $(".resume__item_".concat(item, " .resume__item-text"));
    var card = $(".resume__item_".concat(item));

    function removeCardClassIndex() {
      var maxIndexOfClasses = 10;

      for (var i = 0; i <= maxIndexOfClasses; i++) {
        card.removeClass("class-".concat(i));
      }
    }

    if (item == 1) {
      //Ваш ИМТ
      var decimal_places = 2;
      var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);

      var _calc = Math.ceil(weight / (height / 100 * (height / 100)) * 100) / 100;

      var line = $('.resume__item-drop');
      var value = $('.resume__item-num');
      value.animateNumber({
        number: _calc * decimal_factor,
        numberStep: function numberStep(now, tween) {
          var floored_number = Math.floor(now) / decimal_factor,
              target = $(tween.elem);

          if (decimal_places > 0) {
            floored_number = floored_number.toFixed(decimal_places);
            floored_number = floored_number.toString().replace('.', ',');
          }

          target.text(floored_number);
        }
      }, {
        easing: 'swing',
        duration: 1000
      });

      if (_calc <= 16) {
        removeCardClassIndex();
        line.addClass('resume__item-drop--veryskin');
        text_value.html('Выраженный дефицит массы тела');
      } else if (_calc > 16 && _calc <= 18.5) {
        removeCardClassIndex();
        line.addClass('resume__item-drop--skin');
        text_value.html('Недостаточная (дефицит) масса тела');
      } else if (_calc > 18.5 && _calc <= 24.99) {
        removeCardClassIndex();
        line.addClass('resume__item-drop--normal');
        text_value.html('Норма');
      } else if (_calc > 24.99 && _calc <= 35) {
        removeCardClassIndex();
        line.addClass('resume__item-drop--fat');
        text_value.html('Ожирение');
      } else if (_calc > 35) {
        removeCardClassIndex();
        line.addClass('resume__item-drop--veryfat');
        text_value.html('Ожирение резкое');
      }
    } else if (item == 2) {
      //Метаболический возраст
      var mAge = '';
      var youngImg = $('.resume__item-look--young path');
      var adultImg = $('.resume__item-look--adult path');
      var oldImg = $('.resume__item-look--old path');

      if (sex == 1) {
        mAge = Math.round(0.629 * age + 18.56);
        $('.resume__item-look--man').css("display", "block");
      } else {
        mAge = Math.round(0.58 * age + 17.24);
        $('.resume__item-look--woman').css("display", "block");
      }

      if (mAge <= 20) {
        youngImg.css("fillOpacity", "1");
        adultImg.css("fillOpacity", "0.4");
        oldImg.css("fillOpacity", "0.4");
      } else if (mAge > 20 && mAge <= 40) {
        adultImg.css("fillOpacity", "1");
        youngImg.css("fillOpacity", "0.4");
        oldImg.css("fillOpacity", "0.4");
      } else if (mAge > 41) {
        oldImg.css("fillOpacity", "1");
        adultImg.css("fillOpacity", "0.4");
        youngImg.css("fillOpacity", "0.4");
      }

      var devision = mAge % 10;
      var ageTag = 'лет';

      if (mAge < 21) {
        ageTag = 'лет';
      } else if (devision == 1) {
        ageTag = 'год';
      } else if (devision > 1 && devision < 5) {
        ageTag = 'года';
      } else if (devision > 5) {
        ageTag = 'лет';
      }

      text_value.html("".concat(mAge, " ").concat(ageTag));
    } else if (item == 3) {
      //Калории
      var call_from = '';
      var call_to = '';
      var call_arrow = '';
      var bmr = '';
      var amr = '';

      if (sex == 1) {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
      }

      if (active == 1) {
        amr = 1.2;
      } else if (active == 2) {
        amr = 1.375;
      } else if (active == 3) {
        amr = 1.55;
      } else if (active == 4) {
        amr = 1.725;
      } else if (active == 5) {
        amr = 1.9;
      }

      call_from = Math.round(bmr * amr - bmr * amr * 0.2);
      call_to = call_from + 100;
      text_value.html(call_from + '-' + call_to);
    } else if (item == 4) {
      //         //Вода
      var ruler = $('.resume__item-scale');
      var ruler_s = $('.resume__item-scale-holder').outerHeight() / 100;
      var l = '';

      if (weight >= 90) {
        if (active == 1) {
          l = 3;
        } else if (active == 2 || active == 3) {
          l = 3.5;
        } else if (active == 4 || active == 5) {
          l = 3.9;
        }
      } else if (weight >= 80) {
        if (active == 1) {
          l = 2.5;
        } else if (active == 2 || active == 3) {
          l = 2.9;
        } else if (active == 4 || active == 5) {
          l = 3.3;
        }
      } else if (weight >= 70) {
        if (active == 1) {
          l = 2.3;
        } else if (active == 2 || active == 3) {
          l = 2.5;
        } else if (active == 4 || active == 5) {
          l = 3;
        }
      } else if (weight >= 60) {
        if (active == 1) {
          l = 1.8;
        } else if (active == 2 || active == 3) {
          l = 2.3;
        } else if (active == 4 || active == 5) {
          l = 2.6;
        }
      } else if (weight >= 50) {
        if (active == 1) {
          l = 1.5;
        } else if (active == 2 || active == 3) {
          l = 2;
        } else if (active == 4 || active == 5) {
          l = 2.3;
        }
      }

      ruler.css({
        height: ruler_s * (l / 5 * 100)
      });
      text_value.html("".concat(l, " \u043B"));
    } else if (item == 5) {//Похудение в зонах
      //Нечего считать
    } else if (item == 6) {
      //Достижимый вес
      var good_weight = '';
      var label = " кг";

      if (weight > new_weight) {
        var maxdown = '';

        if (weight >= 100) {
          maxdown = 8;
        } else if (weight >= 70) {
          maxdown = 6;
        } else {
          maxdown = 5;
        }

        if (weight - new_weight < maxdown) {
          good_weight = new_weight;
        } else {
          good_weight = weight - maxdown;
        }
      } else {
        var maxup = weight + weight / 100 * 7;

        if (new_weight >= maxup) {
          good_weight = maxup;
        } else {
          good_weight = new_weight;
        }
      }

      text_value.html(Math.round(good_weight) + label);
    } else if (item == 7) {
      //Мой вес
      var max_weight = 250;
      var _good_weight = '';
      var _label = " кг";

      if (weight > new_weight) {
        var _maxdown = '';
        var dif = weight - new_weight;

        if (weight >= 100) {
          _maxdown = 8;
        } else if (weight >= 70) {
          _maxdown = 6;
        } else {
          _maxdown = 5;
        }

        if (dif < _maxdown) {
          _good_weight = new_weight;
        } else {
          _good_weight = weight - _maxdown;
        }
      } else {
        var _maxup = weight + weight / 100 * 7;

        if (new_weight >= _maxup) {
          _good_weight = _maxup;
        } else {
          _good_weight = new_weight;
        }
      }

      text_value.html(Math.round(_good_weight) + _label);
    } else if (item == 8) {//Кетогенная диета
      //Нечего считать
    }
  } // =========================================== jump to next block


  var sectionIndex = 0;
  var stageIndex = 0;
  var sidebarFigures = document.querySelectorAll('.sidebar__figure');
  var progressbarPoints = document.querySelectorAll('.progress-bar__img');
  var progressbarItem = document.querySelectorAll('.progress-bar__item');
  var stageFigures = document.querySelectorAll('.scene__stage-arts');
  var stages = document.querySelectorAll('.js-stage');
  var sections = document.querySelectorAll('.js-section');
  var stageNextButtons = document.querySelectorAll('.js-next-stage');
  var stagePrevButtons = document.querySelectorAll('.js-prev-stage');
  var sectionNextButtons = document.querySelectorAll('.js-next-section');
  var sectionPrevButtons = document.querySelectorAll('.js-prev-section');
  var homeButtons = document.querySelectorAll('.js-home');
  var ftr = document.querySelector('.footer');
  var hdr = document.querySelector('.header');

  function addSectionClass() {
    if (sections[sectionIndex] !== undefined) {
      sections[sectionIndex].classList.add('active');

      if ($('.resume-content').hasClass('active')) {
        $('.reviews__slider').slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          responsive: [{
            breakpoint: 1115,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              infinite: true,
              dots: true
            }
          }, {
            breakpoint: 740,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              infinite: true,
              dots: true
            }
          }]
        });
      }
    }
  }

  ;

  function removeSectionClass() {
    if (sections[sectionIndex] !== undefined) {
      sections[sectionIndex].classList.remove('active');
    }
  }

  ;

  function addBlocksClass() {
    if (progressbarPoints[stageIndex] !== undefined) {
      progressbarPoints[stageIndex].classList.add('show');
    }

    if (progressbarPoints[stageIndex + 1] !== undefined) {
      progressbarPoints[stageIndex + 1].classList.add('active'); // progressbarItem.classList.add('slick-current')
    }

    if (progressbarPoints[stageIndex + 2] !== undefined) {
      progressbarPoints[stageIndex + 2].classList.add('show');
    }

    if (sidebarFigures[stageIndex] !== undefined) {
      sidebarFigures[stageIndex].classList.add('active');
    }

    if (stageFigures[stageIndex] !== undefined) {
      stageFigures[stageIndex].classList.add('active');
    }

    if (stages[stageIndex] !== undefined) {
      stages[stageIndex].classList.add('active');
    }
  }

  function removeBlocksClass() {
    if (progressbarPoints[stageIndex] !== undefined) {
      progressbarPoints[stageIndex].classList.remove('show');
    }

    if (progressbarPoints[stageIndex + 1] !== undefined) {
      progressbarPoints[stageIndex + 1].classList.remove('active');
    }

    if (progressbarPoints[stageIndex + 2] !== undefined) {
      progressbarPoints[stageIndex + 2].classList.remove('show');
    }

    if (sidebarFigures[stageIndex] !== undefined) {
      sidebarFigures[stageIndex].classList.remove('active');
    }

    if (stageFigures[stageIndex] !== undefined) {
      stageFigures[stageIndex].classList.remove('active');
    }

    if (stages[stageIndex] !== undefined) {
      stages[stageIndex].classList.remove('active');
    }
  }

  function nextSection() {
    progressbarPoints[stageIndex].classList.remove('active');
    removeSectionClass();
    sectionIndex++;
    addBlocksClass();
    addSectionClass();
  }

  function prevSection() {
    removeSectionClass();
    sectionIndex--;
    addSectionClass();
    progressbarPoints[stageIndex].classList.add('active');
    progressbarPoints[stageIndex + 1].classList.remove('active');
  }

  function nextBlock() {
    removeBlocksClass();
    stageIndex++;
    addBlocksClass();
    $('.js-progress-bar-slider').slick('slickNext');
  }

  function prevBlock() {
    removeBlocksClass();
    stageIndex--;
    addBlocksClass();
    $('.js-progress-bar-slider').slick('slickPrev');
  }

  function home() {
    removeSectionClass();
    removeBlocksClass();
    sectionIndex = 0;
    stageIndex = 0;
    addSectionClass();
    addBlocksClass();
  }

  ;
  stageNextButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      $("html, body").stop().animate({
        scrollTop: 0
      }, 500);

      if (data.checkKey(item.dataset.check)) {
        nextBlock();
      }
    });
  });
  stagePrevButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      $("html, body").stop().animate({
        scrollTop: 0
      }, 500);
      prevBlock();
    });
  });
  sectionNextButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      $("html, body").stop().animate({
        scrollTop: 0
      }, 500);
      nextSection();
    });
  });
  sectionPrevButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      $("html, body").stop().animate({
        scrollTop: 0
      }, 500);
      prevSection();
    });
  });
  homeButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      home();
    });
  }); // =========================================== Calc Data & Animation start trigger

  var bar = document.querySelector('.progress-bar');
  document.querySelector('.js-count-start').addEventListener('click', function () {
    if (dataComplete) {
      nextSection();
      bar.style.display = "none";

      if (!busy) {
        clearAnimationFootprint();
        setTimeout(animateCreation, 200);
      }
    }
  });

  function clearAnimationFootprint() {
    document.querySelector('.creation__success').classList.remove('active');
    document.querySelector('.fill-box__loader').classList.add('load-animation');
  } // =========================================== animation function


  function animateCreation() {
    var creationSuccess = document.querySelector('.creation__success');
    var loader = document.querySelector('.fill-box__line');
    var loaderInner = document.querySelector('.fill-box');
    var percent = document.querySelector('.fill-box__progress');
    var textArr = document.querySelectorAll('.creation__text');
    var delay = +(10000 / textArr.length).toFixed();
    var counter = 0;
    var index = 0;
    percent.textContent = '0';
    var percentTimeout = setTimeout(function tick() {
      counter++;
      percent.textContent = "".concat(counter, "%");
      percentTimeout = setTimeout(tick, 96);

      if (counter >= 100) {
        clearTimeout(percentTimeout);
      }
    }, 96);
    textArr[index].classList.add('active');
    var animSuccess = document.querySelector('.creation__success');
    var textTimeout = setTimeout(function slide() {
      if (textArr[index] && textArr[index].classList.contains('active')) {
        textArr[index].classList.remove('active');
      }

      index++;

      if (textArr[index]) {
        textArr[index].classList.add('active');
      }

      textTimeout = setTimeout(slide, delay);

      if (index >= textArr.length) {
        clearTimeout(textTimeout);
        setTimeout(function () {
          creationSuccess.classList.add('active');
        }, 500);
        busy = false;
        loader.style.strokeDasharray = '765.48';
        loader.classList.remove('load-animation');
        loaderInner.style.display = "none";
        animSuccess.style.display = "block";

        if (creationSuccess.classList.contains('censor')) {
          nextSection();
        }
      }
    }, delay);
  }

  ;
  $('.form__check-input').prop('checked', false);
  $('.form__btn').prop('disabled', true);
  $('.form__check-input').click(function () {
    $('.form__btn').prop("disabled", !$('.form__btn').prop("disabled"));
  });
  $('.form').submit(function (e) {
    e.preventDefault();
    var email = $(this).children('.email').val();
    var name = $(this).children('.name').val();
    var nameValidate = /^[a-zA-Zа-яА-ЯёЁ0-9'][a-zA-Z-а-яА-ЯёЁ0-9' ]+[a-zA-Zа-яА-ЯёЁ0-9']?$/;
    var emailValidate = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    if (nameValidate.test(name) && emailValidate.test(email.toLowerCase())) {
      $('.error').remove();
      $('.form__input').val('');
      document.location.href = "http://clickfrm.com/CcxV"();
    } else {
      e.preventDefault();
      $('.error').text('Укажите корректный email или name');
    }
  });
});
"use strict";
"use strict";
"use strict";
"use strict";
"use strict";
"use strict";

var sliderIsLive = false;

if (sliderIsLive) {
  $('.js-progress-bar-slider').slick('unslick');
} else {
  if (window.innerWidth <= 900 && !sliderIsLive) {
    $('.js-progress-bar-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: '<button class="progress-bar__next"></button>',
      prevArrow: '<button class="progress-bar__prev"></button>',
      appendArrows: $('.progress-bar__arrows'),
      responsive: [{
        breakpoint: 650,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }]
    });
  }
}

window.addEventListener("resize", function () {
  if (window.innerWidth <= 900) {
    $('.js-progress-bar-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: '<button class="progress-bar__next"></button>',
      prevArrow: '<button class="progress-bar__prev"></button>',
      appendArrows: $('.progress-bar__arrows'),
      responsive: [{
        breakpoint: 650,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }]
    });
    sliderIsLive = true;
  } else {
    $('.js-progress-bar-slider').slick('unslick');
  }
});
"use strict";
"use strict";
"use strict";
"use strict";
"use strict";
"use strict";

var time = 900;
var intr;

function start_timer() {
  intr = setInterval(tick, 1000);
}

function tick() {
  time = time - 1;
  var mins = Math.floor(time / 60);
  var secs = time - mins * 60;

  if (mins == 0 && secs == 0) {
    clearInterval(intr);
  }

  secs = secs >= 10 ? secs : "0" + secs;
  $(".minutes").html(mins >= 10 ? mins : "0" + mins);
  $(".seconds").html(secs);
}