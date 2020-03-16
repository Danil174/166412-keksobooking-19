'use strict';

(function () {
  var itemsSetDisable = function (items, dasableFLag) {
    items.forEach(function (item) {
      item.disabled = dasableFLag;
    });
  };

  window.service = {
    itemsSetDisable: itemsSetDisable
  };
})();
