import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from "@/store";
import Day from '@/types/Day';

@Module({
  dynamic: true,
  name: 'bookingsModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class PageModule extends VuexModule {
  selectedDays: Array<Day> = [];

  @Mutation
  addDay(selectedDay: Day) {
    this.selectedDays.push(selectedDay);
  }

  @Mutation
  removeDay(date: string) {
    this.selectedDays = this.selectedDays.filter(day => {
      return day.date !== date;
    });
  }

  get daysSelected(): Array<Day> {
    return this.selectedDays;
  }

}
