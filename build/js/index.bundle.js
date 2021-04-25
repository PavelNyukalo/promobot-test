/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/js/modules/basket.js":
/*!*************************************!*\
  !*** ./source/js/modules/basket.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "basket": function() { return /* binding */ basket; },
/* harmony export */   "BasketItem": function() { return /* binding */ BasketItem; }
/* harmony export */ });
/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./count.js */ "./source/js/modules/count.js");
/* harmony import */ var _utils_format_number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/format-number.js */ "./source/js/utils/format-number.js");
/* harmony import */ var _utils_getScrollbarWidth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getScrollbarWidth.js */ "./source/js/utils/getScrollbarWidth.js");




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
    document.body.style.paddingRight = `${(0,_utils_getScrollbarWidth_js__WEBPACK_IMPORTED_MODULE_2__.getScrollbarWidth)()}px`;
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
    this.basketItemPrice.textContent = `${(0,_utils_format_number_js__WEBPACK_IMPORTED_MODULE_1__.formatNumber)(this.price)} \u{20BD}`;
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
      _count_js__WEBPACK_IMPORTED_MODULE_0__.count.insertTo(this.basketElement);
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
    _count_js__WEBPACK_IMPORTED_MODULE_0__.count.update();
  }
}

const basket = new Basket(document.querySelector('.page-header__cart'));



/***/ }),

/***/ "./source/js/modules/count.js":
/*!************************************!*\
  !*** ./source/js/modules/count.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "count": function() { return /* binding */ count; }
/* harmony export */ });
/* harmony import */ var _basket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basket.js */ "./source/js/modules/basket.js");


class Count {
  constructor() {
    this.countElement = document.querySelector('#count')
      .content.querySelector('.count')
      .cloneNode(true);
  }

  insertTo(parent) {
    parent.append(this.countElement);
  }

  update() {
    const basketInputs = _basket_js__WEBPACK_IMPORTED_MODULE_0__.basket.basketForm.querySelectorAll('.basket-item__input');

    const result = Array.from(basketInputs).reduce((sum, item) => {
      return sum + parseInt(item.value, 10);
    }, 0);

    this.countElement.textContent = result;

    if (result === 0) {
      this.remove();
    }

    if (result > 100) {
      this.countElement.classList.add('count--overflow');
    }
  }

  remove() {
    this.countElement.remove();
  }
}

const count = new Count();




/***/ }),

/***/ "./source/js/modules/fetch.js":
/*!************************************!*\
  !*** ./source/js/modules/fetch.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": function() { return /* binding */ getData; }
/* harmony export */ });
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




/***/ }),

/***/ "./source/js/modules/product.js":
/*!**************************************!*\
  !*** ./source/js/modules/product.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Product": function() { return /* binding */ Product; },
/* harmony export */   "ProductCard": function() { return /* binding */ ProductCard; }
/* harmony export */ });
/* harmony import */ var _basket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basket.js */ "./source/js/modules/basket.js");
/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./count.js */ "./source/js/modules/count.js");
/* harmony import */ var _utils_format_number_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/format-number.js */ "./source/js/utils/format-number.js");




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
    this.productPrice.textContent = `${(0,_utils_format_number_js__WEBPACK_IMPORTED_MODULE_2__.formatNumber)(this.price)} \u{20BD}`;

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
    this.productCardPrice.textContent = `${(0,_utils_format_number_js__WEBPACK_IMPORTED_MODULE_2__.formatNumber)(this.price)} \u{20BD}`;
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
      const basketItem = new _basket_js__WEBPACK_IMPORTED_MODULE_0__.BasketItem(this.data);
      basketItem.init();
      basketItem.insertTo();

      _count_js__WEBPACK_IMPORTED_MODULE_1__.count.insertTo(_basket_js__WEBPACK_IMPORTED_MODULE_0__.basket.basketElement);
      _count_js__WEBPACK_IMPORTED_MODULE_1__.count.update();

      this.showShortMessage('Успешно добавлено в корзину😊', 'success');
    } catch (error) {
      this.showShortMessage('Не удалось добавить в корзину😲', 'error');
    }
  }

  openBasket(evt) {
    evt.preventDefault();
    this.closeCard(evt);
    _basket_js__WEBPACK_IMPORTED_MODULE_0__.basket.onBasketShow(evt);
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




/***/ }),

