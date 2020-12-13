<template>
<header class="header" ref="header">
  <div class="header__container">
    <a class="header__logo">
      <h1 class="header__title">{{ name }}</h1>
    </a>
    <Nav :navItems="this.navItems"></Nav>
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
import nav from "@/components/nav.vue";

@Component
export default class Header extends Vue {
  store = this.$store as any;
  name = this.store.$config.appTitle;

  @Prop() navItems: any;

  mounted() {}

}
</script>

<style lang="scss">
@import "../assets/scss/components/_header";
</style>
