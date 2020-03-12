'use strict';

(function () {
  var checkNumberInInterval = function (number, lowerLimit, upperLimit) {
    if (number >= lowerLimit && number <= upperLimit) {
      return number;
    } else {
      if (number < lowerLimit) {
        return lowerLimit;
      } else {
        return upperLimit;
      }
    }
  };

  var Coords = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var itemDragNDrop = function (item, area) {
    item.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.form.setFormAdress(item.offsetLeft + (window.constants.userPinParams.WIDTH / 2), item.offsetTop + window.constants.userPinParams.HEIGHT);

      var startCoords = new Coords(evt.clientX - item.offsetLeft, evt.clientY - item.offsetTop);
      var shift = new Coords(0, 0);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var itemPositionX = moveEvt.clientX - startCoords.x;
        var itemPositionY = moveEvt.clientY - startCoords.y;
        var leftBorder = -window.constants.userPinParams.WIDTH / 2;
        var rightBorder = area.clientWidth - Math.round(window.constants.userPinParams.WIDTH / 2);
        var topBorder = window.constants.userPinParams.MIN_Y - window.constants.userPinParams.HEIGHT;
        var bottomBorder = window.constants.userPinParams.MAX_Y - window.constants.userPinParams.HEIGHT;

        shift.x = checkNumberInInterval(itemPositionX, leftBorder, rightBorder);
        shift.y = checkNumberInInterval(itemPositionY, topBorder, bottomBorder);

        item.style.top = shift.y + 'px';
        item.style.left = shift.x + 'px';
        window.form.setFormAdress(shift.x + (window.constants.userPinParams.WIDTH / 2), shift.y + window.constants.userPinParams.HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.dragndrop = {
    itemDragNDrop: itemDragNDrop
  };
})();
