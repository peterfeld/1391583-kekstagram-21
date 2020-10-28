'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const Code = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === Code.OK) {
        onSuccess(xhr.response);
        return;
      }
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);

    xhr.send();
  };
})();
