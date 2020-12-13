<template>
<div id="app">
  <Header ref="headerComponent" :navItems="this.navItems" />
  <main class="main" ref="main">
    <div class="main__container">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator';
import Header from '@/components/header.vue';

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {
  private isActive = false;

  async asyncData({
    $strapi
  }: {
    $strapi: any
  }) {

    return {
      navItems: await $strapi.find("nav-items")
    };
  }

  scrollListen() {
    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });
  }

  created() {
    // console.dir((this as any).navItems)
  }

}
</script>

<style lang="scss">
@import "./assets/scss/_main";
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 0.5s ease-out;
}
</style>
