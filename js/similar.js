'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var wizardCoatColorInput = userDialog.querySelector('input[name="coat-color"]');
  var wizardEyesColorInput = userDialog.querySelector('input[name="eyes-color');
  var wizards = [];
  var coatColor = wizardCoatColorInput.value;
  var eyesColor = wizardEyesColorInput.value;

  var getWizardRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var rankedWizards = wizards.sort(function (left, right) {
      var rankDiff = getWizardRank(right) - getWizardRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    window.render.showWizards(rankedWizards);
  };

  var wizardsLoadSuccessHandler = function (wizardObjects) {
    wizards = wizardObjects;
    updateWizards();
  };

  window.setup.wizard.coatChangeHandler = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.setup.wizard.eyesChangeHandler = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.similar = {
    wizardsLoadSuccessHandler: wizardsLoadSuccessHandler,
  };
})();
