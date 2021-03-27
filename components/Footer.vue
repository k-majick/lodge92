<template>
<footer class="footer">
  <div class="footer__container">
    <div class="row">
      <div class="col col-50 text--left">
        <a class="footer__link" href="https://www.google.pl/maps/place/Kasztanowa+19,+76-212+Rowy/@54.6526526,17.0487501,17z/" target="_blank">
          <span class="material-icons">location_on</span>
          ul. Kasztanowa 19, 76-212 Rowy<span v-if="currentLocale !== 'pl'">, {{ $tc('globalPoland') }}</span>
        </a>
      </div>
      <div class="col col-50 text--right">
        <a class="footer__link" href="http://cyberleaf.pl" target="_blank">
          &copy;{{ year }} Cyberleaf Studio
        </a>
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
  private currentLocale = this.$i18n.locale;
  private year = new Date().getFullYear();
}
</script>

<style lang="scss">
@import "../assets/scss/components/_footer";
</style>
