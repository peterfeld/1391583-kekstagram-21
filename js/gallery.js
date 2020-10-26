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

  const successHandler = function (posts) {
    for (let i = 0; i < posts.length; i++) {
      fragment.appendChild(getRenderPost(posts[i]));
    }
    pictureListElement.appendChild(fragment);
  };

  let errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; height: 40px; display: flex; align-items: center; border: 2px solid darkred`;
    node.style.left = `30%`;
    node.style.top = `5%`;
    node.style.position = `fixed`;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.load(successHandler, errorHandler);
})();
