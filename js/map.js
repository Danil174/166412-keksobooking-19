'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var successHandler = function (data) {
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.pins.renderPin(data[i]));
    }
    mapContainer.appendChild(fragment);
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
