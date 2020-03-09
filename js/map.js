'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapContainer = document.querySelector('.map__pins');
  var typeFilter = document.querySelector('#housing-type');

  var removePins = function () {
    var adsPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    Array.from(adsPins).forEach(function (pin) {
      pin.remove();
    });
  };

  var onFiltersChange = function (ads) {
    removePins();
    window.card.removeCard();
    window.pins.appendPins(window.filters.filterByType(ads).slice(0, window.constants.NUMBER_OF_ADS), mapContainer);
  };

  var initFilter = function (ads) {
    typeFilter.addEventListener('change', function () {
      onFiltersChange(ads);
    });
  };

  var successHandler = function (data) {
    initFilter(data);
    removePins();
    window.pins.appendPins(data.slice(0, window.constants.NUMBER_OF_ADS), mapContainer);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var initMainPin = function () {
    mainPin.addEventListener('click', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnterKeydown);
    window.dragndrop.itemDragNDrop(mainPin, map);
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
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
    initMainPin();

    window.card.removeCard();
  };

  initMap();

  window.form.setFormAdress(mainPin.offsetLeft + (mainPin.offsetWidth / 2), mainPin.offsetTop + (mainPin.offsetHeight / 2));

  initMainPin();
})();
