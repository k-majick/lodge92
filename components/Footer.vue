<template>
<footer class="footer" ref="footer">
  <div class="container">
    <div class="row">
      <div class="col col-50">
        <a class="material-icons" href="https://www.google.pl/maps/place/Kasztanowa+19,+76-212+Rowy/@54.6526526,17.0487501,17z/" target="_blank">location_on</a>&nbsp;ul. Kasztanowa 19, 76-212 Rowy, {{ $tc('globalPoland') }}
      </div>
      <div class="col col-50 text--right">
        &copy;{{ year }} Cyberleaf Studio
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
