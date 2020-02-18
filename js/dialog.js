'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var wasPopupOpenedEarlier = false;

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
    if (!wasPopupOpenedEarlier) {
      window.backend.load(window.similar.wizardsLoadSuccessHandler, errorHandler);
      wasPopupOpenedEarlier = true;
    }
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

  var wizardFormSuccessHandler = function () {
    closePopup();
  };

  var createErrorElement = function (message) {
    var element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.left = 0;
    element.style.right = 0;
    element.style.top = 0;
    element.style.zIndex = 1000;
    element.style.backgroundColor = 'red';
    element.style.color = 'white';
    element.style.textAlign = 'center';
    element.innerText = message;
    return element;
  };

  var removeErrorElement = function (element) {
    element.remove();
  };

  var errorHandler = function (message) {
    var element = createErrorElement(message);
    document.body.appendChild(element);
    setTimeout(removeErrorElement, 5000, element);
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

  var setupWizardForm = userDialog.querySelector('.setup-wizard-form');
  setupWizardForm.addEventListener('submit', function (evt) {
    var sendButton = setupWizardForm.querySelector('.setup-submit');
    sendButton.disabled = true;
    window.backend.save(new FormData(setupWizardForm), function () {
      sendButton.disabled = false;
      wizardFormSuccessHandler();
    }, function (response) {
      sendButton.disabled = false;
      errorHandler(response);
    });
    evt.preventDefault();
  });

  userNameInput.addEventListener('focus', removeEscPress);

  userNameInput.addEventListener('blur', addEscPress);
})();
