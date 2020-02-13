'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  // var addressInput = window.form.form.querySelector('#address');

  var initMainPin = function () {
    mainPin.addEventListener('click', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnterKeydown);
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    window.form.unlockForm();
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
