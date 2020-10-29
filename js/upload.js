'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram`;
  const Code = {
    OK: 200
  };

  window.upload = function (data, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === Code.OK) {
        onSuccess(xhr.response);
        return;
      }
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
