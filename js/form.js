'use strict';

(function () {
  var main = document.querySelector('main');
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
  var resetBtn = form.querySelector('.ad-form__reset');

  var titleWarningText = 'Длина заголовка должна быть от ' + window.constants.validationConsts.MIN_TITLE_LENGTH + ' до ' + window.constants.validationConsts.MAX_TITLE_LENGTH + ' символов';
  var capacityWarningText = 'Число гостей не соотвествует числу комнат';

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

  var resetBtnHandler = function () {
    window.map.initMap();
    resetBtn.removeEventListener('click', resetBtnHandler);
  };

  var unlockForm = function () {
    form.classList.remove('ad-form--disabled');
    window.service.itemsSetDisable(fieldsets, false);
    setPriceMinValue();
    apartmentType.addEventListener('change', setPriceMinValue);
    checkIn.addEventListener('change', onCheckInChange);
    checkOut.addEventListener('change', onCheckOutChange);
    submitBtn.addEventListener('click', validateForm);
    resetBtn.addEventListener('click', resetBtnHandler);
  };

  var lockForm = function () {
    form.classList.add('ad-form--disabled');
    form.reset();
    window.service.itemsSetDisable(fieldsets, true);
    setPriceMinValue();
    apartmentType.removeEventListener('change', setPriceMinValue);
    checkIn.removeEventListener('change', onCheckInChange);
    checkOut.removeEventListener('change', onCheckOutChange);
    submitBtn.removeEventListener('click', validateForm);
    resetBtn.removeEventListener('click', resetBtnHandler);
  };

  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

  var hideValidityMessage = function (evt) {
    evt.target.setCustomValidity('');
  };

  adTitle.addEventListener('keydown', hideValidityMessage);
  apartmentPrice.addEventListener('keydown', hideValidityMessage);
  visitors.addEventListener('keydown', hideValidityMessage);

  var successUploadHandler = function () {

    main.prepend(successMessage);

    window.map.initMap();

    var messageCloseByClick = function () {
      successMessage.remove();
      document.removeEventListener('mousedown', messageCloseByClick);
      document.removeEventListener('keydown', messageCloseByEscPress);
    };

    var messageCloseByEscPress = function (evt) {
      if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
        successMessage.remove();
        document.removeEventListener('mousedown', messageCloseByClick);
        document.removeEventListener('keydown', messageCloseByEscPress);
      }
    };

    document.addEventListener('mousedown', messageCloseByClick);
    document.addEventListener('keydown', messageCloseByEscPress);
  };

  var errorUploadHandler = function (message) {
    var errorEscBtn = errorMessage.querySelector('.error__button');
    var errorText = errorMessage.querySelector('.error__message');

    errorText.textContent = message;

    main.prepend(errorMessage);

    var errorCloseByClick = function () {
      errorMessage.remove();
      document.removeEventListener('keydown', errorCloseByEscPress);
    };

    var errorCloseByEscPress = function (evt) {
      if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
        errorMessage.remove();
        document.removeEventListener('keydown', errorCloseByEscPress);
      }
    };

    errorEscBtn.addEventListener('mousedown', errorCloseByClick);
    document.addEventListener('keydown', errorCloseByEscPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.upload(new FormData(form), successUploadHandler, errorUploadHandler);
  });

  var setFormAdress = function (firstPart, secondPart) {
    addressInput.value = Math.round(firstPart) + ', ' + Math.round(secondPart);
  };

  window.form = {
    unlockForm: unlockForm,
    lockForm: lockForm,
    setFormAdress: setFormAdress
  };
})();
