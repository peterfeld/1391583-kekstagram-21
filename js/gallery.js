'use strict';
(function () {
  const pictureTemplate = document.querySelector(`#picture`).content;
  const pictureListElement = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();
  const imgFilters = document.querySelector(`.img-filters`);
  const imgFiltersForm = imgFilters.querySelector(`.img-filters__form`);
  const imgFilterDefault = imgFilters.querySelector(`#filter-default`);
  const imgFilterDiscussed = imgFilters.querySelector(`#filter-discussed`);
  const MAXRANDOMIMG = 10;


  const getRenderPost = function (post) {
    const pictureElement = pictureTemplate.cloneNode(true);
    let amountComments = post.comments.length;

    pictureElement.querySelector(`.picture__img`).src = post.url;
    pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = amountComments;

    return pictureElement;
  };

  let getFilterImg = function (arr) {
    imgFiltersForm.addEventListener(`click`, function (evt) {
      if (evt.target === imgFilterDefault) {
        window.debounce(renderPost(arr));
        return;
      } else if (evt.target === imgFilterDiscussed) {
        let arrDate = arr.slice(0);
        arrDate.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        window.debounce(renderPost(arrDate));
      } else {
        window.debounce(renderPost(window.data.getRandomArr(arr, MAXRANDOMIMG)));
      }
    });
  };

  const renderPost = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(getRenderPost(arr[i]));
    }
    pictureListElement.appendChild(fragment);
  };

  let successHandler = function (posts) {
    imgFilters.classList.remove(`img-filters--inactive`);
    getFilterImg(posts);
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
