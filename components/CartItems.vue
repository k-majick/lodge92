<template>
<div class="cart">
  <ul class="cart__items">
    <li v-for="cartItem in cartItems" class="cart__item">
      <div class="cart__details">
        <p><b>{{ $tc('statusDate') }}:</b> <span class="status__date" v-for="bookingDate in cartItem.bookingDates" v-html="bookingDate"></span></p>
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
import Booking from '@/types/Booking';

@Component
export default class CartItems extends Vue {
  cartItems = this.$store.getters['_cart/bookings'];
  totalPrice = this.$store.getters['_cart/totalPrice'];

  removeCartItem(id: number) {
    const removedBooking = this.$store.getters['_cart/bookings'].find((booking: Booking) => booking.id === id);
    this.$store.commit('_cart/removeBooking', id);
    this.$store.commit('_days/removeFromCart', removedBooking.bookingDays);
  }
}
</script>

<style lang="scss">
@import "../assets/scss/components/_cart";
</style>
