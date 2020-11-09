'use strict';

(function () {
  window.data = {
    getRandomNumder: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomArr: function (arr, number) {
      let arrDate = arr.slice(0);
      let sortArr = arrDate.sort(function (a, b) {
        return a.likes - b.likes;
      });
      return sortArr.slice(0, number);
    }
  };
})();
