'use strict';

(function () {
  const uploadOverlayImg = document.querySelector(`.img-upload__overlay`);
  const effectLevelValue = uploadOverlayImg.querySelector(`.effect-level__value`);
  const effectLevelUpload = uploadOverlayImg.querySelector(`.img-upload__effect-level`);
  const effectChrome = uploadOverlayImg.querySelector(`#effect-chrome`);
  const effectSepia = uploadOverlayImg.querySelector(`#effect-sepia`);
  const effectMarvin = uploadOverlayImg.querySelector(`#effect-marvin`);
  const effectPhobos = uploadOverlayImg.querySelector(`#effect-phobos`);
  const effectHeat = uploadOverlayImg.querySelector(`#effect-heat`);
  const effectNone = uploadOverlayImg.querySelector(`#effect-none`);
  const imgPreview = uploadOverlayImg.querySelector(`.img-upload__preview`);

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

  let mouseDownFoo = function (evt) {
    evt.preventDefault();


    let startCoords = {
      x: evt.clientX
    };

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      const MINLEVELPIN = 0;
      const MAXLEVELPIN = 453;

      let shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      let positionPin = effectLevelPin.offsetLeft - shift.x;

      if (positionPin < MINLEVELPIN) {
        positionPin = MINLEVELPIN;
      } else if (positionPin > MAXLEVELPIN) {
        positionPin = MAXLEVELPIN;
      }

      effectLevelPin.style.left = `${positionPin}px`;
      effectLevelDepth.style.width = `${(positionPin * 100) / MAXLEVELPIN}%`;
      effectLevelValue.value = positionPin;
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
    effectChangeHandlet: function (evt) {
      const changeEffectClass = function () {
        imgPreview.classList.remove(effectClass);
        effectClass = `effects__preview--${evt.target.value}`;
        imgPreview.classList.add(effectClass);
        effectLevelPin.addEventListener(`mousedown`, mouseDownFoo);
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
        // effectLevelValue.value = `100`;
        effectLevelUpload.classList.add(`hidden`);
      }
    }
  };
})();
