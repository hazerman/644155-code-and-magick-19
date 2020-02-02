'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];
  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var WIZARD_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var WIZARD_EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var setupWizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = userDialog.querySelector('.setup-fireball-wrap');
  var wizardCoatColorInput = userDialog.querySelector('input[name="coat-color"]');
  var wizardEyesColorInput = userDialog.querySelector('input[name="eyes-color');
  var fireballColorInput = userDialog.querySelector('input[name="fireball-color"]');
  var wizardsListElement = userDialog.querySelector('.setup-similar-list');
  var wizardsItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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
    removeEscPress();
  };

  var getRandomValue = function (values) {
    var randomValue = Math.floor(Math.random() * values.length);
    return values[randomValue];
  };

  var changeColor = function (item, input, array, isSvg) {
    var color;
    do {
      color = getRandomValue(array);
    } while (color === input.value); // чтобы после клика цвет не зарандомился таким же, каким был до клика
    if (isSvg) {
      item.style.fill = color;
    } else {
      item.style.backgroundColor = color;
    }
    input.value = color;
  };

  var getWizardName = function () {
    var name = getRandomValue(WIZARD_NAMES);
    var surname = getRandomValue(WIZARD_SURNAMES);
    // из задания: при желании имя и фамилию менять местами в случайном порядке
    return Math.round(Math.random()) ? name + ' ' + surname : surname + ' ' + name;
  };

  var wizards = [];
  for (var wizardCounter = 0; wizardCounter < 4; wizardCounter++) {
    var wizardTemplate = {
      name: getWizardName(),
      coatColor: getRandomValue(WIZARD_COAT_COLORS),
      eyesColor: getRandomValue(WIZARD_EYES_COLORS)
    };
    wizards.push(wizardTemplate);
  }

  var renderWizard = function (wizard) {
    var wizardElement = wizardsItemTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
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

  setupWizardCoat.addEventListener('click', function () {
    changeColor(setupWizardCoat, wizardCoatColorInput, WIZARD_COAT_COLORS, true);
  });

  setupWizardEyes.addEventListener('click', function () {
    changeColor(setupWizardEyes, wizardEyesColorInput, WIZARD_EYES_COLORS, true);
  });

  setupFireball.addEventListener('click', function () {
    changeColor(setupFireball, fireballColorInput, FIREBALL_COLORS, false);
  });

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  wizardsListElement.appendChild(fragment);
  var similarContainer = userDialog.querySelector('.setup-similar');
  similarContainer.classList.remove('hidden');
})();
