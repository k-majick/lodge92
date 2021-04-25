<template>
<section class="main__section">
  <div class="container">
    <h2 class="main__title">{{ $tc('about') }}</h2>

  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue
} from 'nuxt-property-decorator';
import Slider from '@/components/Slider.vue';

@Component
export default class About extends Vue {
  private currentLocale = this.$i18n.locale;
  private images = [];

  async asyncData({
    $strapi,
    app
  }: {
    $strapi: any,
    app: any
  }) {

    return {
      currentLocale: app.i18n.locale,
      global: await $strapi.find("global")
    };
  }



}
</script>

<style lang="scss">

</style>
