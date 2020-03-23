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
  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var avatarInput = form.querySelector('#avatar');
  var titlePreview = form.querySelector('.ad-form-header__preview img');
  var photosInput = form.querySelector('#images');
  var photosContainer = form.querySelector('.ad-form__photo-container');

  var onTypeChange = function () {
    apartmentPrice.placeholder = window.constants.ValidationConsts.MIN_PRICE[apartmentType.value];
  };

  var setTitleValidity = function () {
    var titleValidity = (adTitle.value.length < window.constants.ValidationConsts.MIN_TITLE_LENGTH) || (adTitle.value.length > window.constants.ValidationConsts.MAX_TITLE_LENGTH);
    if (titleValidity) {
      adTitle.setCustomValidity(window.constants.AD_TITLE_VALIDITY_TEXT);
    } else {
      adTitle.setCustomValidity('');
    }
    return titleValidity;
  };

  var setPriceValidity = function () {
    var priceValidity = (apartmentPrice.value < window.constants.ValidationConsts.MIN_PRICE[apartmentType.value]) || (apartmentPrice.value > window.constants.ValidationConsts.MAX_PRICE);
    if (priceValidity) {
      var priceWarningText = 'Цена за ночь на выбранный тип жилья находится в интервале от ' + window.constants.ValidationConsts.MIN_PRICE[apartmentType.value] + ' до ' + window.constants.ValidationConsts.MAX_PRICE;
      apartmentPrice.setCustomValidity(priceWarningText);
    } else {
      apartmentPrice.setCustomValidity('');
    }
    return priceValidity;
  };

  var setCapacitiValidity = function () {
    var roomsQuantity = rooms.value;
    var visitorsQuantity = visitors.value;
    var validityCondition = (roomsQuantity < visitorsQuantity) || ((roomsQuantity === window.constants.ValidationConsts.ROOMS_EXCEPTION) !== (visitorsQuantity === window.constants.ValidationConsts.VISITOR_EXCEPTION));
    if (validityCondition) {
      visitors.setCustomValidity(window.constants.CAPACITY_TITLE_VALIDITY_TEXT);
    } else {
      visitors.setCustomValidity('');
    }
    return validityCondition;
  };

  var onSubmitBtnClick = function () {
    return (!setTitleValidity()) && (!setPriceValidity() && (!setCapacitiValidity()));
  };

  var onCheckInChange = function (evt) {
    checkOut.value = evt.currentTarget.value;
  };

  var onCheckOutChange = function (evt) {
    checkIn.value = evt.currentTarget.value;
  };

  var onResetBtnClick = function () {
    window.map.initMap();
    resetBtn.removeEventListener('click', onResetBtnClick);
  };

  var onAvatarInputChange = function () {
    window.preview.createImgPreview(avatarInput, titlePreview);
  };
  var onImagesInputChange = function () {
    window.preview.createMultiplePreviews(photosInput, photosContainer);
  };

  var unlockForm = function () {
    form.classList.remove('ad-form--disabled');
    window.service.itemsSetDisable(fieldsets, false);
    onTypeChange();
    apartmentType.addEventListener('change', onTypeChange);
    checkIn.addEventListener('change', onCheckInChange);
    checkOut.addEventListener('change', onCheckOutChange);
    submitBtn.addEventListener('click', onSubmitBtnClick);
    resetBtn.addEventListener('click', onResetBtnClick);
    avatarInput.addEventListener('change', onAvatarInputChange);
    photosInput.addEventListener('change', onImagesInputChange);
  };

  var lockForm = function () {
    form.classList.add('ad-form--disabled');
    form.reset();
    window.service.itemsSetDisable(fieldsets, true);
    onTypeChange();
    apartmentType.removeEventListener('change', onTypeChange);
    checkIn.removeEventListener('change', onCheckInChange);
    checkOut.removeEventListener('change', onCheckOutChange);
    submitBtn.removeEventListener('click', onSubmitBtnClick);
    resetBtn.removeEventListener('click', onResetBtnClick);
    avatarInput.removeEventListener('change', onAvatarInputChange);
    photosInput.removeEventListener('change', onImagesInputChange);
    var adPhotos = form.querySelectorAll('.ad-form__photo');
    adPhotos.forEach(function (element) {
      element.remove();
    });
    titlePreview.src = 'img/muffin-grey.svg';
  };

  var onUploadSuccess = function () {

    main.prepend(successMessage);

    window.map.initMap();

    var onSuccessMessageClick = function () {
      successMessage.remove();
      document.removeEventListener('mousedown', onSuccessMessageClick);
      document.removeEventListener('keydown', onSuccessMessageEscPress);
    };

    var onSuccessMessageEscPress = function (evt) {
      if (evt.keyCode === window.constants.KeyCodes.ESC_KEYCODE) {
        successMessage.remove();
        document.removeEventListener('mousedown', onSuccessMessageClick);
        document.removeEventListener('keydown', onSuccessMessageEscPress);
      }
    };

    document.addEventListener('mousedown', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  var onUploadError = function (message) {
    var errorEscBtn = errorMessage.querySelector('.error__button');
    var errorText = errorMessage.querySelector('.error__message');

    errorText.textContent = message;

    main.prepend(errorMessage);

    var onErrorMessageCloseBtnClick = function () {
      errorMessage.remove();
      document.removeEventListener('keydown', onErrorMessagEscPress);
    };

    var onErrorMessagEscPress = function (evt) {
      if (evt.keyCode === window.constants.KeyCodes.ESC_KEYCODE) {
        errorMessage.remove();
        document.removeEventListener('keydown', onErrorMessagEscPress);
      }
    };

    errorEscBtn.addEventListener('mousedown', onErrorMessageCloseBtnClick);
    document.addEventListener('keydown', onErrorMessagEscPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.upload(new FormData(form), onUploadSuccess, onUploadError);
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
