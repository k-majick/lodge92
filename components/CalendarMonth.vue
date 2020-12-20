<template>
<div class="calendar">
  <CalendarDateIndicator :selected-date="selectedDate" />
  <div class="calendar__body">
    <CalendarWeekdays />
    <ol class="calendar__days calendar__days--main">
      <CalendarMonthDay v-for="day in allDays" :key="day.date" :day="day" :is-today="day.date === today" :is-current-month="day.isCurrentMonth" :is-selected="day.isSelected" @select="updateSelectedDays" />
    </ol>
  </div>
  <CalendarDateSelector :current-date="today" :selected-date="selectedDate" @dateSelected="selectDate" />
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Provide,
  Watch
} from 'nuxt-property-decorator';
import Day from "@/types/Day";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarDateIndicator from "@/components/CalendarDateIndicator.vue";
import CalendarDateSelector from "@/components/CalendarDateSelector.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import CalendarMonthDay from "@/components/CalendarMonthDay.vue";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component
export default class CalendarMonth extends Vue {

  @Provide() selectedDate = dayjs();
  @Provide() today = dayjs().format("YYYY-MM-DD");

  allDays: Array < Day > = [];
  selectedDays: Array < Day > = [];
  selectedDay: Day = {
    date: '',
    isCurrentMonth: false,
    isSelected: false
  };

  created() {
    this.allDays = [...this.days];
  }

  selectDate(newSelectedDate: any) {
    this.selectedDate = newSelectedDate;
  }

  updateSelectedDays(selectedDay: Day) {
    const index = this.selectedDays.indexOf(selectedDay);
    const allDaysIndex = this.allDays.indexOf(selectedDay);

    if (this.selectedDays.filter(day => day.date === selectedDay.date).length > 0) {
      this.selectedDays = this.selectedDays.filter(day => {
        return day.date !== selectedDay.date;
      });
      this.allDays[allDaysIndex].isSelected = false;
    } else {
      this.selectedDays.push(selectedDay);
      this.allDays[allDaysIndex].isSelected = true;
    }
  }

  getWeekday(date: any) {
    return dayjs(date).weekday();
  }

  @Watch('days')
  updateDays() {
    this.allDays = this.days;

    const result = this.allDays.filter(d1 => {
      if (this.selectedDays.some(d2 => d1.date === d2.date) === true) {
        d1.isSelected = true;
      }
      return this.selectedDays.some(d2 => d1.date === d2.date);
    });
  }

  get days() {
    return [
      ...this.previousMonthDays,
      ...this.currentMonthDays,
      ...this.nextMonthDays
    ];
  }

  get year() {
    return this.selectedDate.format("YYYY");
  }

  get month() {
    return this.selectedDate.format("M");
  }

  get numberOfDaysInMonth() {
    return dayjs(this.selectedDate).daysInMonth();
  }

  get currentMonthDays() {
    return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
      return {
        date: dayjs(`${this.year}-${this.month}-${index + 1}`).format("YYYY-MM-DD"),
        isCurrentMonth: true,
        isSelected: false
      };
    });
  }

  get previousMonthDays() {
    const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);
    const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(1, "month");
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;
    const previousMonthLastMondayDayOfMonth = dayjs(this.currentMonthDays[0].date).subtract(visibleNumberOfDaysFromPreviousMonth, "day").date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
      return {
        date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`).format("YYYY-MM-DD"),
        isCurrentMonth: false,
        isSelected: false
      };
    });
  }

  get nextMonthDays() {
    const lastDayOfTheMonthWeekday = this.getWeekday(`${this.year}-${this.month}-${this.currentMonthDays.length}`);
    const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
        isCurrentMonth: false,
        isSelected: false
      };
    });
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_calendar";
</style>
