<template>
<section class="main__section main__section--start">
  <div class="container">
    <div class="main__logo" v-html="logo"></div>
    <h2 class="main__title">{{ start.hero[`title_${currentLocale}`] }}</h2>
    <div class="main__btns">
      <nuxt-link v-for="btn in navButtons" class="main__btn main__btn--icon" :class="`main__btn--${btn.className}`" :key="btn.id" :to="localePath(`${btn.route}`)">{{ btn.names[0][`name_${currentLocale}`] }}</nuxt-link>
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
  private currentLocale = this.$i18n.locale;
  private logo = rawLogo;
  private navButtons = [];

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

<style lang="scss">

</style>
