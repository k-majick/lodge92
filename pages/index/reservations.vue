<template>
<section class="main__section">
  <div class="container">
    <h2>Reservations</h2>
    <div class="row">
      <div class="col col-50">
        <h3>Wybierz termin</h3>

        <Calendar />

      </div>
      <div class="col col-50">
        <h3>Wybierz pokoje</h3>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue
} from "nuxt-property-decorator";
import Calendar from "@/components/Calendar.vue";

@Component({
  components: {
    Calendar
  },
})
export default class Reservations extends Vue {
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
