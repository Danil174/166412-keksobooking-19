'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapContainer = document.querySelector('.map__pins');

  var initMainPin = function () {
    mainPin.addEventListener('click', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnterKeydown);
    window.dragndrop.itemDragNDrop(mainPin, map);
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    window.form.unlockForm();
    mapContainer.appendChild(window.pins.fragment);
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
    // window.form.disable();
  };

  initMap();

  window.form.setFormAdress(mainPin.offsetLeft + (mainPin.offsetWidth / 2), mainPin.offsetTop + (mainPin.offsetHeight / 2));

  initMainPin();
})();
