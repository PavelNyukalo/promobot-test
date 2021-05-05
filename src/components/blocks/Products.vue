<template>
  <div
    class="product"
    :class="{
      'product--slider': productsList.length >= 3,
    }"
  >
    <MyPreloader v-if="!productsList.length" />

    <template v-if="productsList.length < 3">
      <div
        v-for="product in productsList"
        :key="product.id"
        :id="product.id"
        :class="{
          'product__item--only-one': productsList.length === 1,
        }"
        @click="showCard"
        class="product__item"
        tabindex="0"
      >
        <img
          :src="product.cover"
          :alt="`Часы ${product.name} по цене ${product.price}`"
          class="product__image"
          width="246"
          height="246"
        />

        <div class="product__inner-wrapper">
          <h3 class="product__title">{{ product.name }}</h3>
          <span class="product__price">{{ product.price }}</span>
        </div>
      </div>
    </template>

    <template v-else>
      <swiper
        :slides-per-view="3"
        :space-between="50"
        :grabCursor="true"
        :centeredSlides="true"
        keyboard
        :pagination="{ clickable: true, dynamicBullets: true }"
        style="padding-bottom: 20px"
      >
        <swiper-slide v-for="product in productsList" :key="product.id">
          <div
            :id="product.id"
            @click="showCard"
            class="product__item"
            tabindex="0"
          >
            <img
              :src="product.cover"
              :alt="`Часы ${product.name} по цене ${product.price}`"
              class="product__image"
              width="246"
              height="246"
            />

            <div class="product__inner-wrapper">
              <h3 class="product__title">{{ product.name }}</h3>
              <span class="product__price">{{ product.price }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </template>
  </div>
</template>

<script>
import MyPreloader from "./MyPreloader.vue";

// SwiperJS
import SwiperCore, { Pagination, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
// import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Pagination, Keyboard]);

export default {
  name: "Products",

  props: {
    productsList: {
      type: Array,
    },
  },

  components: {
    Swiper,
    SwiperSlide,
    MyPreloader,
  },

  mounted() {
    setTimeout(() => {
      if (this.productsList.length !== 0) {
        this.$forceUpdate();
      }
    }, 3000);
  },

  methods: {
    showCard(evt) {
      this.$emit("showProductCard", evt.currentTarget.id);
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/variables.scss";
@import "swiper/components/pagination/pagination.scss";

.product {
  display: flex;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;

  &--slider {
    display: block;
  }
}

.product--slider-error .product__item {
  width: auto;
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

.product__item--only-one .product__image {
  width: 400px;
  height: 400px;

  background-size: 380px;
}

.product__item--only-one .product__inner-wrapper {
  justify-content: space-evenly;
  flex-grow: 1;
}

.product__item--only-one .product__title {
  font-size: 50px;
}

.product__item--only-one .product__price {
  font-size: 30px;
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

  background-image: url("../../assets/img/decor/ellipse.svg");
  background-position: center;
  background-repeat: no-repeat;
}
</style>
