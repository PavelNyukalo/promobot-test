import {basket} from './basket.js';

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
    const basketInputs = basket.basketForm.querySelectorAll('.basket-item__input');

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

export {count};
