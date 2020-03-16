'use strict';

(function () {
  var newXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.timeout = window.constants.serverParams.TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.serverParams.SUCCESS_STATUS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = newXHR(onSuccess, onError);

    xhr.open('GET', window.constants.serverParams.LOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = newXHR(onSuccess, onError);

    xhr.open('POST', window.constants.serverParams.UPLOAD_URL);
    xhr.send(data);
  };

  window.data = {
    load: load,
    upload: upload
  };
})();
