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
      return ad.offer.type === (typeFilter.value === 'any' ? ad.offer.type : typeFilter.value);
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
      return ad.offer.rooms + '' === (roomsFilter.value === 'any' ? ad.offer.rooms + '' : roomsFilter.value);
    });
    return similarPins;
  };

  var filterByGuests = function (ads) {
    var similarPins = ads.filter(function (ad) {
      return ad.offer.guests + '' === (guestsFilter.value === 'any' ? ad.offer.guests + '' : guestsFilter.value);
    });
    return similarPins;
  };

  var filterByFeature = function (ads, feature) {
    if (feature.checked) {
      var similarPins = ads.filter(function (ad) {
        var check = false;
        for (var i = 0; i < ad.offer.features.length; i++) {
          if (ad.offer.features[i] === feature.value) {
            check = true;
            break;
          }
        }
        return check;
      });
      return similarPins;
    } else {
      return ads;
    }
  };

  var checkFeatures = function (ads) {
    var filteredAds = ads;
    features.forEach(function (feature) {
      filteredAds = filterByFeature(ads, feature);
    });
    return filteredAds;
  };


  var filterByAll = function (ads) {
    var filteredAds = ads;
    filteredAds = filterByType(filteredAds);
    filteredAds = filterByRooms(filteredAds);
    filteredAds = filterByGuests(filteredAds);
    filteredAds = filterByPrice(filteredAds);
    filteredAds = filterByPrice(filteredAds);
    filteredAds = checkFeatures(filteredAds);
    return filteredAds;
  };

  window.filters = {
    filterByAll: filterByAll
  };
})();
