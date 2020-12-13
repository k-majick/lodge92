<template>
<div v-if="loading" class="main__loader">
<!-- <div class="main__loader"> -->
  <p>Loading...</p>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';

export default class Loading extends Vue {
  private loading = false;

  start() {
    this.loading = true;
  }

  finish() {
    this.loading = false;
  }

}
</script>
