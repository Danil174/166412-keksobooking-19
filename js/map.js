'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapContainer = document.querySelector('.map__pins');

  var initMainPin = function () {
    mainPin.addEventListener('click', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnterKeydown);
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

  var mainPinLeftCord = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
  var mainPinTopCord = Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);

  initMainPin();

  window.map = {
    mainPinLeftCord: mainPinLeftCord,
    mainPinTopCord: mainPinTopCord
  };
})();
