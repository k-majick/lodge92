<template>
<div class="cart container" :class="{ 'cart--active': isActive }">
  <div class="cart__panel">
    <h3 class="cart__title">Twoja rezerwacja</h3>
    <p><b>Termin:</b> <span class="cart__date" v-for="bookingDate in bookingDates" v-html="bookingDate"></span></p>
    <p><b>Liczba dni:</b> <span v-html="totalDays"></span></p>
    <p><b>Koszt rezerwacji:</b> <span v-html="totalDays * price + '&nbsp;zł'"></span></p>
    <button class="cart__btn">Zarezerwuj<span class="material-icons">keyboard_arrow_right</span></button>
  </div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'nuxt-property-decorator';
import Day from "@/types/Day";
import dayjs from "dayjs";

@Component
export default class Cart extends Vue {
  isActive = false;
  totalDays = 0;
  bookingDates: string[] = [];

  @Prop() price!: number;

  created() {
    (this as any).unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === '_bookings/addDay' || mutation.type === '_bookings/removeDay') {
        this.totalDays = this.$store.getters['_bookings/daysSelected'].length;
        this.totalDays > 0 ? this.isActive = true : this.isActive = false;

        this.showBookingDates(this.sortedSelectedDays);
      }
    });
  }

  get sortedSelectedDays() {
    return [...this.$store.getters['_bookings/daysSelected']].sort((a: Day, b: Day) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  }

  showBookingDates(days: Day[]) {
    if (days.length == 1) {
      this.bookingDates = [...[dayjs(days[0].date).format('D MMMM YYYY')]];
    } else if (days.length > 1) {
      this.bookingDates = [...[dayjs(days[0].date).format('D MMMM YYYY')], ...[dayjs(days[days.length - 1].date).format('D MMMM YYYY')]];
    }
  }

  beforeDestroy() {
    (this as any).unsubscribe();
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_cart";
</style>
