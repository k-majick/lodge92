<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('contact') }}</h2>
    <FormContact />
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue
} from 'nuxt-property-decorator';
import FormContact from '@/components/FormContact.vue';

@Component
export default class Contact extends Vue {
  private currentLocale = this.$i18n.locale;

  async asyncData({
    $strapi,
    app
  }: {
    $strapi: any,
    app: any
  }) {

    return {
      currentLocale: app.i18n.locale,

    };
  }

}
</script>

<style lang="scss">

</style>
