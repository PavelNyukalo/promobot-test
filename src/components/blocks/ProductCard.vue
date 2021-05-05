<template>
  <div @click="onWindowClick" class="modal-background">
    <div class="product__item product__item--card" :id="currentProduct.id">
      <img
        :src="currentProduct.cover"
        :alt="`Часы ${currentProduct.name} по цене ${currentProduct.price}`"
        class="product__image"
        width="246"
        height="246"
      />

      <div class="product__inner-wrapper product__inner-wrapper--card">
        <h3 class="product__title">{{ currentProduct.name }}</h3>
        <span class="product__price">{{ currentProduct.price }}</span>
        <p class="product__description">{{ currentProduct.description }}</p>
        <button @click="addProduct" class="product__add button" type="button">
          Добавить в корзину
        </button>
        <button
          @click="openBasket"
          class="product__open-basket button"
          type="button"
        >
          Открыть корзину
        </button>
        <button @click="hiddenCard" class="product__close button" type="button">
          Вернуться к витрине
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",

  props: {
    currentProduct: {
      type: Object,
    },
  },

  methods: {
    addProduct() {
      this.$emit(
        "addProductToBasket",
        document.querySelector(".product__item--card").id
      );
    },

    openBasket() {
      this.$emit("openBasketApp");
    },

    hiddenCard() {
      this.$emit("hiddenProductCardApp");
    },

    onWindowClick(evt) {
      if (evt.target.classList.contains("modal-background")) {
        this.hiddenCard();
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

.product__item {
  margin: 25px;

  border: 3px solid $product-border;

  cursor: pointer;

  transition: 0.2s linear;

  &:hover,
  &:focus {
    box-shadow: $product-shadow;
  }

  &--only-one {
    display: flex;

    width: 100%;
  }

  &--card {
    position: fixed;
    left: 0;
    right: 0;
    top: 15%;

    display: flex;

    width: 70vw;
    margin: auto;

    cursor: auto;

    background-color: $white;

    &:hover,
    &:focus {
      box-shadow: none;
    }
  }
}

.product__inner-wrapper {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $white;

  background-color: $product-bg;

  &--card {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    color: $text-color;
    background-color: $white;
    border-left: 3px solid $product-border;
  }
}

.product__title {
  margin: 0;

  text-transform: uppercase;
  font-size: 25px;
  line-height: 1.5;
}

.product__price {
  font-size: 18px;
  line-height: 1.5;
}

.product__image {
  display: block;
  align-self: center;

  margin: auto;

  background-image: url("/img/decor/ellipse.svg");
  background-position: center;
  background-repeat: no-repeat;
}

.product__description {
  margin-right: 5px;
}

.product__add,
.product__open-basket,
.product__close {
  margin: 5px;

  border-color: $product-border;

  &:hover,
  &:focus {
    background-color: $product-bg;
  }
}
</style>
