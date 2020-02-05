'use strict';

(function () {
  window.getRandomValue = function (values) {
    var randomValue = Math.floor(Math.random() * values.length);
    return values[randomValue];
  };
})();
