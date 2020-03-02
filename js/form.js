'use strict';

(function () {
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

  var titleWarningText = 'Длина заголовка должна быть от ' + window.constants.validationConsts.MIN_TITLE_LENGTH + ' до ' + window.constants.validationConsts.MAX_TITLE_LENGTH + ' символов';
  var capacityWarningText = 'Число гостей не соотвествует числу комнат';

  var unlockFormFieldsets = function () {
    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].disabled = false;
    }
  };

  var setPriceMinValue = function () {
    apartmentPrice.placeholder = window.constants.validationConsts.MIN_PRICE[apartmentType.value];
  };

  var setTitleValidity = function () {
    var titleValidity = (adTitle.value.length < window.constants.validationConsts.MIN_TITLE_LENGTH) || (adTitle.value.length > window.constants.validationConsts.MAX_TITLE_LENGTH);
    if (titleValidity) {
      adTitle.setCustomValidity(titleWarningText);
    } else {
      adTitle.setCustomValidity('');
    }
    return titleValidity;
  };

  var setPriceValidity = function () {
    var priceValidity = (apartmentPrice.value < window.constants.validationConsts.MIN_PRICE[apartmentType.value]) || (apartmentPrice.value > window.constants.validationConsts.MAX_PRICE);
    if (priceValidity) {
      var priceWarningText = 'Цена за ночь на выбранный тип жилья находится в интервале от ' + window.constants.validationConsts.MIN_PRICE[apartmentType.value] + ' до ' + window.constants.validationConsts.MAX_PRICE;
      apartmentPrice.setCustomValidity(priceWarningText);
    } else {
      apartmentPrice.setCustomValidity('');
    }
    return priceValidity;
  };

  var setCapacitiValidity = function () {
    var roomsQuantity = rooms.value;
    var visitorsQuantity = visitors.value;
    var validityCondition = (roomsQuantity < visitorsQuantity) || ((roomsQuantity === window.constants.validationConsts.ROOMS_EXCEPTOPN) !== (visitorsQuantity === window.constants.validationConsts.VISITOR_EXCEPTOPN));
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

  var unlockForm = function () {
    form.classList.remove('ad-form--disabled');
    unlockFormFieldsets();

    apartmentType.addEventListener('change', setPriceMinValue);
    checkIn.addEventListener('change', onCheckInChange);
    checkOut.addEventListener('change', onCheckOutChange);
    submitBtn.addEventListener('click', validateForm);
  };

  var setFormAdress = function (firstPart, secondPart) {
    addressInput.value = Math.round(firstPart) + ', ' + Math.round(secondPart);
  };

  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].disabled = true;
  }

  window.form = {
    unlockForm: unlockForm,
    setFormAdress: setFormAdress
  };

})();
