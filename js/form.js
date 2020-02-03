'use strict';
(function () {
  var PIN_MARGIN_TOP = 48;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var MIN_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var ROOMS_EXCEPTOPN = '100';
  var VISITOR_EXCEPTOPN = '0';

  var mapSection = document.querySelector('section.map');
  var mainPin = document.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var addressInput = form.querySelector('#address');
  var adTitle = form.querySelector('#title');
  var checkIn = form.querySelector('#timein');
  var checkOut = form.querySelector('#timeout');
  var submitBtn = form.querySelector('.ad-form__submit');
  var apartmentType = form.querySelector('#type');
  var apartmentPrice = form.querySelector('#price');
  var rooms = form.querySelector('#room_number');
  var visitors = form.querySelector('#capacity');

  var titleWarningText = 'Длина заголовка должна быть от ' + MIN_TITLE_LENGTH + ' до ' + MAX_TITLE_LENGTH + ' символов';
  var capacityWarningText = 'Число гостей не соотвествует числу комнат';

  var unlockFormFieldsets = function () {
    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].disabled = false;
    }
  };

  var getPonEdgeCords = function () {
    addressInput.value = mainPinLeftCord + ', ' + (mainPinTopCord + PIN_MARGIN_TOP);
  };

  var mainPinDownHandler = function () {
    mapSection.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    unlockFormFieldsets();
    getPonEdgeCords();
  };

  var setPriceMinValue = function () {
    apartmentPrice.placeholder = MIN_PRICE[apartmentType.value];
  };

  var setTitleValidity = function () {
    var titleValidity = (adTitle.value.length < MIN_TITLE_LENGTH) || (adTitle.value.length > MAX_TITLE_LENGTH);
    if (titleValidity) {
      adTitle.setCustomValidity(titleWarningText);
    } else {
      adTitle.setCustomValidity('');
    }
    return titleValidity;
  };

  var setPriceValidity = function () {
    var priceValidity = (apartmentPrice.value < MIN_PRICE[apartmentType.value]) || (apartmentPrice.value > MAX_PRICE);
    if (priceValidity) {
      var priceWarningText = 'Цена за ночь на выбранный тип жилья находится в интервале от ' + MIN_PRICE[apartmentType.value] + ' до ' + MAX_PRICE;
      apartmentPrice.setCustomValidity(priceWarningText);
    } else {
      apartmentPrice.setCustomValidity('');
    }
    return priceValidity;
  };

  var setCapacitiValidity = function () {
    var roomsQuantity = rooms.value;
    var visitorsQuantity = visitors.value;
    var validityCondition = (roomsQuantity < visitorsQuantity) || ((roomsQuantity === ROOMS_EXCEPTOPN) !== (visitorsQuantity === VISITOR_EXCEPTOPN));
    if (validityCondition) {
      visitors.setCustomValidity(capacityWarningText);
    } else {
      visitors.setCustomValidity('');
    }
    return validityCondition;
  };

  var validateForm = function () {
    return (!setTitleValidity()) && (!setPriceValidity() && (!setCapacitiValidity()));
  };

  var onCheckInChange = function (evt) {
    checkOut.value = evt.currentTarget.value;
  };

  var onCheckOutChange = function (evt) {
    checkIn.value = evt.currentTarget.value;
  };

  var mainPinLeftCord = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
  var mainPinTopCord = Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);

  addressInput.value = mainPinLeftCord + ', ' + mainPinTopCord;

  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].disabled = true;
  }

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      mainPinDownHandler();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      mainPinDownHandler();
    }
  });

  apartmentType.addEventListener('change', setPriceMinValue);
  checkIn.addEventListener('change', onCheckInChange);
  checkOut.addEventListener('change', onCheckOutChange);

  submitBtn.addEventListener('click', validateForm);

})();
