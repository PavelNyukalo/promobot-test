<template>
  <div class="contacts">
    <a class="contacts__logo" href="#">
      <img
        src="img/logo-light.svg"
        width="130"
        height="20"
        alt="Логотип витрины Promobotic"
      />
    </a>

    <a class="contacts__link" href="tel:+79223520991" target="_blank"
      >8 (922) 352-09-91</a
    >

    <a
      class="contacts__link"
      href="mailto:pavelnyukalo@gmail.com"
      target="_blank"
      >pavelnyukalo@gmail.com</a
    >
  </div>
</template>

<style lang="scss">
@import "../../sass/variables.scss";

.contacts {
  display: flex;
  flex-direction: column;
}

.contacts__logo {
  width: max-content;
  margin-bottom: 15px;

  &:focus {
    outline: 1px solid $white;
  }
}

.contacts__link {
  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 1px solid $white;
  }

  &:active {
    opacity: 0.5;
  }
}
</style>
