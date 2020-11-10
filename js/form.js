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

  const showMessage = function (status) {
    const message = document.querySelector(`#${status}`).content.cloneNode(true);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    document.querySelector(`main`).insertBefore(fragment, document.querySelector(`.img-filters`));

    const hideMessage = function () {
      document.querySelector(`main`).removeChild(document.querySelector(`section.${status}`));
      document.removeEventListener(`click`, onMessageClick);
      document.removeEventListener(`keydown`, onMessageEsc);
    };

    const onMessageEsc = function (evt) {
      if (evt.key === window.main.ESCAPE) {
        evt.preventDefault();
        hideMessage();
      }
    };

    const onMessageClick = function () {
      hideMessage();
    };

    document.querySelector(`.${status}__button`).addEventListener(`click`, onMessageClick);
    document.addEventListener(`click`, onMessageClick);
    document.addEventListener(`keydown`, onMessageEsc);
  };

  const getSuccess = function () {
    let status = `success`;
    hashtagsInput.value = ``;
    showMessage(status);
    closeModal();
  };

  const getError = function () {
    let status = `error`;
    hashtagsInput.value = ``;
    showMessage(status);
    closeModal();
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
