<template>
<div id="app">
  <div class="main__bg"></div>
  <Header ref="headerComponent" :navItems="this.navItems" />
  <main class="main" ref="main">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </main>
  <Footer ref="headerComponent" :navItems="this.navItems" />
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator';
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';

@Component({
  components: {
    Header,
    Footer
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
