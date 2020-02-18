'use strict';

(function () {
  var changeColor = function (item, input, array, isSvg) {
    var color;
    do {
      color = window.getRandomValue(array);
    } while (color === input.value); // чтобы после клика цвет не зарандомился таким же, каким был до клика
    if (isSvg) {
      item.style.fill = color;
    } else {
      item.style.backgroundColor = color;
    }
    input.value = color;
    return color;
  };

  window.colorize = {
    changeColor: changeColor
  };
})();
