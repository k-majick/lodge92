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

  currentLocale = this.$i18n.locale;

  WEEKDAYS_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  WEEKDAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  WEEKDAYS_PL = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

  get weekdays() {
    const l = this.currentLocale;
    
    switch (true) {
      case l === 'de':
        return this.WEEKDAYS_DE;
        break;
      case l === 'en':
        return this.WEEKDAYS_EN;
        break;
      case l === 'pl':
        return this.WEEKDAYS_PL;
        break;
      default:
        break;
    }
  }

}
</script>
