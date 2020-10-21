'use strict';

(function () {

  const pageBody = document.querySelector(`body`);
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadOverlayImg = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = uploadOverlayImg.querySelector(`#upload-cancel`);
  const effectLevelValue = uploadOverlayImg.querySelector(`.effect-level__value`);
  const effectLevelUpload = uploadOverlayImg.querySelector(`.img-upload__effect-level`);
  const effectChrome = uploadOverlayImg.querySelector(`#effect-chrome`);
  const effectSepia = uploadOverlayImg.querySelector(`#effect-sepia`);
  const effectMarvin = uploadOverlayImg.querySelector(`#effect-marvin`);
  const effectPhobos = uploadOverlayImg.querySelector(`#effect-phobos`);
  const effectHeat = uploadOverlayImg.querySelector(`#effect-heat`);
  const effectNone = uploadOverlayImg.querySelector(`#effect-none`);
  const imgPreview = uploadOverlayImg.querySelector(`.img-upload__preview`);
  const effectForm = document.querySelector(`.img-upload__form`);
  const effectChromeValue = `chrome`;
  const effectSepiaValue = `sepia`;
  const effectMarvinValue = `marvin`;
  const effectPhobosValue = `phobos`;
  const effectHeatValue = `heat`;
  let effectClass;
  const imgUploadScale = uploadOverlayImg.querySelector(`.img-upload__scale`);
  const scaleControlSmaller = imgUploadScale.querySelector(`.scale__control--smaller`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  let scaleValueDefault = 100;

  const hashtagsInput = document.querySelector(`.text__hashtags`);

  const onModalEscPress = function (evt) {
    if (evt.key === `Escape`) {
      if (hashtagsInput === document.activeElement) {
        return;
      } else {
        evt.preventDefault();
        closeModal();
        uploadFile.value = ``;
      }
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


  const changeZoom = function (evt) {
    let MIN_VALUE = 25;
    let MAX_VALUE = 100;
    let step = 25;
    if (evt.target === scaleControlSmaller) {
      if (scaleValueDefault === MIN_VALUE) {
        scaleValueDefault = MIN_VALUE;
      } else if (scaleValueDefault > MIN_VALUE) {
        scaleValueDefault = scaleValueDefault - step;
      }
    } else if (scaleValueDefault === MAX_VALUE) {
      scaleValueDefault = MAX_VALUE;
    } else {
      scaleValueDefault = scaleValueDefault + step;
    }
    scaleControlValue.value = `${scaleValueDefault}%`;
  };

  const effectChangeHandlet = function (evt) {

    const changeEffectClass = function () {

      imgPreview.classList.remove(effectClass);
      effectClass = `effects__preview--${evt.target.value}`;
      imgPreview.classList.add(effectClass);
      effectLevelUpload.classList.remove(`hidden`);
    };
    if (evt.target.value === effectChromeValue) {
      changeEffectClass();
      effectChrome.filter = `grayscale(${effectLevelValue.value / 100})`;
    } else if (evt.target.value === effectSepiaValue) {
      changeEffectClass();
      effectSepia.filter = `sepia(${effectLevelValue.value / 100})`;
    } else if (evt.target.value === effectMarvinValue) {
      changeEffectClass();
      effectMarvin.filter = `invert(${effectLevelValue.value})`;
    } else if (evt.target.value === effectPhobosValue) {
      changeEffectClass();
      effectPhobos.filter = `blur(${1 + 0.02 * effectLevelValue.value}px)`;
    } else if (evt.target.value === effectHeatValue) {
      changeEffectClass();
      effectHeat.filter = `brightness(${1 + 0.02 * effectLevelValue.value})`;
    } else {
      imgPreview.classList.remove(effectClass);
      effectNone.filter = ``;
      effectLevelValue.value = `100`;
      effectLevelUpload.classList.add(`hidden`);
    }
  };

  const inArr = function (value, index, self) {
    return (self.indexOf(value) !== index);
  };

  const verifyValidity = function () {
    let hashtags = hashtagsInput.value.toLowerCase().split(` `);
    let reHashtags = /^#[\w]*$/;
    let MAX_HASHTAG_LENGTH = 20;
    let MAX_HASHTAGS = 5;
    let searchDubl = hashtags.filter(inArr);
    let dublikateHashtagsLength = searchDubl.length;

    for (let i = 0; i < hashtags.length; i++) {
      if (!reHashtags.test(hashtags[i])) {
        hashtagsInput.setCustomValidity(`Хэштег должен начинаться с # и Хэштег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
      } else if (hashtags[i].split(``).length === 1) {
        hashtagsInput.setCustomValidity(`хеш-тег не может состоять только из одной решётки`);
      } else if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity(`Удалите лишние ${hashtags[i].length - MAX_HASHTAG_LENGTH} симв.`);
      } else if (hashtags.length > MAX_HASHTAGS) {
        hashtagsInput.setCustomValidity(`Удалите лишние ${hashtags.length - MAX_HASHTAGS} хеш-теги`);
      } else if (dublikateHashtagsLength !== 0) {
        hashtagsInput.setCustomValidity(`Удалите повторяющиееся хэш-теги`);
      } else {
        hashtagsInput.setCustomValidity(``);
      }
      hashtagsInput.reportValidity();
    }
  };

  uploadFile.addEventListener(`change`, function () {
    openModal();
    imgUploadScale.addEventListener(`click`, changeZoom);
    hashtagsInput.addEventListener(`input`, verifyValidity);
    effectForm.addEventListener(`change`, effectChangeHandlet);
    uploadCancel.addEventListener(`click`, function () {
      closeModal();
    });
  });

})();

