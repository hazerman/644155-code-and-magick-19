'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 30000;

  var load = function (loadHandler, errorHandler) {
    var method = 'GET';
    var url = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        loadHandler(xhr.response);
      } else {
        errorHandler('Извините, похожие волшебники не смогли загрузиться. Статус ответа: ' + xhr.status + '. Загуглите статус ошибки');
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Извините, похожие волшебники не смогли загрузиться. Проверьте подключение к Интернету');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Извините, похожие волшебники не смогли загрузиться за ' + xhr.timeout + 'мс, попробуйте позже');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send();
  };

  var save = function (data, loadHandler, errorHandler) {
    var method = 'POST';
    var url = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        loadHandler();
      } else {
        errorHandler('Статус ответа: ' + xhr.status + '. Загуглите статус ошибки');
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения. Проверьте подключение к Интернету');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Не удалось отправить за ' + xhr.timeout + 'мс, попробуйте позже');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
