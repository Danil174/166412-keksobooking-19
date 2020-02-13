// 'use strict';

// (function () {
//   var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
//   var cardPattern = cardTemplate.querySelector('.map__card');
//   var filters = window.main.map.querySelector('.map__filters-container');

//   var newCard = cardPattern.cloneNode(true);

//   var removeCard = function () {
//     newCard.remove();
//   };

//   var cardCloseBtnHandler = function () {
//     removeCard();
//   };

//   var cardCloseEscPressHandler = function (evt) {
//     if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
//       removeCard();
//       document.removeEventListener('keydown', cardCloseEscPressHandler);
//     }
//   };

//   var renderFeatures = function (arr) {
//     var featuresFragment = document.createDocumentFragment();

//     for (var i = 0; i < arr.length; i++) {
//       var temp = document.createElement('li');
//       temp.classList.add('popup__feature', 'popup__feature--' + arr[i]);
//       featuresFragment.appendChild(temp);
//     }

//     return featuresFragment;
//   };

//   var rendePhotos = function (arr) {
//     var photosFragment = document.createDocumentFragment();

//     for (var i = 0; i < arr.length; i++) {
//       var temp = document.createElement('img');
//       temp.style.width = '45px';
//       temp.style.height = '40px';
//       temp.classList.add('popup__photo');
//       temp.src = arr[i];
//       photosFragment.appendChild(temp);
//     }

//     return photosFragment;
//   };

//   var renderCard = function (card) {
//     newCard.querySelector('.popup__title').textContent = card.offer.title;
//     newCard.querySelector('.popup__text--address').textContent = card.offer.address;
//     newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь.';
//     newCard.querySelector('.popup__type').textContent = window.constants.APARTMENT_TRANSLATION[card.offer.type];
//     newCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
//     newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до' + card.offer.checkout;
//     newCard.querySelector('.popup__features').innerHTML = '';
//     newCard.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));
//     newCard.querySelector('.popup__description').textContent = card.offer.description;
//     newCard.querySelector('.popup__photos').innerHTML = '';
//     newCard.querySelector('.popup__photos').appendChild(rendePhotos(card.offer.photos));
//     newCard.querySelector('.popup__avatar').src = card.author.avatar;

//     var closeBtn = newCard.querySelector('.popup__close');

//     closeBtn.addEventListener('mousedown', cardCloseEscPressHandler);
//     document.addEventListener('keydown', cardCloseBtnHandler);

//     window.main.map.insertBefore(newCard, filters);
//   };

//   window.card = {
//     renderCard: renderCard,
//     removeCard: removeCard
//   };
// })();
