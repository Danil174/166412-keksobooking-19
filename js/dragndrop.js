'use strict';

(function () {
  var map = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin--main');

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var bottomEdge = map.offsetHeight - pin.offsetHeight;
      var newTop = pin.offsetTop - shift.y;

      if (newTop < 0) {
        newTop = 0;
      }

      if (newTop > bottomEdge) {
        newTop = bottomEdge;
      }

      var rightEdge = map.offsetWidth - pin.offsetWidth;
      var newLeft = pin.offsetLeft - shift.x;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      pin.style.top = newTop + 'px';
      pin.style.left = newLeft + 'px';
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
