'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters');
  var typeFilter = filtersContainer.querySelector('#housing-type');
  var priceFilter = filtersContainer.querySelector('#housing-price');
  var roomsFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsFilter = filtersContainer.querySelector('#housing-guests');
  var features = filtersContainer.querySelectorAll('.map__checkbox');

  var filterByType = function (ads) {
    var similarPins = ads.filter(function (ad) {
      if (typeFilter.value === 'any') {
        return true;
      } else {
        return ad.offer.type === typeFilter.value;
      }
    });
    return similarPins;
  };

  var filterByPrice = function (ads) {
    var similarPins = ads.filter(function (ad) {
      switch (priceFilter.value) {
        case 'low':
          return ad.offer.price <= 10000;
        case 'middle':
          return ad.offer.price > 10000 && ad.offer.price < 50000;
        case 'high':
          return ad.offer.price >= 50000;
        default:
          return true;
      }
    });
    return similarPins;
  };

  var filterByRooms = function (ads) {
    var similarPins = ads.filter(function (ad) {
      if (roomsFilter.value === 'any') {
        return true;
      } else {
        return ad.offer.rooms === roomsFilter.value;
      }
    });
    return similarPins;
  };

  var filterByGuests = function (ads) {
    var similarPins = ads.filter(function (ad) {
      if (guestsFilter.value === 'any') {
        return true;
      } else {
        return ad.offer.guests === guestsFilter.value;
      }
    });
    return similarPins;
  };

  var compareFeatures = function (array, ads) {
    var similarData = ads;

    for (var i = 0; i < array.length; i++) {
      similarData = similarData.filter(function (data) {
        return data.offer.features.includes(array[i]);
      });
    }

    return similarData;
  };

  var filterByFeatures = function (ads) {
    var checkedFeature = [];

    features.forEach(function (feature) {
      if (feature.checked) {
        checkedFeature.push(feature.value);
      }
    });

    return compareFeatures(checkedFeature, ads);
  };

  var filterByAll = function (ads) {
    var filteredAds = ads;
    filteredAds = filterByType(filteredAds);
    filteredAds = filterByRooms(filteredAds);
    filteredAds = filterByGuests(filteredAds);
    filteredAds = filterByPrice(filteredAds);
    filteredAds = filterByPrice(filteredAds);
    filteredAds = filterByFeatures(filteredAds);
    return filteredAds;
  };

  window.filters = {
    filterByAll: filterByAll
  };
})();
