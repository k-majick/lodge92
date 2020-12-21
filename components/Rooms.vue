<template>
<div class="rooms main__panel">
  <div class="rooms__floor" v-html="floor_0"></div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'nuxt-property-decorator';
import rawFloor_0 from '@/assets/gfx/floor-0.svg?raw';
import rawFloor_1 from '@/assets/gfx/floor-1.svg?raw';

@Component
export default class Rooms extends Vue {
  private floor_0 = rawFloor_0;
  private floor_1 = rawFloor_1;

  created() {
    console.dir(this)
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_rooms";
</style>
