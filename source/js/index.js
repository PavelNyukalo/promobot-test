import {getData} from './modules/fetch.js';
import {Product} from './modules/product.js';
import {initSlider} from './modules/swiper.js';
import './modules/basket.js';

const MIN = 0;
const MAX = 10;

const productContainer = document.querySelector('.product');

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getData((products) => {
  const minItem = getRandomInteger(MIN, MAX);
  const maxItem = getRandomInteger(MIN, MAX);
  let randomArray = [];

  (minItem < maxItem)
    ? randomArray = products.slice(minItem, maxItem)
    : randomArray = products.slice(maxItem, minItem);

  switch (randomArray.length) {
    case 0:
      productContainer.append('Рандомные числа совпали, попробуйте ещё😁');
      break;

    case 1:
      randomArray.forEach((productObject) => {
        const product = new Product(productObject);
        product.init('onlyOne');
        product.insertTo(productContainer);
      });
      break;

    case 2:
      randomArray.forEach((productObject) => {
        const product = new Product(productObject);
        product.init();
        product.insertTo(productContainer);
      });
      break;

    default:
      randomArray.forEach((productObject) => {
        const product = new Product(productObject);
        product.init('slider');

        product.insertTo(productContainer);
      });

      initSlider();
      break;
  }
});
