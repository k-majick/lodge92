<template>
<div class="cart">
  <ul class="cart__items">
    <li v-for="cartItem in cartItems" class="cart__item">
      <div class="cart__details">
        <p><b>{{ $tc('statusDate') }}:</b> {{ $dayjs(cartItem.reservationDays[cartItem.reservationDays.length - 1].date).format('D MMMM YYYY') }}<span v-if="cartItem.reservationDays.length > 1"> -
            {{ $dayjs(cartItem.reservationDays[0].date).format('D MMMM YYYY') }}</span></p>
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

@Component
export default class CartItems extends Vue {
  cartItems = this.$store.getters['_cart/reservations'];
  totalPrice = this.$store.getters['_cart/totalPrice'];

  mounted() {
    (this as any).unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === '_cart/reset') {
        this.cartItems = this.$store.getters['_cart/reservations'];
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
