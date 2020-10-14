'use strict';

const COMMENTS = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];

const DESCRIPTIONS = [`Описание 1`, `Описание 2`, `Описание 3`];

const pictureTemplate = document.querySelector(`#picture`);
const pictureListElement = document.querySelector(`.pictures`);
const fragment = document.createDocumentFragment();

const getRandomNumder = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomData = function (arr) {
  let arrHeight = arr.length - 1;
  let randomIndex = getRandomNumder(0, arrHeight);
  return arr[randomIndex];
};

const getUrlPhoto = function () {
  let UrlPhoto = `photos/` + getRandomNumder(1, 25) + `.jpg`;
  return UrlPhoto;
};

const getDescription = function () {
  let descriptionPhoto = getRandomData(DESCRIPTIONS);
  return descriptionPhoto;
};

const getLikes = function () {
  let likesOnPhoto = getRandomNumder(15, 200);
  return likesOnPhoto;
};

const getAvatarUrl = function () {
  let avatarUrl = `img/avatar-` + getRandomNumder(1, 6) + `.svg`;
  return avatarUrl;
};

const getMassage = function () {
  let RandomIndex = getRandomNumder(1, 2);
  if (RandomIndex === 2) {
    let massageUser1 = getRandomData(COMMENTS);
    let massageUser2 = getRandomData(COMMENTS);
    return massageUser1 + massageUser2;
  }
  return getRandomData(COMMENTS);
};

const getName = function () {
  let userName = getRandomData(NAMES);
  return userName;
};

let commentsUsers = [
  {
    avatar: getAvatarUrl(),
    message: getMassage(),
    name: getName()
  },
  {
    avatar: getAvatarUrl(),
    message: getMassage(),
    name: getName()
  },
  {
    avatar: getAvatarUrl(),
    message: getMassage(),
    name: getName()
  }
];


const usersPosts = function () {
  let userPost = [];

  for (let i = 0; i < 25; i++) {
    userPost.push({
      url: getUrlPhoto(),
      description: getDescription(),
      likes: getLikes(),
      comments: commentsUsers
    });
  }

  return userPost;
};

const renderPost = function (post) {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = post.url;
  pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = post.comments;

  return pictureElement;
};

const renderPosts = function () {
  for (let i = 0; i < usersPosts().length; i++) {
    fragment.appendChild(renderPost(usersPosts()[i]));
  }
  pictureListElement.appendChild(fragment);
};

renderPosts();
