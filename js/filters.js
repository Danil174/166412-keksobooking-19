'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters');
  var typeFilter = filtersContainer.querySelector('#housing-type');

  var filterByType = function (ads) {
    var similarPins = ads.filter(function (ad) {
      return ad.offer.type === (typeFilter.value === 'any' ? ad.offer.type : typeFilter.value);
    });
    return similarPins;
  };

  window.filters = {
    filterByType: filterByType
  };
})();
