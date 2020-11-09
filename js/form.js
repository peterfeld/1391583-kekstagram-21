'use strict';

(function () {

  const pageBody = document.querySelector(`body`);
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadOverlayImg = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = uploadOverlayImg.querySelector(`#upload-cancel`);
  const effectForm = document.querySelector(`.img-upload__form`);
  const imgUploadScale = uploadOverlayImg.querySelector(`.img-upload__scale`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const hashtagsInput = document.querySelector(`.text__hashtags`);
  const descriptionInput = document.querySelector(`.text__description`);

  const onModalEscPress = function (evt) {
    if (evt.key === `Escape`) {
      if (hashtagsInput === document.activeElement || descriptionInput === document.activeElement) {
        return;
      }
      evt.preventDefault();
      closeModal();
      uploadFile.value = ``;

    }
  };

  const openModal = function () {
    uploadOverlayImg.classList.remove(`hidden`);
    pageBody.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onModalEscPress);
    scaleControlValue.value = `100%`;
  };

  const closeModal = function () {
    uploadOverlayImg.classList.add(`hidden`);
    pageBody.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, onModalEscPress);
    uploadFile.value = ``;
  };

  const getSuccess = function () {
    hashtagsInput.value = ``;

    closeModal();

    document.querySelector(`main`).insertAdjacentHTML(`afterbegin`, `<section class="success">
      <div class="success__inner">
        <h2 class="success__title">Изображение успешно загружено</h2>
        <button type="button" class="success__button">Круто!</button>
      </div>
    </section>`);
    const successTemplate = document.querySelector(`.success`);
    const successButton = document.querySelector(`.success__button`);

    successButton.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      successTemplate.parentNode.removeChild(successTemplate);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.target === `Escape`) {
        successTemplate.parentNode.removeChild(successTemplate);
        evt.preventDefault();
      }
    });
    document.addEventListener(`click`, function () {
      successTemplate.parentNode.removeChild(successTemplate);
    });
  };

  const getError = function () {
    document.querySelector(`main`).insertAdjacentHTML(`afterbegin`, `<section class="error">
    <div class="error__inner">
      <h2 class="error__title">Ошибка загрузки файла</h2>
      <button type="button" class="error__button">Загрузить другой файл</button>
    </div>
  </section>`);
    const errorTemplate = document.querySelector(`.error`);
    const errorButton = errorTemplate.querySelector(`.error__button`);

    document.main.insertAdjacentElement(`afterbegin`, errorTemplate);
    errorButton.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      errorTemplate.parentNode.removeChild(errorTemplate);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.target === `Escape`) {
        errorTemplate.parentNode.removeChild(errorTemplate);
        evt.preventDefault();
      }
    });
    document.addEventListener(`click`, function () {
      errorTemplate.parentNode.removeChild(errorTemplate);
    });
  };

  uploadFile.addEventListener(`change`, function () {
    openModal();
    imgUploadScale.addEventListener(`click`, function (evt) {
      window.imgeditor.changeZoom(evt);
    });
    hashtagsInput.addEventListener(`input`, function () {
      window.validation.hashtags();
    });
    descriptionInput.addEventListener(`input`, function () {
      window.validation.description();
    });
    effectForm.addEventListener(`change`, function (evt) {
      window.imgeditor.effectChangeHandler(evt);
    });
    effectForm.addEventListener(`submit`, function (evt) {
      window.backend.upload(new FormData(effectForm), getSuccess, getError);
      evt.preventDefault();
    });
    uploadCancel.addEventListener(`click`, function () {
      closeModal();
    });
  });

})();
