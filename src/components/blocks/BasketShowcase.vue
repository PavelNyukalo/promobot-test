<template>
  <div @click="onWindowClick" class="modal-background">
    <section class="basket">
      <h2>Корзина выбранных товаров</h2>

      <button @click="hiddenBasket" class="basket__close" type="button">
        <span class="visually-hidden">Закрыть корзину</span>
        <svg
          aria-hidden="true"
          focusable="false"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.4 3.46l9.6 9.6 9.6-9.57a1.95 1.95 0 011.45-.58 2.18 2.18 0 012.04 2.04 1.92 1.92 0 01-.58 1.4L18.88 16l9.63 9.66c.38.36.59.87.58 1.4a2.18 2.18 0 01-2.04 2.03 1.95 1.95 0 01-1.45-.58L16 18.94 6.43 28.5a1.95 1.95 0 01-1.46.58 2.18 2.18 0 01-2.06-2.06 1.92 1.92 0 01.58-1.4L13.12 16 3.46 6.34a1.92 1.92 0 01-.55-1.4 2.18 2.18 0 012.04-2.03 1.95 1.95 0 011.45.55z"
            fill="#D75A4A"
          />
        </svg>
      </button>

      <form class="basket__form" action="#">
        <!-- Элемент корзины выбранного товара -->
        <div
          v-for="item in selectedProducts"
          :key="item.id"
          :id="item.id"
          @click="
            deleteProduct($event);
            removeProductQuantity($event);
            addProductQuantity($event);
          "
          class="basket__item basket-item"
        >
          <img
            :src="item.cover"
            :alt="`Часы ${item.name} по цене ${item.price}`"
            class="basket-item__image"
            width="100"
            height="100"
          />

          <div class="basket-item__inner-wrapper">
            <h3 class="basket-item__title">{{ item.name }}</h3>
            <span class="basket-item__price">{{ item.price }}</span>
          </div>

          <div class="basket-item__interactive">
            <button class="basket-item__del" type="button">
              <span class="visually-hidden">Удалить позицию</span>
            </button>

            <div class="basket-item__quantity">
              <label for="quantity">Количество:</label>

              <button
                class="basket-item__change basket-item__change--minus"
                type="button"
              >
                <span class="visually-hidden">Уменьшить количество</span>
                <svg
                  class="basket-item__change--minus--svg"
                  aria-hidden="true"
                  focusable="false"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="basket-item__change--minus--path"
                    d="M20 12H4"
                    stroke="#061B28"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>

              <input
                class="basket-item__input"
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                max="100"
                step="1"
                v-model.number="item.quantity"
                :placeholder="item.quantity"
              />

              <button
                class="basket-item__change basket-item__change--plus"
                type="button"
              >
                <span class="visually-hidden">Увеличить количество</span>
                <svg
                  class="basket-item__change--plus--svg"
                  aria-hidden="true"
                  focusable="false"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="basket-item__change--plus--path"
                    d="M12 12H4M12 20V12V20ZM12 12V4V12ZM12 12H20H12Z"
                    stroke="#061B28"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button class="basket__print button" type="button">
          Распечатать позиции
        </button>
        <button class="basket__submit button" type="submit">
          Оформить заказ
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "BasketShowcase",

  props: {
    selectedProducts: {
      type: Array,
    },
  },

  methods: {
    hiddenBasket() {
      this.$emit("hiddenBasketApp");
    },

    onWindowClick(evt) {
      if (evt.target.classList.contains("modal-background")) {
        this.hiddenBasket();
      }
    },

    deleteProduct(evt) {
      if (evt.target.classList.contains("basket-item__del")) {
        this.$emit("deleteProductApp", evt.currentTarget.id);
      }
    },

    removeProductQuantity(evt) {
      if (
        evt.target.classList.contains("basket-item__change--minus") ||
        evt.target.classList.contains("basket-item__change--minus--svg") ||
        evt.target.classList.contains("basket-item__change--minus--path")
      ) {
        this.$emit("removeProductQuantityApp", evt.currentTarget.id);
      }
    },

    addProductQuantity(evt) {
      if (
        evt.target.classList.contains("basket-item__change--plus") ||
        evt.target.classList.contains("basket-item__change--plus--svg") ||
        evt.target.classList.contains("basket-item__change--plus--path")
      ) {
        this.$emit("addProductQuantityApp", evt.currentTarget.id);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/variables.scss";

.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: $modal-bg;
}

.basket {
  position: fixed;
  left: 0;
  right: 0;

  padding: 20px;
  width: 900px;
  max-height: 90vh;
  margin: 15px auto;

  text-align: right;
  background-color: $basket-bg;
  border-radius: 5px;

  overflow: auto;
}

.basket .button {
  margin: 5px;
}

.basket h2 {
  text-align: center;
}

.basket__close {
  position: absolute;
  right: 15px;
  top: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  padding: 0;

  background-color: transparent;
  border: none;
  border-radius: 50%;

  cursor: pointer;

  transition: background-color 0.1s linear;

  &:hover {
    background-color: $basket-close-bg;
  }

  &:hover path {
    fill: $basket-close-hover;
  }

  &:focus {
    outline: 1px solid $basket-close-bg;
    outline-offset: 1px;
  }
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  padding: 15px;
  margin-bottom: 15px;

  border-bottom: 1px solid $basket-item-border;
}

.basket-item__image {
  background-image: url("../../assets/img/decor/ellipse.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100px;
}

.basket-item__inner-wrapper {
  margin-left: 50px;
  margin-right: auto;

  text-align: left;
}

.basket-item__title {
  margin-top: 0;

  text-transform: uppercase;
}

.basket-item__del {
  width: 40px;
  height: 40px;
  padding: 0;

  background-color: transparent;
  background-image: url("../../assets/img/icons/del.svg");
  background-position: center;
  background-repeat: no-repeat;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  transition: background-color 0.1s linear;

  &:hover {
    background-color: $bg-grey;
  }

  &:focus {
    outline: 1px solid $black;
    outline-offset: 1px;
  }
}

.basket-item__interactive {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.basket-item__quantity {
  display: flex;
  align-items: center;
}

.basket-item__quantity label {
  margin-right: 20px;
}

.basket-item__change {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  padding: 0;

  background-color: transparent;
  border: 1px solid $basket-item-change-border;

  cursor: pointer;

  &:hover,
  &:focus {
    background-color: $basket-item-change-bg;
    outline: none;
  }

  &:hover path,
  &:focus path {
    stroke: $basket-item-change-hover;
  }

  &:active {
    opacity: 0.5;
  }

  &--minus {
    margin-right: -1px;
  }

  &--plus {
    margin-left: -1px;
  }
}

.basket-item__input {
  box-sizing: border-box;

  width: 40px;
  height: 30px;
  padding: 5px;

  text-align: center;

  border: 1px solid $basket-item-input-border;

  &:hover,
  &:focus {
    background-color: $basket-item-input-bg-hover;
    outline: none;
  }
}
</style>
