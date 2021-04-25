const url = 'https://raw.githubusercontent.com/PavelNyukalo/promobot-test/master/products.json';

const getData = (onSuccess) => {
  fetch(url)
    .then((response) => response.json())
    .then((products) => {
      onSuccess(products);
    })
    .catch(() => {
      document.querySelector('.product').textContent = 'Упс..Не удалось загрузить данные с сервера😢';
    });
};

export {getData};
