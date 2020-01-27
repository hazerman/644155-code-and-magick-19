'use strict';

(function () {
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
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var wizardsListElement = userDialog.querySelector('.setup-similar-list');
  var wizardsItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getRandomValue = function (values) {
    var randomValue = Math.floor(Math.random() * values.length);
    return values[randomValue];
  };

  var getWizardName = function () {
    var name = getRandomValue(WIZARD_NAMES);
    var surname = getRandomValue(WIZARD_SURNAMES);
    // из задания: при желании имя и фамилию менять местами в случайном порядке
    return Math.round(Math.random()) ? name + ' ' + surname : surname + ' ' + name;
  };

  var wizards = [
    {
      name: getWizardName(),
      coatColor: getRandomValue(WIZARD_COAT_COLORS),
      eyesColor: getRandomValue(WIZARD_EYES_COLORS)
    },
    {
      name: getWizardName(),
      coatColor: getRandomValue(WIZARD_COAT_COLORS),
      eyesColor: getRandomValue(WIZARD_EYES_COLORS)
    },
    {
      name: getWizardName(),
      coatColor: getRandomValue(WIZARD_COAT_COLORS),
      eyesColor: getRandomValue(WIZARD_EYES_COLORS)
    },
    {
      name: getWizardName(),
      coatColor: getRandomValue(WIZARD_COAT_COLORS),
      eyesColor: getRandomValue(WIZARD_EYES_COLORS)
    }
  ];

  var renderWizard = function (wizard) {
    var wizardElement = wizardsItemTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  wizardsListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
