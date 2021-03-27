<template>
<div class="status" :class="{ 'open': isNavOpen, 'mini': isNavMini,'status--active': isActive }">
  <div class="status__panel">
    <div class="container">
      <div class="row">
        <div class="col col-50">
          <h3 class="status__title">{{ $tc('statusDateSelected') }}</h3>
          <p><b>{{ $tc('statusDate') }}:</b>
            <span v-if="reservation.reservationDays.length">
              <span v-if="currentLocale === 'en'">{{ $dayjs(reservation.reservationDays[0].date).format('MMMM D, YYYY') }}</span>
              <span v-else>{{ $dayjs(reservation.reservationDays[0].date).format('D MMMM YYYY') }} <span v-if="currentLocale === 'pl'">r.</span></span>
              <span v-if="reservation.reservationDays.length > 1"> &rarr;
                <span v-if="currentLocale === 'en'">{{ $dayjs(reservation.reservationDays[reservation.reservationDays.length - 1].date).format('MMMM D, YYYY') }}</span>
                <span v-else>{{ $dayjs(reservation.reservationDays[reservation.reservationDays.length - 1].date).format('D MMMM YYYY') }} <span v-if="currentLocale === 'pl'">r.</span></span>
              </span>
            </span>
          <p><b>{{ $tc('statusDaysNumber') }}:</b> {{ totalDays }}</p>
          <p><b>{{ $tc('statusCost') }}:</b> <span v-html="totalDays * price + '&nbsp;zł'"></span></p>
        </div>
        <div class="col col-50 status__action">
          <button class="status__btn" :class="{ 'status__btn--disabled' : !isActive }" @click="addToCart">{{ $tc('cartAdd') }}<span class="material-icons">add_shopping_cart</span></button>
        </div>
      </div>
    </div>
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
import Day from "@/types/Day";
import Reservation from '@/types/Reservation';

@Component
export default class Status extends Vue {
  private currentLocale = this.$i18n.locale;
  private isActive = false;
  private isModalOpen = this.$store.getters['_modals/isLoginModalActive'];
  private isOpenModal = false;
  private isNavOpen = this.$store.getters['_nav/isNavOpen'];
  private isNavMini = this.$store.getters['_nav/isNavMini'];
  private totalDays = 0;
  private reservation: Reservation = {
    id: null,
    reservationDays: [],
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

  mounted() {
    (this as any).unwatch = this.$store.watch(() => this.$store.getters['_nav/isNavOpen'], isNavOpen => {
      this.isNavOpen = isNavOpen;
    });

    (this as any).unwatch2 = this.$store.watch(() => this.$store.getters['_nav/isNavMini'], isNavMini => {
      this.isNavMini = isNavMini;
    });
  }

  @Watch('sortedSelectedDays')
  setReservation() {
    this.reservation = {
      id: Math.round(Math.random() * 1000),
      reservationDays: this.sortedSelectedDays,
      totalDays: this.totalDays,
      cost: this.totalDays * this.price,
    }
  }

  get sortedSelectedDays() {
    return [...this.$store.getters['_days/selected']].sort((a: Day, b: Day) => (this.$dayjs(a.date).isAfter(this.$dayjs(b.date)) ? 1 : -1));
  }

  addToCart() {
    this.$store.commit('_cart/addReservation', this.reservation);
    this.$store.commit('_days/selected2cart');
    this.$store.commit('_days/resetSelected');
  }

  beforeDestroy() {
    (this as any).unsubscribe();
    (this as any).unwatch();
    (this as any).unwatch2();
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_status";
</style>
