<template>
<section class="main__section">
  <h2>Kontakt</h2>
</section>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue
} from 'nuxt-property-decorator';

@Component
export default class Start extends Vue {
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

  // @Watch("$i18n.locale")
  // getCurrentLocale() {
  //   console.dir(this.$i18n.locale);
  // }

  // mounted() {
  //   console.dir(this)
  // }

}
</script>

<style scoped lang="scss">

</style>
