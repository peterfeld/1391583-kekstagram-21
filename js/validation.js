'use strict';

(function () {

  const hashtagsInput = document.querySelector(`.text__hashtags`);

  const inArr = function (value, index, self) {
    return (self.indexOf(value) !== index);
  };

  window.verifyValidity = function () {
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

})();
