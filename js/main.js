'use strict';

var APARTMENT = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECOUT_TIME = ['12:00', '13:00', '14:00'];
var APARTMENT_OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_URLS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map__pins');
var pinTempalete = document.querySelector('#pin').content;
var newMessageTemplate = pinTempalete.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content;
var cardPattern = cardTemplate.querySelector('.map__card');
var cards = document.createDocumentFragment();
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
        'type': getRandomArrayItem(APARTMENT),
        'rooms': getRandomMinMax(1, 4),
        'guests': getRandomMinMax(1, 8),
        'checkin': getRandomArrayItem(CHECKIN_TIME),
        'checkout': getRandomArrayItem(CHECOUT_TIME),
        'features': generateArray(APARTMENT_OPTIONS),
        'description': 'That\'s the best offer I\'ve had today',
        'photos': generateArray(PHOTO_URLS)
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

  return newPin;
};

var renderFeatures = function (arr) {
  var featuresFragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var temp = document.createElement('li');
    temp.classList.add('popup__feature', 'popup__feature--' + arr[i]);
    featuresFragment.appendChild(temp);
  }

  return featuresFragment;
};

var rendePhotos = function (arr) {
  var photosFragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var temp = document.createElement('img');
    temp.style.width = '45px';
    temp.style.height = '40px';
    temp.classList.add('popup__photo');
    temp.src = arr[i];
    photosFragment.appendChild(temp);
  }

  return photosFragment;
};

var matchWorlds = function (string) {
  switch (string) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
    default:
      return 'перевода нет';
  }
};

var renderCard = function (card) {
  var newCard = cardPattern.cloneNode(true);

  newCard.querySelector('.popup__title').textContent = card.offer.title;
  newCard.querySelector('.popup__text--address').textContent = card.offer.address;
  newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь.';
  newCard.querySelector('.popup__type').textContent = matchWorlds(card.offer.type);
  newCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до' + card.offer.checkout;
  newCard.querySelector('.popup__features').innerHTML = '';
  newCard.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));
  newCard.querySelector('.popup__description').textContent = card.offer.description;
  newCard.querySelector('.popup__photos').innerHTML = '';
  newCard.querySelector('.popup__photos').appendChild(rendePhotos(card.offer.photos));
  newCard.querySelector('.popup__avatar').src = card.author.avatar;

  return newCard;
};

advArray = createArray();

for (var i = 0; i < advArray.length; i++) {
  fragment.appendChild(renderPin(advArray[i]));
  cards.appendChild(renderCard(advArray[i]));
}

map.appendChild(fragment);
map.after(cards);
