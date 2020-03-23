'use strict';

(function () {
  var KeyCodes = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27
  };

  var ApartmentTranslation = {
    'palace': 'Дворец',
    'flat': 'Крвартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var UserPinParams = {
    WIDTH: 62,
    HEIGHT: 82,
    MIN_Y: 130,
    MAX_Y: 630,
    LEFT: '570px',
    TOP: '375px'
  };

  var NUMBER_OF_ADS = 5;

  var ValidationConsts = {
    MIN_TITLE_LENGTH: 30,
    MAX_TITLE_LENGTH: 100,
    MAX_PRICE: 1000000,
    MIN_PRICE: {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    },
    ROOMS_EXCEPTION: '100',
    VISITOR_EXCEPTION: '0',
  };

  var AD_TITLE_VALIDITY_TEXT = 'Длина заголовка должна быть от 30 до 100 символов';

  var CAPACITY_TITLE_VALIDITY_TEXT = 'Число гостей не соотвествует числу комнат';

  var PriceFilterValues = {
    MIN_PRICE: 10000,
    MAX_PRICE: 50000
  };

  var FILTER_DEFAULT_VALUE = 'any';

  var DEBOUNCE_INTERVAL = 500;

  var ServerParams = {
    LOAD_URL: 'https://js.dump.academy/keksobooking/data',
    UPLOAD_URL: 'https://js.dump.academy/keksobooking',
    SUCCESS_STATUS_CODE: 200,
    TIMEOUT: 1000
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.constants = {
    PriceFilterValues: PriceFilterValues,
    FILTER_DEFAULT_VALUE: FILTER_DEFAULT_VALUE,
    FILE_TYPES: FILE_TYPES,
    ServerParams: ServerParams,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    NUMBER_OF_ADS: NUMBER_OF_ADS,
    ValidationConsts: ValidationConsts,
    AD_TITLE_VALIDITY_TEXT: AD_TITLE_VALIDITY_TEXT,
    CAPACITY_TITLE_VALIDITY_TEXT: CAPACITY_TITLE_VALIDITY_TEXT,
    KeyCodes: KeyCodes,
    ApartmentTranslation: ApartmentTranslation,
    UserPinParams: UserPinParams
  };
})();
