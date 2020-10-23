'use strict';
(function () {
  const pictureTemplate = document.querySelector(`#picture`).content;
  const pictureListElement = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();

  const getRenderPost = function (post) {
    const pictureElement = pictureTemplate.cloneNode(true);
    let AmountComments = post.comments.length;

    pictureElement.querySelector(`.picture__img`).src = post.url;
    pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = AmountComments;

    return pictureElement;
  };

  window.load(function (posts) {
    for (let i = 0; i < posts.length; i++) {
      fragment.appendChild(getRenderPost(posts[i]));
    }
    pictureListElement.appendChild(fragment);
  }, function () {});
})();
