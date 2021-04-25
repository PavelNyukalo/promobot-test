import {basket, BasketItem} from './basket.js';
import {count} from './count.js';
import {formatNumber} from '../utils/format-number.js';

class Product {
  constructor(data) {
    this.productElement = document.querySelector('#product-item')
      .content.querySelector('.product__item')
      .cloneNode(true);

    this.productImage = this.productElement.querySelector('.product__image');
    this.productTitle = this.productElement.querySelector('.product__title');
    this.productPrice = this.productElement.querySelector('.product__price');

    this.openCard = this.openCard.bind(this);

    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.cover = data.cover;
    this.description = data.description;
    this.data = data;
  }

  init(mode) {
    switch (mode) {
      case 'onlyOne':
        this.productElement.classList.add('product__item--only-one');
        break;
      case 'slider':
        this.productElement.classList.add('swiper-slide');
        this.productElement.setAttribute('tabindex', '');
        break;
    }

    this.productElement.id = `product-${this.id}`;
    this.productImage.src = this.cover;
    this.productImage.alt = `Часы ${this.name}`;
    this.productTitle.textContent = this.name;
    this.productPrice.textContent = `${formatNumber(this.price)} \u{20BD}`;

    this.productElement.addEventListener('click', this.openCard);
    this.productElement.addEventListener('keyup', (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        this.openCard(evt);
      }
    });
  }

  insertTo(parent) {
    parent.append(this.productElement);
  }

  openCard(evt) {
    evt.preventDefault();
    const productCard = new ProductCard(this.data);
    productCard.init();
    productCard.insertTo(document.body);
  }
}

class ProductCard {
  constructor(data) {
    this.productCardElementTemplate = document.querySelector('#product-item-card')
      .content.querySelector('.modal-background')
      .cloneNode(true);

    this.productCardElement = this.productCardElementTemplate.querySelector('.product__item--card');
    this.productCardTitle = this.productCardElement.querySelector('.product__title');
    this.productCardPrice = this.productCardElement.querySelector('.product__price');
    this.productCardImage = this.productCardElement.querySelector('.product__image');
    this.productCardDescription = this.productCardElement.querySelector('.product__description');
    this.addToBasketButton = this.productCardElement.querySelector('.product__add');
    this.openBasketButton = this.productCardElement.querySelector('.product__open-basket');
    this.closeProductButton = this.productCardElement.querySelector('.product__close');

    this.addToBasket = this.addToBasket.bind(this);
    this.openBasket = this.openBasket.bind(this);
    this.closeCard = this.closeCard.bind(this);
    this.showShortMessage = this.showShortMessage.bind(this);
    this.onWindowClick = this.onWindowClick.bind(this);

    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.cover = data.cover;
    this.description = data.description;
    this.data = data;
  }

  init() {
    this.productCardElement.id = `product-card-${this.id}`;
    this.productCardImage.src = this.cover;
    this.productCardImage.alt = `Часы ${this.name}`;
    this.productCardTitle.textContent = this.name;
    this.productCardPrice.textContent = `${formatNumber(this.price)} \u{20BD}`;
    this.productCardDescription.textContent = this.description;

    this.addToBasketButton.addEventListener('click', this.addToBasket);
    this.openBasketButton.addEventListener('click', this.openBasket);
    this.closeProductButton.addEventListener('click', this.closeCard);
    this.productCardElementTemplate.addEventListener('click', this.onWindowClick);
  }

  insertTo(parent) {
    parent.append(this.productCardElementTemplate);
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

  openBasket(evt) {
    evt.preventDefault();
    this.closeCard(evt);
    basket.onBasketShow(evt);
  }

  closeCard(evt) {
    evt.preventDefault();
    this.productCardElementTemplate.remove();
  }

  onWindowClick(evt) {
    if (evt.target == this.productCardElementTemplate) {
      this.closeCard(evt);
    }
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

export {Product, ProductCard};
