'use strict';

(function () {
  var MAX_WIZARDS = 4;
  var wizardsItemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var userDialog = document.querySelector('.setup');
  var wizardsListElement = userDialog.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = wizardsItemTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var showWizards = function (data) {
    var wizardsAmount = data.length > MAX_WIZARDS ? MAX_WIZARDS : data.length;
    wizardsListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsAmount; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    wizardsListElement.appendChild(fragment);
    var similarContainer = userDialog.querySelector('.setup-similar');
    similarContainer.classList.remove('hidden');
  };

  window.render = {
    showWizards: showWizards
  };
})();
