'use strict';

(function () {
  var itemDragNDrop = function (item, area) {
    item.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.form.setFormAdress(item.offsetLeft + (window.constants.userPinParams.WIDTH / 2), item.offsetTop + window.constants.userPinParams.HEIGHT);

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

        if (moveEvt.clientX - startCoords.x < 0) {
          shift.x = 0;
        } else if (moveEvt.clientX - startCoords.x + item.offsetWidth > area.clientWidth) {
          shift.x = area.clientWidth - item.offsetWidth;
        } else {
          shift.x = moveEvt.clientX - startCoords.x;
        }

        if (moveEvt.clientY - startCoords.y < window.constants.userPinParams.MIN_Y - window.constants.userPinParams.HEIGHT) {
          shift.y = window.constants.userPinParams.MIN_Y - window.constants.userPinParams.HEIGHT;
        } else if (moveEvt.clientY - startCoords.y + window.constants.userPinParams.HEIGHT > window.constants.userPinParams.MAX_Y) {
          shift.y = window.constants.userPinParams.MAX_Y - window.constants.userPinParams.HEIGHT;
        } else {
          shift.y = moveEvt.clientY - startCoords.y;
        }

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
