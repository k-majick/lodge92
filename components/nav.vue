<template>
<nav class="nav" ref="nav">
  <a class="nav__link" v-for="navItem in navItems" :key="navItem.NavItemNames[0].id">{{ navItem.NavItemNames[0][`name_${currentLocale}`] }}</a>
  <nuxt-link v-for="locale in locales" class="nav__link nav__link--lang" :key="locale.code" :to="switchLocalePath(locale.code)">{{ locale.code }}</nuxt-link>
</nav>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Watch,
  Vue,
} from 'nuxt-property-decorator';

@Component
export default class Nav extends Vue {
  currentLocale = this.$i18n.locale;
  langs = ['en', 'pl'];
  // availableLocales = this.$i18n.locales!.filter(i => ( < any > i).code !== this.$i18n.locale);
  locales = this.$i18n.locales;

  @Prop() navItems: any;

  @Watch("$i18n.locale")
  getCurrentLocale() {
    console.dir(this.$i18n.locale);
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_nav";
</style>
