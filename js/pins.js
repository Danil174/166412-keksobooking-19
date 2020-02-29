'use strict';

(function () {
  var pinTempalete = document.querySelector('#pin').content;
  var newMessageTemplate = pinTempalete.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var advArray;

  var getRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayItem = function (arr) {
    var item = arr[getRandomMinMax(0, arr.length - 1)];
    return item;
  };

  var generateArray = function (arr) {
    var randomArr = arr.slice();
    randomArr = shuffle(randomArr);
    randomArr.splice(getRandomMinMax(0, randomArr.length - 2), getRandomMinMax(0, 1));
    return randomArr;
  };

  var shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  var createArray = function () {
    var arr = [];

    for (var i = 0; i < 8; i++) {
      var locationX = getRandomMinMax(0, 1200);
      var locationY = getRandomMinMax(130, 630);

      arr[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': 'best offer',
          'address': locationX + ', ' + locationY,
          'price': getRandomMinMax(1000, 4000),
          'type': getRandomArrayItem(window.constants.mockData.APARTMENT),
          'rooms': getRandomMinMax(1, 4),
          'guests': getRandomMinMax(1, 8),
          'checkin': getRandomArrayItem(window.constants.mockData.CHECKIN_TIME),
          'checkout': getRandomArrayItem(window.constants.mockData.CHECOUT_TIME),
          'features': generateArray(window.constants.mockData.APARTMENT_OPTIONS),
          'description': 'That\'s the best offer I\'ve had today',
          'photos': generateArray(window.constants.mockData.PHOTO_URLS)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      };
    }

    return arr;
  };

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

  advArray = createArray();

  for (var i = 0; i < advArray.length; i++) {
    fragment.appendChild(renderPin(advArray[i]));
  }

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
