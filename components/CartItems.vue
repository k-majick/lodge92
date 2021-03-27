<template>
<div class="cart">
  <ul class="cart__items">
    <li v-for="cartItem in cartItems" class="cart__item">
      <div class="cart__details">
        <p><b>{{ $tc('statusDate') }}:</b>
          <span class="cart__date" v-if="currentLocale === 'en'">{{ $dayjs(cartItem.reservationDays[0].date).format('MMMM D, YYYY') }}</span>
          <span class="cart__date" v-else>{{ $dayjs(cartItem.reservationDays[0].date).format('D MMMM YYYY') }} <span v-if="currentLocale === 'pl'">r.</span></span>
          <span v-if="cartItem.reservationDays.length > 1"> &rarr;
            <span class="cart__date" v-if="currentLocale === 'en'">{{ $dayjs(cartItem.reservationDays[cartItem.reservationDays.length - 1].date).format('MMMM D, YYYY') }}</span>
            <span class="cart__date" v-else>{{ $dayjs(cartItem.reservationDays[cartItem.reservationDays.length - 1].date).format('D MMMM YYYY') }} <span v-if="currentLocale === 'pl'">r.</span></span>
          </span>
        </p>
        <p><b>{{ $tc('statusDaysNumber') }}:</b> <span v-html="cartItem.totalDays"></span></p>
      </div>
      <button class="cart__btn cart__btn--remove" type="button" @click="removeCartItem(cartItem.id)"></button>
    </li>
  </ul>
  <span class="cart__total"><b>{{ $tc('checkoutTotal') }}:</b> <span v-html="totalPrice"></span>&nbsp;zł</span>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'nuxt-property-decorator';
import Reservation from '@/types/Reservation';
import Day from "@/types/Day";

@Component
export default class CartItems extends Vue {
  private currentLocale = this.$i18n.locale;
  private cartItems = this.$store.getters['_cart/reservations'];
  private totalPrice = this.$store.getters['_cart/totalPrice'];

  mounted() {
    (this as any).unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === '_cart/reset' || mutation.type === '_cart/removeReservation') {
        this.cartItems = this.$store.getters['_cart/reservations'];
        this.totalPrice = this.$store.getters['_cart/totalPrice'];
      }
    });
  }

  removeCartItem(id: number) {
    const removedReservation = this.$store.getters['_cart/reservations'].find((reservation: Reservation) => reservation.id === id);
    this.$store.commit('_cart/removeReservation', id);
    this.$store.commit('_days/removeFromCart', removedReservation.reservationDays);
  }

  beforeDestroy() {
    (this as any).unsubscribe();
  }
}
</script>

<style lang="scss">
@import "../assets/scss/components/_cart";
</style>
