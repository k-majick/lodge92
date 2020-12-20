<template>
<section class="main__section">
  <div class="container">
    <h2>Kontakt</h2>
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue
} from 'nuxt-property-decorator';

@Component
export default class Contact extends Vue {
  currentLocale = this.$i18n.locale;

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

}
</script>

<style scoped lang="scss">

</style>
