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

const pageBody = document.querySelector(`body`);
const uploadFile = document.querySelector(`#upload-file`);
const uploadOverlayImg = document.querySelector(`.img-upload__overlay`);
const uploadCancel = uploadOverlayImg.querySelector(`#upload-cancel`);

const effectLevelValue = uploadOverlayImg.querySelector(`.effect-level__value`);
const effectLevelUpload = uploadOverlayImg.querySelector(`.img-upload__effect-level`);
const effectChrome = uploadOverlayImg.querySelector(`#effect-chrome`);
const effectSepia = uploadOverlayImg.querySelector(`#effect-sepia`);
const effectMarvin = uploadOverlayImg.querySelector(`#effect-marvin`);
const effectPhobos = uploadOverlayImg.querySelector(`#effect-phobos`);
const effectHeat = uploadOverlayImg.querySelector(`#effect-heat`);
const effectNone = uploadOverlayImg.querySelector(`#effect-none`);
const effectForm = document.querySelector(`.img-upload__form`);

const imgUploadScale = uploadOverlayImg.querySelector(`.img-upload__scale`);
const scaleControlSmaller = imgUploadScale.querySelector(`.scale__control--smaller`);
const scaleControlValue = document.querySelector(`.scale__control--value`);

const hashtagsInput = document.querySelector(`.text__hashtags`);

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

const onModalEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeModal();
    uploadFile.value = ``;
  }
};

const openModal = function () {
  uploadOverlayImg.classList.remove(`hidden`);
  pageBody.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onModalEscPress);
};

const closeModal = function () {
  uploadOverlayImg.classList.add(`hidden`);
  pageBody.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onModalEscPress);
  uploadFile.value = ``;
};

const changeZoom = function (evt) {
  scaleControlValue.value = 100;
  let gap = 25;
  if (evt.target === scaleControlSmaller) {
    scaleControlValue.value = (scaleControlValue.value - gap) + `%`;
  } else {
    scaleControlValue.value = `${scaleControlValue.value + gap}%`;
  }
};

const effectChangeHandlet = function (evt) {
  if (evt.target.value === `chrome`) {
    effectLevelUpload.classList.remove(`hidden`);
    effectChrome.filter = `grayscale(${effectLevelValue.value / 100})`;
  } else if (evt.target.value === `sepia`) {
    effectLevelUpload.classList.remove(`hidden`);
    effectSepia.filter = `sepia(${effectLevelValue.value / 100})`;
  } else if (evt.target.value === `marvin`) {
    effectLevelUpload.classList.remove(`hidden`);
    effectMarvin.filter = `invert(${effectLevelValue.value})`;
  } else if (evt.target.value === `phobos`) {
    effectLevelUpload.classList.remove(`hidden`);
    effectPhobos.filter = `blur(${1 + 0.02 * effectLevelValue.value}px)`;
  } else if (evt.target.value === `heat`) {
    effectLevelUpload.classList.remove(`hidden`);
    effectHeat.filter = `brightness(${1 + 0.02 * effectLevelValue.value})`;
  } else {
    effectNone.filter = ``;
    effectLevelValue.value = `100`;
    effectLevelUpload.classList.add(`hidden`);
  }
};

const searchArr = function (arr) {
  for (i = 0; i < arr.length; i++) {
    let objectArr = arr[i];
      for (let j = i + 1; j < arr.length - 1; j++) {
        if (arr[j] === objectArr) {
          return true;
        }

        return false;
      }
  }
}

const verifyValidity = function () {
  let hashtags = hashtagsInput.split(` `);
  let reStartHashtags = /^#[]*$/;
  let reOtherSimbols = /^#[\w\d]*$/;
  let MAX_HASHTAG_LENGTH = 20;
  let MAX_HASHTAGS = 5;
  for (let i = 0; i < hashtags.length; i++) {
    if (!reStartHashtags.test(hashtags[i])) {
      hashtagsInput.setCustomValidity(`Хэштег должен начинаться с #`);
    } else if (!reOtherSimbols.test(hashtags[i])) {
      hashtagsInput.setCustomValidity(`Хэштег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
    } else if (hashtags[i].value.length === 1) {
      hashtagsInput.setCustomValidity(`хеш-тег не может состоять только из одной решётки`);
    } else if (hashtags[i].value.length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity(`Удалите лишние ${hashtags[i].value.length - MAX_HASHTAG_LENGTH}симв.`);
    } else if (hashtags.length > MAX_HASHTAGS) {
      hashtagsInput.setCustomValidity(`Удалите лишние ${hashtags.length - MAX_HASHTAGS}хеш-теги`);
    } else if (searchArr(hashtags)) {
      hashtagsInput.setCustomValidity(`Удалите повторяющиееся хэш-теги`);
    } else {
      hashtagsInput.setCustomValidity(``);
    }

    hashtagsInput.reportValidity();
  }
};

uploadFile.addEventListener(`change`, function () {
  openModal();
  hashtagsInput.addEventListener(`input`, verifyValidity);
  imgUploadScale.addEventListener(`click`, changeZoom);
  effectForm.addEventListener(`change`, effectChangeHandlet);
  uploadCancel.addEventListener(`click`, function () {
    closeModal();
  });
});
