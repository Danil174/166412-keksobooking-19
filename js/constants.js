'use strict';

(function () {
  var keycodes = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27
  };

  var APARTMENT_TRANSLATION = {
    'palace': 'Дворец',
    'flat': 'Крвартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var userPinParams = {
    WIDTH: 62,
    HEIGHT: 82,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var mockData = {
    APARTMENT: ['palace', 'flat', 'house', 'bungalo'],
    CHECKIN_TIME: ['12:00', '13:00', '14:00'],
    CHECOUT_TIME: ['12:00', '13:00', '14:00'],
    APARTMENT_OPTIONS: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTO_URLS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  var PIN_MARGIN_TOP = 48;

  var validationConsts = {
    MIN_TITLE_LENGTH: 30,
    MAX_TITLE_LENGTH: 100,
    MAX_PRICE: 1000000,
    MIN_PRICE: {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    },
    ROOMS_EXCEPTOPN: '100',
    VISITOR_EXCEPTOPN: '0',
  };

  window.constants = {
    PIN_MARGIN_TOP: PIN_MARGIN_TOP,
    validationConsts: validationConsts,
    keycodes: keycodes,
    mockData: mockData,
    APARTMENT_TRANSLATION: APARTMENT_TRANSLATION,
    userPinParams: userPinParams
  };
})();
