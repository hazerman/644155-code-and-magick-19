'use strict';

(function () {
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

  var wizard = {
    eyesChangeHandler: function () {},
    coatChangeHandler: function () {}
  };

  setupWizardCoat.addEventListener('click', function () {
    var newColor = window.colorize.changeColor(setupWizardCoat, wizardCoatColorInput, WIZARD_COAT_COLORS, true);
    wizard.coatChangeHandler(newColor);
  });

  setupWizardEyes.addEventListener('click', function () {
    var newColor = window.colorize.changeColor(setupWizardEyes, wizardEyesColorInput, WIZARD_EYES_COLORS, true);
    wizard.eyesChangeHandler(newColor);
  });

  setupFireball.addEventListener('click', function () {
    window.colorize.changeColor(setupFireball, fireballColorInput, FIREBALL_COLORS, false);
  });

  window.setup = {
    wizard: wizard
  };
})();
