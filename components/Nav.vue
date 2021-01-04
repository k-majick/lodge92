<template>
<nav class="nav" ref="nav">
  <ul class="nav__items">
    <li class="nav__item" v-for="navItem in navItems">
      <nuxt-link class="nav__link" :key="navItem.id" :to="navItem.NavItemRoutes[0][`route_${currentLocale}`]">{{ navItem.NavItemNames[0][`name_${currentLocale}`] }}</nuxt-link>
    </li>
    <li class="nav__item nav__item--lang" v-for="locale in locales">
      <nuxt-link class="nav__link" :key="locale.code" :to="switchLocalePath(locale.code)">{{ locale.code }}</nuxt-link>
    </li>
    <li class="nav__item nav__item--user" :class="{ 'nav__item--logged': isLogged }">
      <button class="nav__link"></button>
      <ul class="nav__submenu">
        <li class="nav__item" v-if="!isLogged">
          <button class="nav__link" @click.self="toggleModal(1, true)">Login</button>
        </li>
        <li class="nav__item" v-if="!isLogged">
          <nuxt-link class="nav__link" to="/register">Register</nuxt-link>
        </li>
        <li class="nav__item" v-if="isLogged">
          <button class="nav__link" @click="logout">Logout</button>
        </li>
        <li class="nav__item" v-if="isLogged">
          <button class="nav__link" @click="showUser">Profile</button>
        </li>
      </ul>
      <span class="nav__link--status" v-if="isLogged">&check;</span>
    </li>
    <li class="nav__item nav__item--cart" :class="{ 'nav__item--hasItems': hasItems }">
      <button class="nav__link material-icons">shopping_cart</button>
      <div class="nav__submenu nav__submenu--empty" v-if="!hasItems">Twój koszyk jest pusty...</div>
      <div class="nav__submenu nav__submenu--cart" v-if="hasItems">
        <ul class="nav__list">
          <li v-for="cartItem in cartItems" class="nav__list--item">
            <div class="nav__list--details">
              <p><b>Termin:</b> <span class="status__date" v-for="bookingDate in cartItem.bookingDates" v-html="bookingDate"></span></p>
              <p><b>Liczba dni:</b> <span v-html="cartItem.totalDays"></span></p>
            </div>
            <button class="nav__list--remove" type="button" @click="removeCartItem(cartItem.id)">&times;</button>
          </li>
        </ul>
        <span class="nav__submenu--total"><b>Razem:</b> <span v-html="totalPrice"></span>&nbsp;zł</span>
        <button class="nav__submenu--btn" type="submit" ref="submitBtn"><span v-html="this.strings.checkout[`${currentLocale}`]"></span><span class="material-icons">keyboard_arrow_right</span></button>
      </div>
      <span class="nav__link--status" v-if="cartItems.length > 0" v-html="cartItems.length"></span>
    </li>
  </ul>
  <transition name="modal">
    <Modal v-show="openModal(1)" @close="toggleModal(1, true)" :modalType="'login'" ref="loginForm">
      <h3 slot="header" class="modal__title" v-html="'Login'"></h3>
      <div slot="content" class="modal__content">
        <div class="row">
          <div class="col col-50">
            <h4 class="modal__subtitle" v-html="this.strings.accountHave[`${currentLocale}`]"></h4>
            <LoginForm @login="login" :global="this.global"></LoginForm>
          </div>
          <div class="col col-50">
            <h4 class="modal__subtitle" v-html="this.strings.accountNo[`${currentLocale}`]"></h4>
            <p v-html="this.global.loginModal[0][`content_${currentLocale}`]"></p>
            <button class="modal__btn" type="submit" ref="submitBtn" v-html="this.strings.register[`${currentLocale}`]"></button>
          </div>
        </div>
      </div>
    </Modal>
  </transition>
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
import Modal from "@/components/Modal.vue";
import LoginForm from "@/components/LoginForm.vue";
import ToggleModalMxn from "@/mixins/toggleModalMxn";
import {
  mapMutations
} from 'vuex';
import {
  STRINGS
} from '@/assets/data/i18n.js';
import Booking from '@/types/Booking';

@Component({
  mixins: [ToggleModalMxn]
})
export default class Nav extends Vue {
  public currentLocale = this.$i18n.locale;
  public activeModal = 0;
  public strings = STRINGS;
  private locales = this.$i18n.locales;
  private isLogged = this.$store.getters['_user/isLogged'];
  private hasItems = false;
  private isOpenModal = false;
  private alert = '';
  private cartItems = this.$store.getters['_cart/bookings'];
  private totalPrice = this.$store.getters['_cart/totalPrice'];

  @Prop() navItems: any;
  @Prop() global: any;

  created() {
    this.navItems.sort((a: NavItem, b: NavItem) => {
      return a.order - b.order;
    });
  }

  mounted() {
    this.$store.watch(() => this.$store.getters['_user/isLogged'], isLogged => {
      this.isLogged = isLogged;
    });

    this.$store.watch(() => this.$store.getters['_cart/bookings'], bookings => {
      this.cartItems = bookings;
      this.cartItems.length > 0 ? this.hasItems = true : this.hasItems = false;
    });

    this.$store.watch(() => this.$store.getters['_cart/totalPrice'], totalPrice => {
      this.totalPrice = totalPrice;
    });
  }

  async asyncData({
    $strapi,
    app
  }: {
    $strapi: any,
    app: any
  }) {

    return {
      currentLocale: app.i18n.locale,
      global: await $strapi.find("global")
    };
  }

  showUser() {
    console.dir('isLogged: ' + this.$store.getters['_user/isLogged']);
    console.dir(this.$store.getters['_user/loggedUser']);
  }

  async login(creds: any) {
    try {
      await (this as any).$auth.loginWith('local', {
        data: creds
      });
    } catch (e) {
      this.alert = e.response.data.message[0].messages[0].message;
      console.dir(e.response.data.message[0].messages[0].message);
    }
  }

  async logout() {
    await (this as any).$auth.logout();
  }

  removeCartItem(id: number) {
    this.$store.commit('_cart/removeBooking', id);
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_nav";
@import "../assets/scss/components/_modal";
</style>
