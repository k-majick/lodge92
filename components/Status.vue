<template>
<div class="status container" :class="{ 'status--active': isActive }">
  <div class="status__panel">
    <h3 class="status__title">{{ $tc('statusDateSelected') }}</h3>
    <p><b>{{ $tc('statusDate') }}:</b> <span v-if="sortedSelectedDays.length">{{ $dayjs(sortedSelectedDays[0].date).format('D MMMM YYYY') }}<span v-if="sortedSelectedDays.length > 1"> - {{ $dayjs(sortedSelectedDays[sortedSelectedDays.length - 1].date).format('D MMMM YYYY') }}</span></span>
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
import Reservation from '@/types/Reservation';

@Component
export default class Status extends Vue {
  private currentLocale = this.$i18n.locale;
  private isActive = false;
  private isModalOpen = this.$store.getters['_modals/isLoginModalActive'];
  private isOpenModal = false;
  private totalDays = 0;
  private reservation: Reservation = {
    id: null,
    reservationDays: null,
    totalDays: null,
    cost: null,
  }

  @Prop() price!: number;

  created() {
    this.totalDays = this.$store.getters['_days/selected'].length;
    this.totalDays > 0 ? this.isActive = true : this.isActive = false;

    (this as any).unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === '_days/addSelected' || mutation.type === '_days/removeSelected' || mutation.type === '_days/resetSelected') {
        this.totalDays = this.$store.getters['_days/selected'].length;
        this.totalDays > 0 ? this.isActive = true : this.isActive = false;
      }
    });
  }

  @Watch('sortedSelectedDays')
  setReservation() {
    this.reservation = {
      id: Math.round(Math.random() * 1000),
      reservationDays: this.$store.getters['_days/selected'],
      totalDays: this.totalDays,
      cost: this.totalDays * this.price,
    }
  }

  get sortedSelectedDays() {
    return [...this.$store.getters['_days/selected']].sort((a: Day, b: Day) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  }

  addToCart() {
    this.$store.commit('_cart/addReservation', this.reservation);
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
