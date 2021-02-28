<template>
<header class="header" ref="header">
  <div class="header__container">
    <a class="header__logo">
      <h1 class="header__title">{{ name }}</h1>
    </a>
    <Nav :navItems="this.navItems" :global="this.global"></Nav>
  </div>
</header>
</template>

<script lang="ts">
import {
  Store
} from "vuex";
import {
  Component,
  Prop,
  Vue,
} from 'nuxt-property-decorator';
import Nav from "@/components/Nav.vue";

@Component
export default class Header extends Vue {
  name = (this.$store as any).$config.appTitle;

  @Prop() navItems: any;
  @Prop() global: any;

}
</script>

<style lang="scss">
@import "../assets/scss/components/_header";
</style>
