import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from "@/store";
import Reservation from '@/types/Reservation';

@Module({
  dynamic: true,
  name: 'cartModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class CartModule extends VuexModule {
  cart: Array<Reservation> = [];

  @Mutation
  addReservation(selectedReservation: Reservation) {
    this.cart.push(selectedReservation);
  }

  @Mutation
  removeReservation(id: number) {
    this.cart = this.cart.filter(reservation => reservation.id !== id);
  }

  @Mutation
  reset() {
    this.cart = [];
  }

  get reservations(): Array<Reservation> {
    return this.cart;
  }

  get totalPrice(): number {
    let totalPrice = 0;
    this.cart.forEach(reservation => totalPrice += (reservation as any).cost);

    return totalPrice;
  }

}
