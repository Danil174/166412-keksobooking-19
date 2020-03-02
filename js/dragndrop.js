'use strict';

(function () {
  // var map = document.querySelector('.map__pins');
  // var pin = document.querySelector('.map__pin--main');
  var itemDragNDrop = function (item, area) {
    item.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.form.setFormAdress(item.offsetLeft + (window.constants.userPinParams.WIDTH / 2), item.offsetTop + window.constants.userPinParams.HEIGHT);

      var dragged = false;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var bottomEdge = window.constants.userPinParams.MAX_Y - window.constants.userPinParams.HEIGHT;
        var topEdge = window.constants.userPinParams.MIN_Y - window.constants.userPinParams.HEIGHT;
        var rightEdge = area.offsetWidth - window.constants.userPinParams.WIDTH;
        var newTop = item.offsetTop - shift.y;
        var newLeft = item.offsetLeft - shift.x;

        if (newTop < topEdge) {
          newTop = topEdge;
        } else if (newTop > bottomEdge) {
          newTop = bottomEdge;
        }

        if (newLeft < 0) {
          newLeft = 0;
        } else if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        item.style.top = newTop + 'px';
        item.style.left = newLeft + 'px';
        window.form.setFormAdress(newLeft + (window.constants.userPinParams.WIDTH / 2), newTop + window.constants.userPinParams.HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            item.removeEventListener('click', onClickPreventDefault);
          };
          item.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.dragndrop = {
    itemDragNDrop: itemDragNDrop
  };
})();
