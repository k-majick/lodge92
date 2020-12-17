<template>
<nav class="nav" ref="nav">
  <nuxt-link v-for="navItem in navItems" class="nav__link" :key="navItem.id" :to="navItem.NavItemRoutes[0][`route_${currentLocale}`]">{{ navItem.NavItemNames[0][`name_${currentLocale}`] }}</nuxt-link>
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
import NavItem from '@/types/NavItem';

@Component
export default class Nav extends Vue {
  currentLocale = this.$i18n.locale;
  langs = ['en', 'pl'];
  locales = this.$i18n.locales;

  @Prop() navItems: any;

  created() {
    this.navItems.sort((a: NavItem, b: NavItem) => {
      return a.order - b.order;
    });
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_nav";
</style>
