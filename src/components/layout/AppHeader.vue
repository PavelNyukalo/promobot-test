<template>
  <header class="page-header">
    <a class="page-header__logo" href="#">
      <img
        src="../../assets/img/logo.svg"
        width="130"
        height="20"
        alt="Логотип витрины Promobotic"
      />
    </a>

    <a
      @click.prevent="openBasket"
      class="page-header__cart"
      href="cart.html"
      target="_blank"
    >
      <span class="visually-hidden">Открыть корзину</span>
      <span v-if="totalProductCount !== 0" class="count">
        <span class="visually-hidden">Количество товаров в корзине</span>
        {{ totalProductCount }}
      </span>
    </a>
  </header>
</template>

<script>
export default {
  name: "AppHeader",

  props: {
    totalProductCount: {
      type: Number,
    },
  },

  methods: {
    openBasket() {
      this.$emit("openBasketApp");
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/variables.scss";

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
}

.page-header__logo {
  height: 20px;

  &:focus {
    outline: 1px solid $black;
    outline-offset: 5px;
  }
}

.page-header__cart {
  position: relative;

  width: 70px;
  height: 70px;
  padding: 0;

  background-color: transparent;
  background-image: url("../../assets/img/icons/cart.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 30px;
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

.count {
  position: absolute;
  right: 10px;
  top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 22px;
  height: 22px;

  font-size: 12px;
  line-height: 1.5;
  color: $text-color;

  background-color: $count-bg;
  border-radius: 50%;

  &--overflow {
    right: 5px;
    top: 5px;

    width: 30px;
    height: 30px;
  }
}
</style>
