'use strict';

(function () {
  var pinTempalete = document.querySelector('#pin').content;
  var newMessageTemplate = pinTempalete.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var advArray;

  var renderPin = function (pin) {
    var newPin = newMessageTemplate.cloneNode(true);

    var pinOffsetX = pin.location.x - 25;
    var pinOffsetY = pin.location.y - 70;

    newPin.querySelector('img').alt = pin.offer.title;
    newPin.querySelector('img').src = pin.author.avatar;
    newPin.style.left = pinOffsetX + 'px';
    newPin.style.top = pinOffsetY + 'px';

    newPin.addEventListener('click', function () {
      onPinClick(pin);
    });
    newPin.addEventListener('keydown', function () {
      onPinKeydown(pin);
    });

    return newPin;
  };

  window.data.xhr.addEventListener('load', function () {
    advArray = window.data.xhr.response;

    for (var i = 0; i < advArray.length; i++) {
      fragment.appendChild(renderPin(advArray[i]));
    }
  });

  var onPinClick = function (pin) {
    window.card.renderCard(pin);
  };

  var onPinKeydown = function (evt, pin) {
    if (evt.keyCode === window.constants.keycodes.ENTER_KEYCODE) {
      window.card.renderCard(pin);
    }
  };

  window.pins = {
    fragment: fragment
  };
})();
