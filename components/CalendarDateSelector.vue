<template>
<div class="calendar__selector">
  <span class="calendar__btn material-icons" @click="selectPrevious">keyboard_arrow_left</span>
  <span class="calendar__btn" @click="selectCurrent">Today</span>
  <span class="calendar__btn material-icons" @click="selectNext">keyboard_arrow_right</span>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Provide,
} from 'nuxt-property-decorator';
import dayjs from "dayjs";

@Component
export default class Calendar extends Vue {

  @Prop()
  currentDate!: string;

  @Prop()
  selectedDate!: any;

  selectPrevious() {
    let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
    this.$emit("dateSelected", newSelectedDate);
  }

  selectCurrent() {
    let newSelectedDate = dayjs(this.currentDate);
    this.$emit("dateSelected", newSelectedDate);
  }

  selectNext() {
    let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
    this.$emit("dateSelected", newSelectedDate);
  }

  created() {
    console.dir(this.currentDate);
    console.dir(this.selectedDate);
  }

}
</script>
