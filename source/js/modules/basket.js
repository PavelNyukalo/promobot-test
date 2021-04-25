import {count} from './count.js';
import {formatNumber} from '../utils/format-number.js';
import {getScrollbarWidth} from '../utils/getScrollbarWidth.js';

class Basket {
  constructor(element) {
    this.basketElement = element;
    this.basket = document.querySelector('#basket')
      .content.querySelector('.modal-background')
      .cloneNode(true);
    this.basketSection = this.basket.querySelector('.basket');
    this.basketForm = this.basketSection.querySelector('.basket__form');
    this.basketCloseButton = this.basketSection.querySelector('.basket__close');

    this.onBasketShow = this.onBasketShow.bind(this);
    this.onBasketCloseClick = this.onBasketCloseClick.bind(this);
    this.onWindowClick = this.onWindowClick.bind(this);

    this.basketElement.addEventListener('click', this.onBasketShow);
  }

  onBasketShow(evt) {
    evt.preventDefault();
    document.body.append(this.basket);
    document.body.style.paddingRight = `${getScrollbarWidth()}px`;
    document.body.style.overflow = 'hidden';

    this.basketCloseButton.addEventListener('click', this.onBasketCloseClick);
    this.basket.addEventListener('click', this.onWindowClick);
  }

  onBasketCloseClick(evt) {
    evt.preventDefault();
    this.basketCloseButton.removeEventListener('click', this.onBasketCloseClick);

    this.basket.remove();
    document.body.style.paddingRight = '0';
    document.body.style.overflow = 'auto';
  }

  onWindowClick(evt) {
    if (evt.target == this.basket) {
      this.onBasketCloseClick(evt);
    }
  }
}

class BasketItem {
  constructor(data) {
    this.basketItemElement = document.querySelector('#basket-item')
      .content.querySelector('.basket-item')
      .cloneNode(true);

    this.basketItemTitle = this.basketItemElement.querySelector('.basket-item__title');
    this.basketItemPrice = this.basketItemElement.querySelector('.basket-item__price');
    this.basketItemImage = this.basketItemElement.querySelector('.basket-item__image');
    this.basketItemDel = this.basketItemElement.querySelector('.basket-item__del');
    this.basketItemMinus = this.basketItemElement.querySelector('.basket-item__change--minus');
    this.basketItemPlus = this.basketItemElement.querySelector('.basket-item__change--plus');
    this.basketItemInput = this.basketItemElement.querySelector('.basket-item__input');

    this.removeItem = this.removeItem.bind(this);
    this.addProductQuantity = this.addProductQuantity.bind(this);
    this.removeProductQuantity = this.removeProductQuantity.bind(this);
    this.updateCount = this.updateCount.bind(this);

    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.cover = data.cover;
    this.data = data;
  }

  init() {
    this.basketItemElement.id = `basket-item-${this.id}`;
    this.basketItemTitle.textContent = this.name;
    this.basketItemPrice.textContent = `${formatNumber(this.price)} \u{20BD}`;
    this.basketItemPrice.setAttribute('data-price', this.price);
    this.basketItemImage.src = this.cover;
    this.basketItemImage.alt = `Часы ${this.name}`;

    this.basketItemDel.addEventListener('click', this.removeItem);
    this.basketItemMinus.addEventListener('click', this.removeProductQuantity);
    this.basketItemPlus.addEventListener('click', this.addProductQuantity);
    this.basketItemInput.addEventListener('input', this.updateCount);
  }

  insertTo() {
    if (basket.basketForm.querySelector(`#basket-item-${this.id}`) == null) {
      basket.basketForm.prepend(this.basketItemElement);
      this.basketItemInput.value = 1;
    } else {
      const inputBasket = basket.basketForm.querySelector(`#basket-item-${this.id}`)
        .querySelector('.basket-item__input');

      inputBasket.value = parseInt(inputBasket.value, 10) + 1;
    }
  }

  addProductQuantity() {
    if (this.basketItemInput.value == 100) {
      return;
    }
    this.basketItemInput.value = parseInt(this.basketItemInput.value, 10) + 1;
    if (this.basketItemInput.value === 1) {
      count.insertTo(this.basketElement);
    }
    this.updateCount();
  }

  removeProductQuantity() {
    if (this.basketItemInput.value == 1) {
      return;
    }
    this.basketItemInput.value = parseInt(this.basketItemInput.value, 10) - 1;
    this.updateCount();
  }

  removeItem() {
    this.basketItemElement.remove();
    this.updateCount();
  }

  updateCount() {
    count.update();
  }
}

const basket = new Basket(document.querySelector('.page-header__cart'));
export {basket, BasketItem};
