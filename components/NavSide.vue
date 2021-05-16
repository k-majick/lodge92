<template>
<nav class="nav nav--side" :class="{ 'open': isNavOpen, 'mini': isNavMini }">
  <a class="nav__logo">
    <h1 class="nav__title">{{ name }}</h1>
  </a>
  <ul class="nav__items">
    <li class="nav__item" v-for="navItem in navItems">
      <nuxt-link class="nav__link" :key="navItem.id" :to="localePath(`${navItem.route}`)">
        <span class="nav__icon material-icons">{{ navItem.icon }}</span>
        {{ navItem.names[0][`name_${currentLocale}`] }}
      </nuxt-link>
    </li>
  </ul>
</nav>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'nuxt-property-decorator';
import NavItem from '@/types/NavItem';

@Component
export default class NavSide extends Vue {
  private currentLocale = this.$i18n.locale;
  private name = (this.$store as any).$config.appTitle;
  private navItems: NavItem[] = [...this.$store.getters['_nav/sortedNavItems']];
  private isNavOpen = this.$store.getters['_nav/isNavOpen'];
  private isNavMini = this.$store.getters['_nav/isNavMini'];

  mounted() {
    (this as any).unwatch = this.$store.watch(() => this.$store.getters['_nav/sortedNavItems'], navItems => {
      this.navItems = navItems;
    });

    (this as any).unwatch2 = this.$store.watch(() => this.$store.getters['_nav/isNavOpen'], isNavOpen => {
      this.isNavOpen = isNavOpen;
    });

    (this as any).unwatch3 = this.$store.watch(() => this.$store.getters['_nav/isNavMini'], isNavMini => {
      this.isNavMini = isNavMini;
    });
  }

  created() {
    this.navItems.sort((a: NavItem, b: NavItem) => {
      return a.order - b.order;
    });
  }

  beforeDestroy() {
    (this as any).unwatch();
    (this as any).unwatch2();
    (this as any).unwatch3();
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/_nav";
</style>
