'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  var popupEscPressHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  var removeEscPress = function () {
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var addEscPress = function () {
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    addEscPress();
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    if (userDialog.hasAttribute('style')) {
      userDialog.removeAttribute('style');
    }
    removeEscPress();
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });

  userNameInput.addEventListener('focus', removeEscPress);

  userNameInput.addEventListener('blur', addEscPress);
})();
