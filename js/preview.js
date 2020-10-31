'use strict';

(function () {

  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
  const commentCount = bigPicture.querySelector(`.social__comment-count`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const pageBody = document.querySelector(`body`);
  const socialComments = bigPicture.querySelector(`.social__comments`);

  const previewOpen = function () {
    bigPicture.classList.remove(`hidden`);
    commentCount.classList.remove(`hidden`);
    commentsLoader.classList.remove(`hidden`);
    pageBody.classList.add(`modal-open`);

    bigPictureCancel.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      closePreview();
    });
  };

  const onPreviewEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePreview();
    }
  };

  let closePreview = function () {
    bigPicture.classList.add(`hidden`);
    pageBody.classList.remove(`modal-open`);
  };

  window.preview = {
    openPreview: function (arr) {
      const pictures = document.querySelectorAll(`.picture`);

      let addPictureClickHandler = function (picture, postUrl) {
        picture.addEventListener(`click`, function () {
          bigPicture.querySelector(`.big-picture__img img`).src = postUrl.url;
          bigPicture.querySelector(`.likes-count`).textContent = postUrl.likes;
          bigPicture.querySelector(`.comments-count`).textContent = postUrl.comments.length;
          bigPicture.querySelector(`.social__caption`).textContent = postUrl.description;
          while (socialComments.firstChild) {
            socialComments.removeChild(socialComments.firstChild);
          }
          previewOpen();
          for (let i = 0; i < postUrl.comments; i++) {
            socialComments.insertAdjacentHTML(`afterbegin`, `<li class="social__comment">
            <img
            class="social__picture"
            src="${postUrl.comments[i].avatar}"
            alt="${postUrl.comments[i].name}"
            width="35" height="35">
            <p class="social__text">${postUrl.comments[i].message}</p>
            </li>`);
          }
        });
      };

      for (let i = 0; i < pictures.length; i++) {
        addPictureClickHandler(pictures[i], arr[i]);
        document.addEventListener(`keydown`, onPreviewEscPress);
      }
    }
  };
})();
