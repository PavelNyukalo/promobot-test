<template>
  <AppHeader
    :totalProductCount="totalProductCount"
    @openBasketApp="openBasketApp"
  />
  <AppMain
    :productsList="productsList"
    @showProductCardApp="showProductCardApp"
  />
  <AppFooter />

  <ProductCard
    v-if="showCard"
    :currentProduct="currentProduct"
    @addProductToBasket="addProductToBasket"
    @hiddenProductCardApp="hiddenProductCardApp"
    @openBasketApp="openBasketApp"
  />
  <BasketShowcase
    v-if="showBasket"
    :selectedProducts="selectedProducts"
    @deleteProductApp="deleteProductApp"
    @removeProductQuantityApp="removeProductQuantityApp"
    @addProductQuantityApp="addProductQuantityApp"
    @hiddenBasketApp="hiddenBasketApp"
  />
</template>

<script>
import { getData } from "./js/fetch";
import { getScrollbarWidth } from "./js/utils/getScrollbarWidth";
import { getRandomInteger } from "./js/utils/getRandomInteger";
import { showShortMessage } from "./js/utils/showShortMessage";
import AppHeader from "./components/layout/AppHeader.vue";
import AppMain from "./components/layout/AppMain.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import ProductCard from "./components/blocks/ProductCard.vue";
import BasketShowcase from "./components/blocks/BasketShowcase.vue";

const MIN = 0;
const MAX = 9;

export default {
  name: "App",

  components: {
    AppHeader,
    AppMain,
    AppFooter,
    ProductCard,
    BasketShowcase,
  },

  data() {
    return {
      productsList: [],

      currentProduct: {},

      selectedProducts: [],

      showCard: false,
      showBasket: false,
    };
  },

  computed: {
    totalProductCount() {
      return this.selectedProducts.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
  },

  created() {
    setTimeout(() => {
      getData((product) => {
        const minItem = getRandomInteger(MIN, MAX);
        const maxItem = getRandomInteger(MIN, MAX);

        if (minItem == maxItem) {
          this.productsList = product.slice(minItem, maxItem + 1);

          return;
        }

        minItem < maxItem
          ? (this.productsList = product.slice(minItem, maxItem))
          : (this.productsList = product.slice(maxItem, minItem));
      });
    }, 2000);
  },

  methods: {
    addProductToBasket(id) {
      const checkProduct = this.findIndexSelectedProducts(id);

      if (checkProduct !== -1) {
        showShortMessage(
          "Уже добавлено в корзину ❗. Изменить количество можно в корзине",
          "warning"
        );
        return;
      }

      try {
        const currentProductItem = this.findIndexInProducts(id);

        this.selectedProducts.push(this.productsList[currentProductItem]);

        const findProduct = this.findSelectedProducts(id);

        findProduct.quantity = 1;

        showShortMessage("Успешно добавлено в корзину😊", "success");
      } catch (error) {
        showShortMessage("Не удалось добавить в корзину😲", "error");
      }
    },

    deleteProductApp(id) {
      const indexDelete = this.findIndexSelectedProducts(id);

      this.selectedProducts.splice(indexDelete, 1);
    },

    showProductCardApp(id) {
      const currentProductItem = this.findIndexInProducts(id);

      this.currentProduct = this.productsList[currentProductItem];

      this.showCard = true;
    },

    hiddenProductCardApp() {
      this.showCard = false;
    },

    openBasketApp() {
      this.showCard = false;
      this.showBasket = true;

      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      document.body.style.overflow = "hidden";
    },

    hiddenBasketApp() {
      this.showBasket = false;

      document.body.style.paddingRight = "0";
      document.body.style.overflow = "auto";
    },

    removeProductQuantityApp(id) {
      const currentProduct = this.findIndexSelectedProducts(id);

      if (this.selectedProducts[currentProduct].quantity === 1) {
        return;
      }
      this.selectedProducts[currentProduct].quantity -= 1;
    },

    addProductQuantityApp(id) {
      const currentProduct = this.findIndexSelectedProducts(id);

      this.selectedProducts[currentProduct].quantity += 1;
    },

    findIndexSelectedProducts(id) {
      return this.selectedProducts.findIndex((item) => {
        return item.id === id;
      });
    },

    findSelectedProducts(id) {
      return this.selectedProducts.find((item) => {
        return item.id === id;
      });
    },

    findIndexInProducts(id) {
      return this.productsList.findIndex((item) => {
        return item.id === id;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./sass/normalize.scss";
@import "./sass/variables.scss";

@font-face {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: normal;
  font-display: swap;
  src: url("../public/fonts/montserrat.woff2") format("woff2"),
    url("../public/fonts/montserrat.woff") format("woff");
}

@font-face {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: bold;
  font-display: swap;
  src: url("../public/fonts/montserrat-bold.woff2") format("woff2"),
    url("../public/fonts/montserrat-bold.woff") format("woff");
}

@import "./sass/base.scss";

.short-message {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 15px;

  text-align: center;
  font-size: 18px;
  line-height: 1.5;

  &--success {
    background-color: $short-message-bg-success;
  }

  &--error {
    background-color: $short-message-bg-error;
  }

  &--warning {
    background-color: $short-message-bg-warning;
  }
}
</style>
