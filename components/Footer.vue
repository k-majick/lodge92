<template>
<footer class="footer" ref="footer">
  <div class="container">
    <div class="row">
      <div class="col col-50">
        &copy;{{ year }} Cyberleaf Studio
      </div>
      <div class="col col-50 text--right">
        ul. Kasztanowa 19, 76-212 Rowy
      </div>
    </div>
  </div>
</footer>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'nuxt-property-decorator';

@Component
export default class Footer extends Vue {
  year = new Date().getFullYear();
}
</script>

<style lang="scss">
@import "../assets/scss/components/_footer";
</style>
