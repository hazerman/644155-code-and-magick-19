'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_PADDING = 20;
  var FONT_SIZE = 16;
  var FONT_FAMILY = 'PT Mono';
  var GAP = 10; // отступ для тени облака
  var BAR_HEIGHT = 150;
  var BAR_ITEM_WIDTH = 40; // ширина ячейки
  var BAR_INDENT = 50; // отступ между ячейками

  var lineHeight = Math.round(FONT_SIZE * 1.25);

  var renderCloud = function (ctx, x, y, color, isStroke) {
    if (isStroke) {
      ctx.strokeStyle = 'black';
      ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
    }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var wrapText = function (ctx, text, maxWidth, marginLeft, marginTop, heightOfLine) {
    var newLines = text.split('\n');
    for (var i = 0; i < newLines.length; i++) {
      var words = newLines[i].split(' ');
      var line = '';

      for (var j = 0; j < words.length; j++) {
        var lineTester = line + words[j] + ' ';
        var widthTester = ctx.measureText(lineTester).width;

        if (widthTester > maxWidth) {
          ctx.fillText(line, marginLeft, marginTop);
          line = words[j] + ' ';
          marginTop += heightOfLine;
        } else {
          line = lineTester;
        }
      }

      ctx.fillText(line, marginLeft, marginTop);
      marginTop += heightOfLine;
    }
  };

  var findMaxValue = function (arr) {
    var maxValue = 0;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
      }
    }

    return maxValue;
  };

  var renderBar = function (ctx, names, times, barHeight, barMaxY, barMaxX, barX, barItemWidth, marginLeft, heightOfLine) {
    // проверка на разную длину массивов и применение станадртных значений
    if (names.length > times.length) {
      for (var i = times.length; i < names.length; i++) {
        times[i] = 1000; // пусть 1000 будет стандартным значением
      }
    } else if (times.length > names.length) {
      for (var j = names.length; j < times.length; j++) {
        names[j] = 'Игрок ' + (j + 1);
      }
    }

    var highestBar = findMaxValue(times);

    var nextBarX = 0; // переменная, в которую будет прибавляться позиция по X следующей колонки

    for (var k = 0; k < names.length; k++) {
      // проверка, чтобы колонки в гистограмме не вышли за границу самой гистограммы по X, если их будет слишком много, то типо overflow: hidden
      if (barX + nextBarX > barMaxX) {
        break;
      }

      var barItemHeight = Math.round((times[k] * barHeight) / highestBar);
      var barItemColor = '';
      var nameMarginTop = 5;

      ctx.fillStyle = 'black';
      ctx.fillText(names[k], barX + nextBarX, barMaxY + nameMarginTop);

      if (names[k] === 'Вы') {
        barItemColor = 'rgba(255, 0, 0, 1)';
      } else {
        barItemColor = 'hsl(240,' + Math.floor(Math.random() * 101) + '%,50%)';
      }

      ctx.fillStyle = barItemColor;
      ctx.fillRect(barX + nextBarX, barMaxY - barItemHeight, barItemWidth, barItemHeight);

      ctx.fillStyle = 'black';
      ctx.fillText(Math.round(times[k]), barX + nextBarX, barMaxY - barItemHeight - heightOfLine);

      nextBarX += barItemWidth + marginLeft; // для расчета позиции по X следующей колонки
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', true);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white', true);

    ctx.font = FONT_SIZE + 'px ' + FONT_FAMILY;
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'hanging';
    wrapText(ctx, 'Ура вы победили!\nСписок результатов:', CLOUD_WIDTH - 2 * CLOUD_PADDING, CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING, lineHeight);
    renderBar(ctx, names, times, BAR_HEIGHT, CLOUD_Y + CLOUD_HEIGHT - 1.7 * CLOUD_PADDING, CLOUD_X + CLOUD_WIDTH - 2 * CLOUD_PADDING, CLOUD_X + 2 * CLOUD_PADDING, BAR_ITEM_WIDTH, BAR_INDENT, lineHeight);
  };
})();


