import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from "@/store";
import Booking from '@/types/Booking';

@Module({
  dynamic: true,
  name: 'cartModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class CartModule extends VuexModule {
  cart: Array<Booking> = [];

  @Mutation
  addBooking(selectedBooking: Booking) {
    this.cart.push(selectedBooking);
  }

  @Mutation
  removeBooking(id: number) {
    this.cart = this.cart.filter(booking => booking.id !== id);
  }

  get bookings(): Array<Booking> {
    return this.cart;
  }

  get totalPrice(): number {
    let totalPrice = 0;
    this.cart.forEach(booking => totalPrice += (booking as any).cost);

    return totalPrice;
  }

}
