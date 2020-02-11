'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var uploadWrapper = userDialog.querySelector('.upload');


  uploadWrapper.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var AreaLimit = {
      X: {
        MIN: userDialog.offsetWidth / 2,
        MAX: userDialog.parentElement.clientWidth - userDialog.offsetWidth / 2
      },
      Y: {
        MIN: 0,
        MAX: document.documentElement.clientHeight - 100
      }
    };
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };
    var isDragged = false;
    var uploadWrapperMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;
      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };
      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newStyleLeft = (userDialog.offsetLeft - shift.x);
      var newStyleTop = (userDialog.offsetTop - shift.y);

      var getPositionStyle = function (axis, newStylePosition) {
        var position;
        if (newStylePosition < (AreaLimit[axis].MIN)) {
          position = (AreaLimit[axis].MIN) + 'px';
          document.removeEventListener('mousemove', uploadWrapperMouseMoveHandler);
        } else if (newStylePosition > (AreaLimit[axis].MAX)) {
          position = (AreaLimit[axis].MAX) + 'px';
          document.removeEventListener('mousemove', uploadWrapperMouseMoveHandler);
        } else {
          position = newStylePosition + 'px';
        }
        return position;
      };

      userDialog.style.left = getPositionStyle('X', newStyleLeft);
      userDialog.style.top = getPositionStyle('Y', newStyleTop);
    };

    var uploadWrapperMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', uploadWrapperMouseMoveHandler);
      document.removeEventListener('mouseup', uploadWrapperMouseUpHandler);

      if (isDragged) {
        var uploadWrapperClickHandler = function (clickEvt) {
          clickEvt.preventDefault();
          uploadWrapper.removeEventListener('click', uploadWrapperClickHandler);
        };

        uploadWrapper.addEventListener('click', uploadWrapperClickHandler);
      }
    };

    document.addEventListener('mousemove', uploadWrapperMouseMoveHandler);
    document.addEventListener('mouseup', uploadWrapperMouseUpHandler);
  });
})();
