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

  @Mutation
  addDay(selectedDay: Day) {
    this.selectedDays.push(selectedDay);
  }

  @Mutation
  removeDay(date: string) {
    this.selectedDays = this.selectedDays.filter(day => day.date !== date);
  }

  @Mutation
  resetSelected() {
    this.selectedDays = [];
  }

  get daysSelected(): Array<Day> {
    return this.selectedDays;
  }

}