/***/ "./source/js/modules/swiper.js":
/*!*************************************!*\
  !*** ./source/js/modules/swiper.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initSlider": function() { return /* binding */ initSlider; }
/* harmony export */ });
/*global Swiper */
const pageMainProduct = document.querySelector('.page-main__product');
const productContainer = document.querySelector('.product');

const swiperOptions = {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  grabCursor: true,
  freeMode: true,

  keyboard: {
    enabled: true,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
};

const rearrangeLayoutForSlider = () => {
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination');

  pageMainProduct.classList.add('page-main__product--slider', 'swiper-container');
  pageMainProduct.append(swiperPagination);

  productContainer.classList.add('swiper-wrapper', 'product--slider');
};

const initSlider = () => {
  rearrangeLayoutForSlider();
  // eslint-disable-next-line no-unused-vars
  const slider = new Swiper('.swiper-container', swiperOptions);
};




/***/ }),

/***/ "./source/js/utils/format-number.js":
/*!******************************************!*\
  !*** ./source/js/utils/format-number.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatNumber": function() { return /* binding */ formatNumber; }
/* harmony export */ });
const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1 `);
};


/***/ }),

/***/ "./source/js/utils/getRandomInteger.js":
/*!*********************************************!*\
  !*** ./source/js/utils/getRandomInteger.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomInteger": function() { return /* binding */ getRandomInteger; }
/* harmony export */ });
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/***/ }),

/***/ "./source/js/utils/getScrollbarWidth.js":
/*!**********************************************!*\
  !*** ./source/js/utils/getScrollbarWidth.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getScrollbarWidth": function() { return /* binding */ getScrollbarWidth; }
/* harmony export */ });
const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************!*\
  !*** ./source/js/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/fetch.js */ "./source/js/modules/fetch.js");
/* harmony import */ var _modules_product_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/product.js */ "./source/js/modules/product.js");
/* harmony import */ var _modules_swiper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/swiper.js */ "./source/js/modules/swiper.js");
/* harmony import */ var _utils_getRandomInteger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/getRandomInteger.js */ "./source/js/utils/getRandomInteger.js");
/* harmony import */ var _modules_basket_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/basket.js */ "./source/js/modules/basket.js");






const MIN = 0;
const MAX = 9;

const productContainer = document.querySelector('.product');

setTimeout(() => {
  (0,_modules_fetch_js__WEBPACK_IMPORTED_MODULE_0__.getData)((products) => {
    productContainer.textContent = '';
    const minItem = (0,_utils_getRandomInteger_js__WEBPACK_IMPORTED_MODULE_3__.getRandomInteger)(MIN, MAX);
    const maxItem = (0,_utils_getRandomInteger_js__WEBPACK_IMPORTED_MODULE_3__.getRandomInteger)(MIN, MAX);
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
          const product = new _modules_product_js__WEBPACK_IMPORTED_MODULE_1__.Product(productObject);
          product.init('onlyOne');
          product.insertTo(productContainer);
        });
        break;

      case 2:
        randomArray.forEach((productObject) => {
          const product = new _modules_product_js__WEBPACK_IMPORTED_MODULE_1__.Product(productObject);
          product.init();
          product.insertTo(productContainer);
        });
        break;

      default:
        randomArray.forEach((productObject) => {
          const product = new _modules_product_js__WEBPACK_IMPORTED_MODULE_1__.Product(productObject);
          product.init('slider');

          product.insertTo(productContainer);
        });

        try {
          (0,_modules_swiper_js__WEBPACK_IMPORTED_MODULE_2__.initSlider)();
        } catch (error) {
          alert('Во время инициализации слайдера произошла ошибка, приношу извинения, товары будут выведены на экран не в виде слайдера. Для отображения слайдера попробуйте обновить страницу');

          productContainer.classList.remove('swiper-wrapper', 'product--slider');
          productContainer.classList.add('product--slider-error');
        }
        break;
    }
  });
}, 3000);

}();
/******/ })()
;
//# sourceMappingURL=index.bundle.js.map