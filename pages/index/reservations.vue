<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('reservation') }}</h2>
    <div class="row">
      <div class="col col-50">
        <h3>{{ $tc('reservationDateSelect') }}</h3>
        <CalendarMonth :bookings="bookings" />
      </div>
      <div class="col col-50">
        <h3>{{ $tc('reservationRoomPlan') }}</h3>
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
  private currentLocale = this.$i18n.locale;
  private rooms = [];
  private bookings: any = '';
  private building: any = '';

  async asyncData({
    $strapi,
    app
  }: {
    $strapi: any,
    app: any
  }) {
    return {
      currentLocale: app.i18n.locale,
      building: await $strapi.find("building"),
      bookings: await $strapi.find("bookings"),
    };
  }

  created() {
    this.rooms = this.building.rooms;
  }

}
</script>

<style lang="scss">

</style>
