<template>
<div id="app">
  <div class="main__bg"></div>
  <Header :navItems="this.navItems" :global="this.global"/>
  <main class="main" ref="main">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Status :price="this.price"/>
  </main>
  <Footer />
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Status from '@/components/Status.vue';

@Component({
  components: {
    Header,
    Footer,
    Status
  }
})
export default class App extends Vue {
  private isActive = false;
  public price = 0;

  async asyncData({
    $strapi
  }: {
    $strapi: any
  }) {
    return {
      navItems: await $strapi.find("nav-items"),
      global: await $strapi.find("global")
    };
  }

  created() {
    this.price = (this as any).global.price;
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
