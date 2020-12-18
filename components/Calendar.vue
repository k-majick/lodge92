<template>
<div class="calendar">
  <CalendarDateIndicator :selected-date="selectedDate" />
  <div class="calendar__body">
    <!-- <CalendarWeekdays /> -->
    <ol class="calendar__grid">
      <!-- <CalendarMonthDayItem /> -->
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
} from 'nuxt-property-decorator';
import { default as dayjs } from 'dayjs';
import CalendarDateIndicator from "@/components/CalendarDateIndicator.vue";
import CalendarDateSelector from "@/components/CalendarDateSelector.vue";

@Component
export default class Calendar extends Vue {

  @Provide() selectedDate = dayjs();
  @Provide() today = dayjs().format("YYYY-MM-DD");

  selectDate(newSelectedDate: any) {
    this.selectedDate = newSelectedDate;
  }

  created() {
    console.dir(this.selectedDate);
    // console.dir(this.selectedDate.format("MMMM YYYY"));
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_calendar";
</style>
