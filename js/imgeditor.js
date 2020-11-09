'use strict';

(function () {
  const uploadOverlayImg = document.querySelector(`.img-upload__overlay`);
  const effectLevelValue = uploadOverlayImg.querySelector(`.effect-level__value`);
  const effectLevelUpload = uploadOverlayImg.querySelector(`.img-upload__effect-level`);
  const imgPreview = uploadOverlayImg.querySelector(`.img-upload__preview img`);

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
  const effectLevelPin = uploadOverlayImg.querySelector(`.effect-level__pin`);
  const effectLevelDepth = uploadOverlayImg.querySelector(`.effect-level__depth`);

  let resetEffect = function () {
    imgPreview.style = ``;
    effectLevelPin.style.left = `453px`;
    effectLevelDepth.style.width = `100%`;
  };

  let mouseDownFoo = function (evt) {
    evt.preventDefault();


    let startCoords = {
      x: evt.clientX
    };

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      const MIN_LEVEL_PIN = 0;
      const MAX_LEVEL_PIN = 453;
      const EFFECT_SPET = 0.002;
      const EFFECT_STEP_SPECIAL = 0.0066;

      let shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      let positionPin = effectLevelPin.offsetLeft - shift.x;

      if (positionPin < MIN_LEVEL_PIN) {
        positionPin = MIN_LEVEL_PIN;
      } else if (positionPin > MAX_LEVEL_PIN) {
        positionPin = MAX_LEVEL_PIN;
      }

      effectLevelPin.style.left = `${positionPin}px`;
      effectLevelDepth.style.width = `${(positionPin * 100) / MAX_LEVEL_PIN}%`;
      effectLevelValue.value = positionPin;
      if (imgPreview.classList.contains(`effects__preview--chrome`)) {
        imgPreview.style = `filter: grayscale(${positionPin * EFFECT_SPET})`;
      } else if (imgPreview.classList.contains(`effects__preview--sepia`)) {
        imgPreview.style = `filter: sepia(${positionPin * EFFECT_SPET})`;
      } else if (imgPreview.classList.contains(`effects__preview--marvin`)) {
        imgPreview.style = `filter: invert(${positionPin * EFFECT_SPET * 100}%)`;
      } else if (imgPreview.classList.contains(`effects__preview--phobos`)) {
        imgPreview.style = `filter: blur(${EFFECT_STEP_SPECIAL * positionPin}px)`;
      } else if (imgPreview.classList.contains(`effects__preview--heat`)) {
        imgPreview.style = `filter: brightness(${EFFECT_STEP_SPECIAL * positionPin})`;
      } else {
        imgPreview.style = ``;
      }
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.imgeditor = {
    changeZoom: function (evt) {
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
      imgPreview.querySelector(`img`).style = `transform: scale(${scaleValueDefault / 100})`;
    },
    effectChangeHandler: function (evt) {
      const changeEffectClass = function () {
        resetEffect();
        imgPreview.classList.remove(effectClass);
        effectClass = `effects__preview--${evt.target.value}`;
        imgPreview.classList.add(effectClass);
        effectLevelPin.addEventListener(`mousedown`, mouseDownFoo);
        effectLevelUpload.classList.remove(`hidden`);
      };
      if (evt.target.value === effectChromeValue) {
        changeEffectClass();
      } else if (evt.target.value === effectSepiaValue) {
        changeEffectClass();
      } else if (evt.target.value === effectMarvinValue) {
        changeEffectClass();
      } else if (evt.target.value === effectPhobosValue) {
        changeEffectClass();
      } else if (evt.target.value === effectHeatValue) {
        changeEffectClass();
      } else {
        imgPreview.classList.remove(effectClass);
        imgPreview.style = `filter: `;
        effectLevelUpload.classList.add(`hidden`);
      }
    }
  };
})();
