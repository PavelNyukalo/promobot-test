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

  productContainer.classList.add('swiper-wrapper', 'product--silder');
};

const initSlider = () => {
  rearrangeLayoutForSlider();
  new Swiper('.swiper-container', swiperOptions);
};

export {initSlider};
