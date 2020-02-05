'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var uploadWrapper = userDialog.querySelector('.upload');

  uploadWrapper.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
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
      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
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
