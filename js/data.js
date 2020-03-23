'use strict';

(function () {
  var initXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.timeout = window.constants.ServerParams.TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.ServerParams.SUCCESS_STATUS_CODE) {
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
    var xhr = initXHR(onSuccess, onError);

    xhr.open('GET', window.constants.ServerParams.LOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = initXHR(onSuccess, onError);

    xhr.open('POST', window.constants.ServerParams.UPLOAD_URL);
    xhr.send(data);
  };

  window.data = {
    load: load,
    upload: upload
  };
})();
