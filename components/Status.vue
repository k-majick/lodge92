<template>
<div class="status container" :class="{ 'status--active': isActive }">
  <div class="status__panel">
    <h3 class="status__title">{{ $tc('statusDateSelected') }}</h3>
    <p><b>{{ $tc('statusDate') }}:</b> <span class="status__date" v-for="bookingDate in bookingDates">{{ bookingDate }}</span></p>
    <p><b>{{ $tc('statusDaysNumber') }}:</b> {{ totalDays }}</p>
    <p><b>{{ $tc('statusCost') }}:</b> <span v-html="totalDays * price + '&nbsp;zł'"></span></p>
    <button class="status__btn" :class="{ 'status__btn--disabled' : !isActive }" @click="addToCart">{{ $tc('cartAdd') }}<span class="material-icons">add_shopping_cart</span></button>
  </div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch
} from 'nuxt-property-decorator';
import Modal from "@/components/Modal.vue";
import dayjs from "dayjs";
import Day from "@/types/Day";
import Booking from '@/types/Booking';

@Component
export default class Status extends Vue {
  currentLocale = this.$i18n.locale;
  isActive = false;
  isModalOpen = this.$store.getters['_modals/isLoginModalActive'];
  isOpenModal = false;
  bookingDates: string[] = [];
  totalDays = 0;
  booking: Booking = {
    id: null,
    bookingDates: null,
    bookingDays: null,
    totalDays: null,
    cost: null,
  }

  @Prop() price!: number;

  created() {
    this.totalDays = this.$store.getters['_days/selected'].length;
    this.totalDays > 0 ? this.isActive = true : this.isActive = false;
    this.showBookingDates(this.sortedSelectedDays);

    (this as any).unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === '_days/addSelected' || mutation.type === '_days/removeSelected' || mutation.type === '_days/resetSelected') {
        this.totalDays = this.$store.getters['_days/selected'].length;
        this.totalDays > 0 ? this.isActive = true : this.isActive = false;
        this.showBookingDates(this.sortedSelectedDays);
      }
    });
  }

  @Watch('bookingDates')
  setBooking() {
    this.booking = {
      id: Math.round(Math.random() * 1000),
      bookingDates: this.bookingDates,
      bookingDays: this.$store.getters['_days/selected'],
      totalDays: this.totalDays,
      cost: this.totalDays * this.price,
    }
  }

  get sortedSelectedDays() {
    return [...this.$store.getters['_days/selected']].sort((a: Day, b: Day) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  }

  showBookingDates(days: Day[]) {
    if (days.length == 1) {
      this.bookingDates = [...[dayjs(days[0].date).format('D MMMM YYYY')]];
    } else if (days.length > 1) {
      this.bookingDates = [...[dayjs(days[0].date).format('D MMMM YYYY')], ...[dayjs(days[days.length - 1].date).format('D MMMM YYYY')]];
    }
  }

  addToCart() {
    this.$store.commit('_cart/addBooking', this.booking);
    this.$store.commit('_days/selected2cart');
    this.$store.commit('_days/resetSelected');
  }

  beforeDestroy() {
    (this as any).unsubscribe();
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_status";
</style>
