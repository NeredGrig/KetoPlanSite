"use strict";

(function () {
  var prodURL = '/domain' + document.location.search;
  sendRequest(prodURL).then(function (data) {
    setProductData(data.products);
    setTrackers(data.trackers);
    setRef(data.ref);
    setProductLegal(data.legal);
    setClientDomain(data.clientDomain);
  })["catch"](function (e) {
    return console.log(e);
  });
  /**
   *
   * @param {String} url
   * @param {Object} options объект с опциями для запроса
   *
   * По умолчанию GET запрос
   */

  function sendRequest(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return fetch(url, options).then(function (response) {
      return response.json();
    })["catch"](function (e) {
      return console.log(e);
    });
  }

  function setProductData(resData) {
    resData.map(function (product) {
      setProductPrice('.js-new-price', product.price);
      setProductPartPrice('.js-part-price', product.partPrice);
      setProductPriceMinusRub('.js-price-minus-rub', product.price);
      setProductPrice('.js-old-price', product.oldPrice);
      setProductName('.js-product-name', product.name);
      setRecurrentPrice('.js-recurrentPrice', product.recurrentPrice);
      setProductTarif('.js-tariff1', product.tariff[0]);
      setProductTarif('.js-tariff2', product.tariff[1]);
      setProductTarif('.js-tariff3', product.tariff[2]);
      setProductInitialInterval('.js-initialInterval', product.initialInterval);
      setProductFollowingInterval('.js-followingInterval', product.followingInterval);
      setProductFollowingIntervalDay('.js-followingIntervalDay', product.followingInterval);
      setDescription(product.description);
      setTariffDescription(product.tariffDescription);
      setProductId(product.id);
    });
  }
  /**
   *
   * @param {String} selector
   * @param {Number} price
   */


  function setProductPrice(selector, price) {
    document.querySelectorAll(selector).forEach(function (item) {
      return item.textContent = price;
    });
  }
  /**
   *
   * @param {String} selector
   * @param {Number} partPrice
   */


  function setProductPartPrice(selector, partPrice) {
    document.querySelectorAll(selector).forEach(function (item) {
      return item.textContent = partPrice;
    });
  }
  /**
   *
   * @param {String} selector
   * @param {Number} price
   */


  function setProductPriceMinusRub(selector, price) {
    document.querySelectorAll(selector).forEach(function (item) {
      var minPrice = price - 1;
      item.textContent = minPrice;
    });
  }
  /**
   *
   * @param {String} selector
   * @param {String} name
   */


  function setProductName(selector, name) {
    document.querySelectorAll(selector).forEach(function (item) {
      return item.textContent = name;
    });
  }
  /**
   *
   * @param {String} selector
   * @param {Number} recurrentPrice
   */


  function setRecurrentPrice(selector, recurrentPrice) {
    document.querySelectorAll(selector).forEach(function (item) {
      return item.textContent = recurrentPrice;
    });
  }
  /**
   *
   * @param {String} description
   */


  function setDescription(description) {
    $('.js-pay-description').html(description);
  }
  /**
   *
   * @param {String} legal
   */


  function setProductLegal(legal) {
    $('.js-legal').html(legal);
  }
  /**
   *
   * @param {String} tarifDescription
   */


  function setTariffDescription(tarifDescription) {
    var place = $('.prices__list-holder');
    place.append(tarifDescription);
  }
  /**
   *
   * @param {String} selector
   * @param {Number} price
   */


  function setProductTarif(selector, price) {
    document.querySelectorAll(selector).forEach(function (item) {
      return item.textContent = price;
    });
  }
  /**
   *
   * @param {String} selector
   * @param {Number} time
   */


  function setProductInitialInterval(selector, time) {
    document.querySelectorAll(selector).forEach(function (item) {
      return item.textContent = time;
    });
  }
  /**
   *
   * @param {String} selector
   * @param {Number} time
   */


  function setProductFollowingInterval(selector, time) {
    document.querySelectorAll(selector).forEach(function (item) {
      item.textContent = time;
    });
  }
  /**
   *
   * @param {String} selector
   * @param {Number} time
   */


  function setProductFollowingIntervalDay(selector, time) {
    document.querySelectorAll(selector).forEach(function (item) {
      var days = Math.floor(time / 24);
      var txt = days;

      if (days === 1) {
        txt = days + " день";
      } else if (days >= 2 && days <= 4) {
        txt = days + " дня";
      } else if (days >= 5) {
        txt = days + " дней";
      }

      item.textContent = txt;
    });
  }
  /**
   *
   * @param {Number} id
   */


  function setProductId(id) {
    document.getElementById('js-product-id').value = id;
  }
  /**
   *
   * @param {Boolean} ref
   */


  function setRef(ref) {
    if (ref) {
      $('.basket__condition').hide();
      $('.basket__check-input').prop('checked', true);
      $('.basket__button').prop('disabled', false);
      $('.basket__check2').css('display', 'flex');
      $('.js-tariff-link').hide();
    } else {
      $('.basket__check').css('display', 'flex');
      $('.basket__condition').show();
    }

    ym(80078182, 'params', {
      ref: ref
    });
  }
  /**
   *
   * @param {String} clientUrl
   */


  function setClientDomain(clientUrl) {
    if (clientUrl) {
      $('.js-enter-btn').attr('href', clientUrl).show();
      $('.js-unsubscribe').attr('href', clientUrl + '/unsubscribe');
    }
  }
  /**
   *
   * @param {String} trackers
   */


  function setTrackers(trackers) {
    var scriptElement = document.createElement('script');
    scriptElement.innerHTML = trackers;
    document.querySelector('body').append(scriptElement);
  }
})();