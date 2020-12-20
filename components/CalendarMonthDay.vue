<template>
<li class="calendar__day" :class="{ 'calendar__day--not-current': !isCurrentMonth, 'calendar__day--today': isToday }">
  <span>{{ label }}</span>
</li>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'nuxt-property-decorator';
import dayjs from "dayjs";

@Component
export default class CalendaMonthDay extends Vue {

  @Prop()
  day!: any;

  @Prop()
  isToday!: boolean;

  @Prop()
  isCurrentMonth!: boolean;

  get label() {
    return dayjs(this.day.date).format("D");
  }

}
</script>
