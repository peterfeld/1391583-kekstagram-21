'use strict';

(function () {

  const URL_UPLOAD = `https://21.javascript.pages.academy/kekstagram`;
  const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
  const Code = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.backend = {
    upload: function (data, onSuccess, onError) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === Code.OK) {
          onSuccess(xhr.response);
          return;
        }
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      });

      xhr.open(`POST`, URL_UPLOAD);
      xhr.send(data);
    },
    load: function (onSuccess, onError) {
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

      xhr.open(`GET`, URL_LOAD);

      xhr.send();

    }
  };
})();
