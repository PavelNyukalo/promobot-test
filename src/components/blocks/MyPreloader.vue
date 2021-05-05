<template>
  <div class="preloader">
    <span>Загружаем товары...</span>

    <div class="preloader__spiner"></div>
  </div>
</template>

<style lang="scss">
@import "../../sass/variables.scss";

.preloader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.preloader__spiner {
  display: block;
  position: relative;
  width: 50px;
  height: 50px;
  margin: 30px auto;
  border-radius: 50%;
  border: 1px solid transparent;
  border-top-color: $preloader-color;
  animation: preloader-spin 2s linear infinite;
}
.preloader__spiner:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 1px solid transparent;
  border-top-color: $preloader-color-inner;
  animation: preloader-spin 3s linear infinite;
}
.preloader__spiner:after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 1px solid transparent;
  border-top-color: $preloader-color;
  animation: preloader-spin 1.5s linear infinite;
}
@keyframes preloader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
