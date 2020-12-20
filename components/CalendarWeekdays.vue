<template>
<ol class="calendar__days calendar__days--head">
  <li class="calendar__day" v-for="weekday in weekdays" :key="weekday">
    {{ weekday }}
  </li>
</ol>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'nuxt-property-decorator';

@Component
export default class CalendarWeekdays extends Vue {

  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  get weekdays() {
    return this.WEEKDAYS;
  }

}
</script>
