'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;

  window.upload = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
