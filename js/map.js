'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapContainer = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters');
  var filters = filtersContainer.childNodes;

  var removePins = function () {
    var adsPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    adsPins.forEach(function (pin) {
      pin.remove();
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

  var onFiltersChange = debounce(function (ads) {
    removePins();
    window.card.removeCard();
    window.pins.appendPins(window.filters.filterByAll(ads).slice(0, window.constants.NUMBER_OF_ADS), mapContainer);
  });

  var initFilter = function (ads) {
    filtersContainer.addEventListener('change', function () {
      onFiltersChange(ads);
    });
  };

  var successHandler = function (data) {
    initFilter(data);
    removePins();
    window.pins.appendPins(data.slice(0, window.constants.NUMBER_OF_ADS), mapContainer);
  };

  var errorHandler = function (errorMessage) {
    var error = document.createElement('div');
    error.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    error.style.position = 'absolute';
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = '20px';

    error.textContent = 'Данные не загружены, обратитесь в службу поддержки. ' + errorMessage;
    document.body.prepend(error);
  };

  var initMainPin = function () {
    mainPin.addEventListener('click', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnterKeydown);
    window.dragndrop.itemDragNDrop(mainPin, map);
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    window.service.itemsSetDisable(filters, false);
    window.form.unlockForm();
    window.data.load(successHandler, errorHandler);
  };

  var onMainPinClick = function () {
    enableMap();
    mainPin.removeEventListener('click', onMainPinClick);
  };

  var onMainPinEnterKeydown = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.constants.keycodes.ENTER_KEYCODE) {
      enableMap();
      mainPin.removeEventListener('keydown', onMainPinEnterKeydown);
    }
  };

  var initMap = function () {
    map.classList.add('map--faded');
    mainPin.style.left = window.constants.userPinParams.LEFT;
    mainPin.style.top = window.constants.userPinParams.TOP;
    removePins();
    window.card.removeCard();
    window.filters.resetFilters();
    window.service.itemsSetDisable(filters, true);
    window.form.lockForm();
    initMainPin();
    window.form.setFormAdress(mainPin.offsetLeft + (mainPin.offsetWidth / 2), mainPin.offsetTop + (mainPin.offsetHeight / 2));
  };

  initMap();

  window.map = {
    initMap: initMap
  };
})();
