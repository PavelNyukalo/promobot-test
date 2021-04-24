/* eslint-disable no-console */

const url = 'https://raw.githubusercontent.com/PavelNyukalo/promobot-test/master/source/products.json';

const getData = (onSuccess) => {
  fetch(url)
    .then((response) => response.json())
    .then((products) => {
      onSuccess(products);
    })
    .catch(() => {
      document.querySelector('.product').append('Упс..Не удалось загрузить данные с сервера😢');
    });
};

export {getData};
