<template>
<div>
  <nav class="nav nav--main" :class="{ 'open': isNavOpen, 'mini': isNavMini }">
    <div class="nav__bg"></div>
    <button class="nav__button material-icons" @click="toggleNavOpen">
      <span v-if="isNavOpen">menu_open</span>
      <span v-else>menu</span>
    </button>
    <button class="nav__button material-icons" @click="toggleNavMini">
      <span v-if="isNavMini">chevron_right</span>
      <span v-else>chevron_left</span>
    </button>

    <div class="nav__spacer"></div>

    <ul class="nav__items">
      <li class="nav__item nav__item--lang" v-for="locale in this.$i18n.locales">
        <nuxt-link class="nav__link" :key="locale.code" :to="switchLocalePath(locale.code)">{{ locale.code }}</nuxt-link>
      </li>
      <li class="nav__item nav__item--cart" :class="{ 'nav__item--hasItems': hasItems }">
        <button class="nav__link material-icons" v-if="!hasItems">shopping_cart</button>
        <button class="nav__link material-icons" v-if="hasItems && !isLogged" @click.self="toggleModal(1, true)">shopping_cart</button>
        <nuxt-link class="nav__link material-icons" :to="localePath('index-checkout')" v-if="hasItems && isLogged">shopping_cart</nuxt-link>
        <div class="nav__submenu nav__submenu--empty" v-if="!hasItems">{{ $tc('cartEmpty') }}</div>
        <div class="nav__submenu nav__submenu--cart" v-if="hasItems">
          <CartItems />
          <button class="nav__submenu--btn" type="submit" v-if="!isLogged" @click.self="toggleModal(1, true)">{{ $tc('checkoutGo') }}<span class="material-icons">keyboard_arrow_right</span></button>
          <nuxt-link class="nav__submenu--btn" type="submit" v-if="isLogged" :to="localePath('index-checkout')">{{ $tc('checkoutGo') }}<span class="material-icons">keyboard_arrow_right</span></nuxt-link>
        </div>
        <span class="nav__link--status" v-if="cartItems.length > 0" v-html="cartItems.length"></span>
      </li>
      <li class="nav__item nav__item--user" :class="{ 'nav__item--logged': isLogged }">
        <button class="nav__link material-icons" v-if="!isLogged">account_circle</button>
        <nuxt-link class="nav__link material-icons" v-if="isLogged" :to="localePath('index-account')">account_circle</nuxt-link>
        <ul class="nav__submenu">
          <li class="nav__item" v-if="!isLogged">
            <button class="nav__link" @click.self="toggleModal(1, true)">{{ $tc('userLogging') }}</button>
          </li>
          <li class="nav__item" v-if="!isLogged">
            <nuxt-link class="nav__link" :to="localePath('index-register')">{{ $tc('userRegistration') }}</nuxt-link>
          </li>
          <li class="nav__item" v-if="isLogged">
            <nuxt-link class="nav__link" v-if="isLogged" :to="localePath('index-account')">{{ $tc('userAccount') }}</nuxt-link>
          </li>
          <li class="nav__item" v-if="isLogged">
            <button class="nav__link" @click="logout">{{ $tc('userLogOut') }}</button>
          </li>
        </ul>
        <span class="nav__link--status" v-if="isLogged">&check;</span>
      </li>
    </ul>
  </nav>

  <transition name="modal">
    <Modal v-show="openModal(1)" @close="toggleModal(1, true)" :modalType="'login'">
      <h3 slot="header" class="modal__title">{{ $tc('userLoginTitle') }}</h3>
      <div slot="content" class="modal__content">
        <div class="row">
          <div class="col col-50">
            <h4 class="modal__subtitle" v-html="$tc('accountHave')"></h4>
            <FormLogin @goto="goto" @closeModal="toggleModal(1, true)" :global="this.global" ref="loginForm" />
          </div>
          <div class="col col-50">
            <h4 class="modal__subtitle">{{ $tc('accountHaveNo') }}</h4>
            <p v-html="this.global.loginModal[0][`content_${currentLocale}`]"></p>
            <button class="modal__btn" @click="goto(localePath('index-register'))">{{ $tc('userRegistration') }}</button>
          </div>
        </div>
      </div>
    </Modal>
  </transition>

</div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'nuxt-property-decorator';
import FormLogin from '@/components/FormLogin.vue';
import Modal from "@/components/Modal.vue";
import ToggleModalMxn from "@/mixins/toggleModalMxn";

@Component({
  components: {
    Modal
  },
  mixins: [ToggleModalMxn]
})
export default class NavMain extends Vue {
  public activeModal = 0;
  private currentLocale = this.$i18n.locale;
  private isLogged = this.$store.getters['_user/isLogged'];
  private hasItems = false;
  private isOpenModal = false;
  private isOk = true;
  private cartItems = this.$store.getters['_cart/reservations'];
  private totalPrice = this.$store.getters['_cart/totalPrice'];
  private isNavOpen = this.$store.getters['_nav/isNavOpen'];
  private isNavMini = this.$store.getters['_nav/isNavMini'];

  @Prop() global: any;

  created() {
    if (this.cartItems.length > 0)
      this.hasItems = true;
  }

  mounted() {
    (this as any).unwatch = this.$store.watch(() => this.$store.getters['_user/isLogged'], isLogged => {
      this.isLogged = isLogged;
    });

    (this as any).unwatch2 = this.$store.watch(() => this.$store.getters['_cart/reservations'], reservations => {
      this.cartItems = reservations;
      this.cartItems.length > 0 ? this.hasItems = true : this.hasItems = false;
    });

    (this as any).unwatch3 = this.$store.watch(() => this.$store.getters['_cart/totalPrice'], totalPrice => {
      this.totalPrice = totalPrice;
    });

    (this as any).unwatch4 = this.$store.watch(() => this.$store.getters['_nav/isNavOpen'], isNavOpen => {
      this.isNavOpen = isNavOpen;
    });

    (this as any).unwatch5 = this.$store.watch(() => this.$store.getters['_nav/isNavMini'], isNavMini => {
      this.isNavMini = isNavMini;
    });
  }

  goto(path: string) {
    this.$router.push({
      path: path
    });

    this.toggleModal(1, true);
  }

  async logout() {
    (this.$refs.loginForm as any).logout();
  }

  toggleNavOpen() {
    this.$store.commit('_nav/toggleNavOpen');
  }

  toggleNavMini() {
    this.$store.commit('_nav/toggleNavMini');
  }

  beforeDestroy() {
    (this as any).unwatch();
    (this as any).unwatch2();
    (this as any).unwatch3();
    (this as any).unwatch4();
    (this as any).unwatch5();
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_nav";
@import "../assets/scss/components/_modal";
</style>
