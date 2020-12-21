<template>
<li class="calendar__day" :class="{ 'calendar__day--not-current': !isCurrentMonth, 'calendar__day--today': isToday, 'calendar__day--selected': isSelected, 'calendar__day--disabled': isDisabled, 'calendar__day--blocked': isBlocked }" @click="selectDay">
  <span>{{ label }}</span>
</li>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'nuxt-property-decorator';
import dayjs from "dayjs";
import Day from "@/types/Day"

@Component
export default class CalendarMonthDay extends Vue {
  @Prop() day!: Day;
  @Prop() isToday!: boolean;
  @Prop() isCurrentMonth!: boolean;
  @Prop() isSelected!: boolean;
  @Prop() isDisabled!: boolean;
  @Prop() isBlocked!: boolean;

  get label() {
    return dayjs(this.day.date).format("D");
  }

  selectDay() {
    this.$emit('select', this.day);
  }

}
</script>
