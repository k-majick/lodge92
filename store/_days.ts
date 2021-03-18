import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from "@/store";
import Day from '@/types/Day';

@Module({
  dynamic: true,
  name: 'bookingsModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class BookingsModule extends VuexModule {
  selectedDays: Array<Day> = [];
  cartDays: Array<Day> = [];

  @Mutation
  addSelected(day: Day) {
    this.selectedDays.push(day);
  }

  @Mutation
  removeSelected(date: string) {
    this.selectedDays = this.selectedDays.filter(day => day.date !== date);
  }

  @Mutation
  selected2cart() {
    this.cartDays.push(...this.selectedDays);
  }

  @Mutation
  removeFromCart(days: Day[]) {
    this.cartDays = this.cartDays.filter((d1: Day) => {
      return !days.some((d2: Day) => {
        return d1.date == d2.date;
      });
    });
  }

  @Mutation
  resetSelected() {
    this.selectedDays = [];
  }

  @Mutation
  resetCartDays() {
    this.cartDays = [];
  }

  get selected(): Array<Day> {
    return this.selectedDays;
  }

  get inCart(): Array<Day> {
    return this.cartDays;
  }

}
