'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters');
  var selects = filtersContainer.querySelectorAll('select');
  var typeFilter = filtersContainer.querySelector('#housing-type');
  var priceFilter = filtersContainer.querySelector('#housing-price');
  var roomsFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsFilter = filtersContainer.querySelector('#housing-guests');
  var features = filtersContainer.querySelectorAll('.map__checkbox');

  var filterByType = function (ads) {
    var similarPins = ads.filter(function (ad) {
      return ad.offer.type === (typeFilter.value === window.constants.FILTER_DEFAULT_VALUE ? ad.offer.type : typeFilter.value);
    });
    return similarPins;
  };

  var filterByPrice = function (ads) {
    var similarPins = ads.filter(function (ad) {
      switch (priceFilter.value) {
        case 'low':
          return ad.offer.price <= window.constants.PriceFilterValues.MIN_PRICE;
        case 'middle':
          return ad.offer.price > window.constants.PriceFilterValues.MIN_PRICE && ad.offer.price < window.constants.PriceFilterValues.MAX_PRICE;
        case 'high':
          return ad.offer.price >= window.constants.PriceFilterValues.MAX_PRICE;
        default:
          return true;
      }
    });
    return similarPins;
  };

  var filterByRooms = function (ads) {
    var similarPins = ads.filter(function (ad) {
      return ad.offer.rooms.toString() === (roomsFilter.value === window.constants.FILTER_DEFAULT_VALUE ? ad.offer.rooms.toString() : roomsFilter.value);
    });
    return similarPins;
  };

  var filterByGuests = function (ads) {
    var similarPins = ads.filter(function (ad) {
      return ad.offer.guests.toString() === (guestsFilter.value === window.constants.FILTER_DEFAULT_VALUE ? ad.offer.guests.toString() : guestsFilter.value);
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
    var checkedFeatures = [];

    features.forEach(function (feature) {
      if (feature.checked) {
        checkedFeatures.push(feature.value);
      }
    });

    return compareFeatures(checkedFeatures, ads);
  };

  var selectsToDefault = function () {
    selects.forEach(function (select) {
      select.selectedIndex = 0;
    });
  };

  var uncheckFeatures = function () {
    features.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var resetFilters = function () {
    selectsToDefault();
    uncheckFeatures();
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
    filterByAll: filterByAll,
    resetFilters: resetFilters
  };
})();
