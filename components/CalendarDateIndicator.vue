<template>
<div class="calendar__indicator">
  {{ selectedMonth }}
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'nuxt-property-decorator';

@Component
export default class Calendar extends Vue {
  @Prop() selectedDate!: any;

  get selectedMonth() {
    return this.selectedDate.format("MMMM YYYY");
  }

}
</script>

<style lang="scss">

</style>
