<template>
  <main class="page-main">
    <h1>Витрина товаров</h1>
    <section class="page-main__product">
      <h2>Загруженные товары</h2>

      <Products
        @showProductCard="showProductCard"
        :productsList="productsList"
      />
    </section>
  </main>
</template>

<script>
import Products from "../blocks/Products.vue";

export default {
  name: "AppMain",

  components: {
    Products,
  },

  props: {
    productsList: Array,
  },

  methods: {
    showProductCard(id) {
      this.$emit("showProductCardApp", id);
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/variables.scss";

.page-main h1 {
  padding: 50px;
  margin: 0;

  text-align: center;
  font-weight: 400;

  background-color: $bg-grey;
}

.page-main__product {
  margin: 40px auto;

  &--slider {
    padding-bottom: 24px;
  }
}

.page-main__product h2 {
  text-align: center;
  font-weight: 400;
}

// Swiperjs styles

.page-main__product .swiper-container {
  z-index: 0;
}

.page-main__product .swiper-pagination {
  bottom: 0;
}
</style>
