import {getData} from './modules/fetch.js';
import {Product} from './modules/product.js';
import {initSlider} from './modules/swiper.js';
import {getRandomInteger} from './utils/getRandomInteger.js';
import './modules/basket.js';

const MIN = 0;
const MAX = 9;

const productContainer = document.querySelector('.product');

setTimeout(() => {
  getData((products) => {
    productContainer.textContent = '';
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

        try {
          initSlider();
        } catch (error) {
          alert('Во время инициализации слайдера произошла ошибка, приношу извинения, товары будут выведены на экран не в виде слайдера. Для отображения слайдера попробуйте обновить страницу');

          productContainer.classList.remove('swiper-wrapper', 'product--slider');
          productContainer.classList.add('product--slider-error');
        }
        break;
    }
  });
}, 3000);
