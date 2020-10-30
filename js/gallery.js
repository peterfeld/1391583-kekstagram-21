'use strict';
(function () {
  const pictureTemplate = document.querySelector(`#picture`).content;
  const pictureListElement = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();
  const imgFilters = document.querySelector(`.img-filters`);
  const imgFiltersForm = imgFilters.querySelector(`.img-filters__form`);
  const imgFilterDefault = imgFilters.querySelector(`#filter-default`);
  const imgFilterDiscussed = imgFilters.querySelector(`#filter-discussed`);
  const imgFilterRamdom = imgFilters.querySelector(`#filter-random`);

  const MAXRANDOMIMG = 10;
  let dataPosts = [];

  const getRenderPost = function (post) {
    const pictureElement = pictureTemplate.cloneNode(true);
    let amountComments = post.comments.length;

    pictureElement.querySelector(`.picture__img`).src = post.url;
    pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = amountComments;

    return pictureElement;
  };

  const deleteImg = function () {
    const imgAnotherUsers = Array.from(document.querySelectorAll(`.picture`));
    for (let i = 0; i < imgAnotherUsers.length; i++) {
      if (imgAnotherUsers[i].parentNode) {
        imgAnotherUsers[i].parentNode.removeChild(imgAnotherUsers[i]);
      }
    }
  };

  const deleteFilterClassButton = function (evt) {
    imgFilterRamdom.classList.remove(`img-filters__button--active`);
    imgFilterDiscussed.classList.remove(`img-filters__button--active`);
    imgFilterDefault.classList.remove(`img-filters__button--active`);
    evt.target.classList.add(`img-filters__button--active`);
  };

  let render = function (evt) {
    if (evt.target === imgFilterDefault) {
      deleteFilterClassButton(evt);
      deleteImg();
      renderPost(dataPosts);
      return;
    } else if (evt.target === imgFilterDiscussed) {
      deleteFilterClassButton(evt);
      deleteImg();
      let arrDate = dataPosts.slice(0);
      arrDate.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      renderPost(arrDate);
    } else {
      deleteFilterClassButton(evt);
      deleteImg();
      renderPost(window.data.getRandomArr(dataPosts, MAXRANDOMIMG));
    }
  };

  const debounced = window.debounce(render);

  let getFilterImg = function (arr) {
    renderPost(arr);
    imgFiltersForm.addEventListener(`click`, debounced);
  };

  const renderPost = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(getRenderPost(arr[i]));
    }
    pictureListElement.appendChild(fragment);
  };

  let successHandler = function (posts) {
    dataPosts = posts;
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
