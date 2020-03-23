'use strict';

(function () {
  var checkNumberInInterval = function (number, lowerLimit, upperLimit) {
    if (number >= lowerLimit && number <= upperLimit) {
      return number;
    } else {
      var limit = (number < lowerLimit) ? lowerLimit : upperLimit;
      return limit;
    }
  };

  var moveItemInArea = function (item, area) {
    item.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.form.setFormAdress(item.offsetLeft + (window.constants.UserPinParams.WIDTH / 2), item.offsetTop + window.constants.UserPinParams.HEIGHT);

      var startCoords = {
        x: evt.clientX - item.offsetLeft,
        y: evt.clientY - item.offsetTop
      };

      var shift = {
        x: 0,
        y: 0
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var itemPositionX = moveEvt.clientX - startCoords.x;
        var itemPositionY = moveEvt.clientY - startCoords.y;
        var leftBorder = -window.constants.UserPinParams.WIDTH / 2;
        var rightBorder = area.clientWidth - Math.round(window.constants.UserPinParams.WIDTH / 2);
        var topBorder = window.constants.UserPinParams.MIN_Y - window.constants.UserPinParams.HEIGHT;
        var bottomBorder = window.constants.UserPinParams.MAX_Y - window.constants.UserPinParams.HEIGHT;

        shift.x = checkNumberInInterval(itemPositionX, leftBorder, rightBorder);
        shift.y = checkNumberInInterval(itemPositionY, topBorder, bottomBorder);

        item.style.top = shift.y + 'px';
        item.style.left = shift.x + 'px';
        window.form.setFormAdress(shift.x + (window.constants.UserPinParams.WIDTH / 2), shift.y + window.constants.UserPinParams.HEIGHT);
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
    moveItemInArea: moveItemInArea
  };
})();
