/* eslint-disable no-console */
import {basket, BasketItem} from './basket.js';
import {count} from './count.js';

export default class Product {
  constructor(data) {
    this.productElement = document.querySelector('#product-item')
      .content.querySelector('.product__item')
      .cloneNode(true);

    this.productTitle = this.productElement.querySelector('.product__title');
    this.productPrice = this.productElement.querySelector('.product__price');
    this.productImage = this.productElement.querySelector('.product__image');
    this.productInfo = this.productElement.querySelector('.product__description');
    this.productDescription = this.productInfo.querySelector('p');
    this.infoButton = this.productElement.querySelector('.product__button');
    this.basketButton = this.productElement.querySelector('.product__cart');
    this.basketQuestionContainer = this.productElement.querySelector('.product__question');
    this.addToBasketButton = this.basketQuestionContainer.querySelector('.product__add');
    this.showBasketButton = this.basketQuestionContainer.querySelector('.product__open-basket');

    this.onInfoShow = this.onInfoShow.bind(this);
    this.onQuestionShow = this.onQuestionShow.bind(this);
    this.addToBasket = this.addToBasket.bind(this);
    this.onBasketShow = this.onBasketShow.bind(this);
    this.showShortMessage = this.showShortMessage.bind(this);

    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.cover = data.cover;
    this.description = data.description;
    this.data = data;
  }

  init(mode) {
    if (mode === 'onlyOne') {
      this.productElement.classList.add('product__item--only-one');
    } else if (mode === 'slider') {
      this.productElement.classList.add('swiper-slide');
    }
    this.productElement.id = `product-${this.id}`;
    this.productTitle.textContent = this.name;
    this.productPrice.textContent = `${this.price} \u{20BD}`;
    this.productImage.src = this.cover;
    this.productDescription.textContent = this.description;

    this.infoButton.addEventListener('click', this.onInfoShow);
    this.basketButton.addEventListener('click', this.onQuestionShow);
  }

  insertTo(parent) {
    parent.append(this.productElement);
  }

  onInfoShow(evt) {
    evt.preventDefault();
    this.productInfo.classList.toggle('product__description--hidden');

    if (!this.basketQuestionContainer.classList.contains('product__question--hidden')) {
      this.basketQuestionContainer.classList.add('product__question--hidden');
    }
  }

  addToBasket(evt) {
    evt.preventDefault();
    try {
      const basketItem = new BasketItem(this.data);
      basketItem.init();
      basketItem.insertTo();

      count.insertTo(basket.basketElement);
      count.update();

      this.showShortMessage('Успешно добавлено в корзину😊', 'success');
    } catch (error) {
      this.showShortMessage('Не удалось добавить в корзину😲', 'error');
    }
  }

  onQuestionShow(evt) {
    evt.preventDefault();
    this.basketQuestionContainer.classList.toggle('product__question--hidden');
    this.showBasketButton.addEventListener('click', this.onBasketShow);
    this.addToBasketButton.addEventListener('click', this.addToBasket);
  }

  onBasketShow(evt) {
    basket.onBasketShow(evt);
  }

  showShortMessage(text, additionalClass) {
    const messageElement = document.createElement('div');

    messageElement.classList.add('short-message', `short-message--${additionalClass}`);
    messageElement.textContent = text;
    document.body.append(messageElement);

    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  }
}
