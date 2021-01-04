<template>
<div class="status container" :class="{ 'status--active': isActive }">
  <div class="status__panel">
    <h3 class="status__title">Twoja rezerwacja</h3>
    <p><b>Termin:</b> <span class="status__date" v-for="bookingDate in bookingDates" v-html="bookingDate"></span></p>
    <p><b>Liczba dni:</b> <span v-html="totalDays"></span></p>
    <p><b>Koszt rezerwacji:</b> <span v-html="totalDays * price + '&nbsp;zł'"></span></p>
    <button class="status__btn" @click="addToCart"><span v-html="this.strings.add2cart[`${currentLocale}`]"></span><span class="material-icons">add_shopping_cart</span></button>
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
import {
  STRINGS
} from '@/assets/data/i18n.js';

@Component
export default class Status extends Vue {
  @Prop() price!: number;

  public currentLocale = this.$i18n.locale;
  public strings = STRINGS;
  private isActive = false;
  private isLogged = this.$store.getters['_user/isLogged'];
  private isModalOpen = this.$store.getters['_modals/isLoginModalActive'];
  private isOpenModal = false;
  private bookingDates: string[] = [];
  private totalDays = 0;
  private booking: Booking = {
    id: null,
    bookingDates: null,
    totalDays: null,
    cost: null,
  }

  created() {
    (this as any).unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === '_days/addDay' || mutation.type === '_days/removeDay') {
        this.totalDays = this.$store.getters['_days/daysSelected'].length;
        this.totalDays > 0 ? this.isActive = true : this.isActive = false;

        this.showBookingDates(this.sortedSelectedDays);
      }
    });
  }

  mounted() {
    (this as any).unwatch = this.$store.watch(() =>
      this.$store.getters['_user/isLogged'], isLogged => {
        this.isLogged = isLogged;
      }
    );
  }

  @Watch('bookingDates')
  setBooking() {
    this.booking = {
      id: Math.round(Math.random() * 1000),
      bookingDates: this.bookingDates,
      totalDays: this.totalDays,
      cost: this.totalDays * this.price,
    }
  }

  get sortedSelectedDays() {
    return [...this.$store.getters['_days/daysSelected']].sort((a: Day, b: Day) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
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
    this.$store.commit('_days/resetSelected', this.booking);
  }

  beforeDestroy() {
    (this as any).unsubscribe();
    (this as any).unwatch();
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_status";
</style>
