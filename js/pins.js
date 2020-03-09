'use strict';

(function () {
  var pinTempalete = document.querySelector('#pin').content;
  var newMessageTemplate = pinTempalete.querySelector('.map__pin');

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


  var appendPins = function (ads, container) {
    var fragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
    });

    container.appendChild(fragment);
  };

  var onPinClick = function (pin) {
    window.card.renderCard(pin);
  };

  var onPinKeydown = function (evt, pin) {
    if (evt.keyCode === window.constants.keycodes.ENTER_KEYCODE) {
      window.card.renderCard(pin);
    }
  };

  window.pins = {
    appendPins: appendPins
  };
})();
