<template>
<section class="main__section main__section--start">
  <div class="container">
    <div class="main__logo" v-html="logo"></div>
    <h2 class="main__title">{{ start.hero[`title_${currentLocale}`] }}</h2>
    <div class="main__buttons">
      <nuxt-link v-for="navItem in navButtons" class="main__button main__button--icon" :class="`main__button--${navItem.NavButtonClassName}`" :key="navItem.id" :to="navItem.NavButtonRoutes[0][`route_${currentLocale}`]">{{ navItem.NavButtonNames[0][`name_${currentLocale}`] }}</nuxt-link>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue
} from 'nuxt-property-decorator';
import rawLogo from '@/assets/gfx/lodge92-logo.svg?raw';

@Component
export default class Start extends Vue {
  currentLocale = this.$i18n.locale;
  logo = rawLogo;
  navButtons = [];

  async asyncData({
    $strapi,
    app
  }: {
    $strapi: any,
    app: any
  }) {

    return {
      start: await $strapi.find("start"),
      currentLocale: app.i18n.locale
    };
  }

  created() {
    this.navButtons = (this as any).start.NavButtons;
  }

}
</script>

<style scoped lang="scss">

</style>
