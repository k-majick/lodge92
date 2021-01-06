<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $t('reservation') }}</h2>
    <div class="row">
      <div class="col col-50">
        <h3>{{ $t('reservationDateSelect') }}</h3>
        <CalendarMonth />
      </div>
      <div class="col col-50">
        <h3>{{ $t('reservationRoomPlan') }}</h3>
        <Floors :rooms="rooms" :locale="currentLocale" />
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
import CalendarMonth from "@/components/CalendarMonth.vue";
import Floors from "@/components/Floors.vue";

@Component({
  components: {
    CalendarMonth
  },
})
export default class Reservations extends Vue {
  currentLocale = this.$i18n.locale;
  rooms = [];
  reservations: any = '';

  async asyncData({
    $strapi,
    app
  }: {
    $strapi: any,
    app: any
  }) {
    return {
      currentLocale: app.i18n.locale,
      reservations: await $strapi.find("reservations")
    };
  }

  created() {
    this.rooms = this.reservations.rooms;
  }

}
</script>

<style scoped lang="scss">

</style>
