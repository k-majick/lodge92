<template>
<div id="app">
  <div class="main__bg"></div>
  <NavSide></NavSide>
  <NavMain :global="this.global" />
  <main class="main" :class="{ 'open': isNavOpen, 'mini': isNavMini }">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Status :price="this.price" />
  </main>
  <Footer />
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator';
import NavSide from '@/components/NavSide.vue';
import NavMain from '@/components/NavMain.vue';
import Footer from '@/components/Footer.vue';
import Status from '@/components/Status.vue';
import NavItem from '@/types/NavItem';

@Component({
  components: {
    NavSide,
    NavMain,
    Footer,
    Status,
  },
})
export default class App extends Vue {
  private isActive = false;
  private price = 0;
  private currentLocale = this.$i18n.locale;
  private navItems: NavItem[] = [];
  private isNavOpen = this.$store.getters['_nav/isNavOpen'];
  private isNavMini = this.$store.getters['_nav/isNavMini'];

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
    this.setDaysLocale();
  }

  mounted() {
    if (this.$route.path === '/') this.$router.push({
      path: '/skills'
    });

    this.scrollListen();
    this.$store.commit('_nav/setNavItems', this.navItems);

    const user = this.$strapi.user;
    if (user)
      this.$store.commit('_user/setUser', {
        user
      });

    (this as any).unwatch = this.$store.watch(() => this.$store.getters['_nav/isNavOpen'], isNavOpen => {
      this.isNavOpen = isNavOpen;
    });

    (this as any).unwatch2 = this.$store.watch(() => this.$store.getters['_nav/isNavMini'], isNavMini => {
      this.isNavMini = isNavMini;
    });
  }

  scrollListen() {
    window.addEventListener('scroll', this.scrollHandle);
  }

  scrollHandle() {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  }

  setDaysLocale() {
    const l = this.currentLocale;

    switch (true) {
      case l === 'de':
        this.$dayjs.locale('de');
        break;
      case l === 'en':
        this.$dayjs.locale('en');
        break;
      case l === 'pl':
        this.$dayjs.locale('pl');
        break;
      default:
        break;
    }
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle);
    (this as any).unwatch();
    (this as any).unwatch2();
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
