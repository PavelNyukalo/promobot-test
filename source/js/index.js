/* eslint-disable no-console */
import {getData} from './fetch.js';
import Product from './product.js';
import './basket.js';

const MIN = 0;
const MAX = 10;

const productContainer = document.querySelector('.product');

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

setTimeout(() => {
  getData((products) => {
    const minItem = getRandomInteger(MIN, MAX);
    const maxItem = getRandomInteger(MIN, MAX);
    let randomArray = [];

    console.log(minItem);
    console.log(maxItem);

    // (minItem > maxItem)
    //   ? randomArray = products.slice(maxItem, minItem)
    //   : randomArray = products.slice(minItem, maxItem);
    randomArray = products.slice(0, 10);


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
          product.init();

          product.insertTo(productContainer);
        });
        productContainer.classList.add('product--slider');
        break;
    }
  });
}, 100);
