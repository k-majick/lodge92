<template>
<div v-if="loading" class="main__loader">
  <div class="main__spinner"></div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';

@Component
export default class Loading extends Vue {
  private loading = false;

  start() {
    this.loading = true;
  }

  finish() {
    this.loading = false;
  }

  // fail(error: Error) {
  //   console.log(error)
  // }
  //
  // increase(num: number) {
  //   console.log(num)
  // }

}
</script>
