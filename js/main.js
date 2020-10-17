'use strict';

const COMMENTS = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];

const DESCRIPTIONS = [`Описание 1`, `Описание 2`, `Описание 3`];

const pictureTemplate = document.querySelector(`#picture`).content;
const pictureListElement = document.querySelector(`.pictures`);
const fragment = document.createDocumentFragment();


const getRandomNumder = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomData = function (arr) {
  let arrLength = arr.length - 1;
  let randomIndex = getRandomNumder(0, arrLength);
  return arr[randomIndex];
};

const getMassage = function () {
  let randomIndex = getRandomNumder(1, 2);
  if (randomIndex === 2) {
    let massageUser1 = getRandomData(COMMENTS);
    let massageUser2 = getRandomData(COMMENTS);
    return massageUser1 + massageUser2;
  }
  return getRandomData(COMMENTS);
};

let getCommentsUsersFoo = function () {
  let commentsUsers = [];
  for (let i = 1; i < getRandomNumder(1, 10); i++) {
    commentsUsers[i] = {
      avatar: `img/avatar-${getRandomNumder(1, 6)}.svg`,
      message: getMassage(),
      name: getRandomData(NAMES)
    };
  }

  return commentsUsers;
};


const getUsersPosts = function () {
  let userPost = [];

  for (let i = 0; i < 25; i++) {
    userPost.push({
      url: `photos/${i + 1}.jpg`,
      description: getRandomData(DESCRIPTIONS),
      likes: getRandomNumder(15, 200),
      comments: getCommentsUsersFoo()
    });
  }

  return userPost;
};

const getRenderPost = function (post) {
  const pictureElement = pictureTemplate.cloneNode(true);
  let AmountComments = post.comments.length;

  pictureElement.querySelector(`.picture__img`).src = post.url;
  pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = AmountComments;

  return pictureElement;
};

const getRenderPosts = function () {
  const posts = getUsersPosts();

  for (let i = 0; i < posts.length; i++) {
    fragment.appendChild(getRenderPost(posts[i]));
  }
  pictureListElement.appendChild(fragment);
};

getRenderPosts();

