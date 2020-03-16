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
    MAX_Y: 630,
    LEFT: '570px',
    TOP: '375px'
  };

  var NUMBER_OF_ADS = 5;

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

  var DEBOUNCE_INTERVAL = 500;

  var serverParams = {
    LOAD_URL: 'https://js.dump.academy/keksobooking/data',
    UPLOAD_URL: 'https://js.dump.academy/keksobooking',
    SUCCESS_STATUS_CODE: 200,
    TIMEOUT: 1000
  };

  window.constants = {
    serverParams: serverParams,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    NUMBER_OF_ADS: NUMBER_OF_ADS,
    validationConsts: validationConsts,
    keycodes: keycodes,
    APARTMENT_TRANSLATION: APARTMENT_TRANSLATION,
    userPinParams: userPinParams
  };
})();
