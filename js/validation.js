'use strict';

(function () {

  const hashtagsInput = document.querySelector(`.text__hashtags`);
  const buttonSubmit = document.querySelector(`#upload-submit`);
  const descriptionInput = document.querySelector(`.text__description`);
  const reHashtags = /^#[\w]*$/;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAGS = 5;
  const MAX_DESCRIPTION = 140;

  const errorValidationHashtags = function () {
    hashtagsInput.style = `border: 4px solid red`;
    buttonSubmit.disabled = true;
  };

  const errorValidationComments = function () {
    descriptionInput.style = `border: 4px solid red`;
    buttonSubmit.disabled = true;
  };

  window.validation = {
    hashtags: function () {
      let hashtags = hashtagsInput.value.toLowerCase().split(` `);
      const inArr = function (value, index, self) {
        return (self.indexOf(value) !== index);
      };
      let searchDubl = hashtags.filter(inArr);
      let dublikateHashtagsLength = searchDubl.length;

      for (let i = 0; i < hashtags.length; i++) {
        if (!reHashtags.test(hashtags[i])) {
          hashtagsInput.setCustomValidity(`Хэштег должен начинаться с # и Хэштег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
          errorValidationHashtags();
        } else if (hashtags[i].split(``).length === 1) {
          hashtagsInput.setCustomValidity(`хеш-тег не может состоять только из одной решётки`);
          errorValidationHashtags();
        } else if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
          hashtagsInput.setCustomValidity(`Удалите лишние ${hashtags[i].length - MAX_HASHTAG_LENGTH} симв.`);
          errorValidationHashtags();
        } else if (hashtags.length > MAX_HASHTAGS) {
          hashtagsInput.setCustomValidity(`Удалите лишние ${hashtags.length - MAX_HASHTAGS} хеш-теги`);
          errorValidationHashtags();
        } else if (dublikateHashtagsLength !== 0) {
          hashtagsInput.setCustomValidity(`Удалите повторяющиееся хэш-теги`);
          errorValidationHashtags();
        } else {
          hashtagsInput.setCustomValidity(``);
          hashtagsInput.style = `border: none`;
          buttonSubmit.disabled = false;
        }
        hashtagsInput.reportValidity();
      }
    },
    dexcription: function () {
      const descriptions = descriptionInput.value.length;
      if (descriptions > MAX_DESCRIPTION) {
        descriptionInput.setCustomValidity(`Удалите лишние ${descriptions - MAX_DESCRIPTION} симв.`);
        errorValidationComments();
      } else {
        descriptionInput.reportValidity();
        descriptionInput.style = `border: none`;
        buttonSubmit.disabled = false;
      }
    }
  };
})();
