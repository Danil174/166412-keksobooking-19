'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filters = document.querySelector('.map__filters-container');

  var newCard = cardTemplate.cloneNode(true);

  var removeCard = function () {
    newCard.remove();
  };

  var onCardCloseBtnClick = function () {
    removeCard();
  };

  var onCardCloseEscPress = function (evt) {
    if (evt.keyCode === window.constants.KeyCodes.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener('keydown', onCardCloseEscPress);
    }
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

  var renderPhotos = function (arr) {
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var picture = document.createElement('img');
      picture.style.width = '45px';
      picture.style.height = '40px';
      picture.classList.add('popup__photo');
      picture.src = arr[i];
      photosFragment.appendChild(picture);
    }

    return photosFragment;
  };

  var renderCard = function (card) {
    newCard.querySelector('.popup__title').textContent = card.offer.title;
    newCard.querySelector('.popup__text--address').textContent = card.offer.address;
    newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь.';
    newCard.querySelector('.popup__type').textContent = window.constants.ApartmentTranslation[card.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до' + card.offer.checkout;
    newCard.querySelector('.popup__features').innerHTML = '';
    newCard.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));
    newCard.querySelector('.popup__description').textContent = card.offer.description;
    newCard.querySelector('.popup__photos').innerHTML = '';
    newCard.querySelector('.popup__photos').appendChild(renderPhotos(card.offer.photos));
    newCard.querySelector('.popup__avatar').src = card.author.avatar;

    var closeBtn = newCard.querySelector('.popup__close');

    closeBtn.addEventListener('mousedown', onCardCloseBtnClick);
    document.addEventListener('keydown', onCardCloseEscPress);

    map.insertBefore(newCard, filters);
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
