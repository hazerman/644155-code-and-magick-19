'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 4;
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
  var setupWizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = userDialog.querySelector('.setup-fireball-wrap');
  var wizardCoatColorInput = userDialog.querySelector('input[name="coat-color"]');
  var wizardEyesColorInput = userDialog.querySelector('input[name="eyes-color');
  var fireballColorInput = userDialog.querySelector('input[name="fireball-color"]');
  var wizardsListElement = userDialog.querySelector('.setup-similar-list');
  var wizardsItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = wizardsItemTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var wizardsLoadSuccessHandler = function (wizardObjects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(wizardObjects[i]));
    }
    wizardsListElement.appendChild(fragment);
    var similarContainer = userDialog.querySelector('.setup-similar');
    similarContainer.classList.remove('hidden');
  };

  window.colorize(setupWizardCoat, wizardCoatColorInput, WIZARD_COAT_COLORS, true);
  window.colorize(setupWizardEyes, wizardEyesColorInput, WIZARD_EYES_COLORS, true);
  window.colorize(setupFireball, fireballColorInput, FIREBALL_COLORS, false);

  window.setup = {
    wizardsLoadSuccessHandler: wizardsLoadSuccessHandler
  };
})();
