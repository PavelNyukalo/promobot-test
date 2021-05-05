<template>
  <footer class="page-footer">
    <ContactsBlock class="page-footer__contacts" />

    <SocialList class="page-footer__social" />

    <CopyrightBlock class="page-footer__copyright" />
  </footer>
</template>

<script>
import CopyrightBlock from "../blocks/CopyrightBlock.vue";
import ContactsBlock from "../blocks/ContactsBlock.vue";
import SocialList from "../blocks/SocialList.vue";

export default {
  name: "AppFooter",

  components: {
    CopyrightBlock,
    ContactsBlock,
    SocialList,
  },
};
</script>

<style lang="scss">
@import "../../sass/variables.scss";

.page-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  margin-top: auto;

  color: $white;

  background-color: $footer-bg;
}

.page-footer a {
  color: inherit;
}
</style>
