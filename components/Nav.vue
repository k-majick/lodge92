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
          <button class="nav__link" @click.self="toggleModal(1, true)">{{ $t('userLogging') }}</button>
        </li>
        <li class="nav__item" v-if="!isLogged">
          <nuxt-link class="nav__link" :to="$t('userRegisterPath')">{{ $t('userRegistration') }}</nuxt-link>
        </li>
        <li class="nav__item" v-if="isLogged">
          <button class="nav__link" @click="showUser">{{ $t('userAccount') }}</button>
        </li>
        <li class="nav__item" v-if="isLogged">
          <button class="nav__link" @click="logout">{{ $t('userLogOut') }}</button>
        </li>
      </ul>
      <span class="nav__link--status" v-if="isLogged">&check;</span>
    </li>
    <li class="nav__item nav__item--cart" :class="{ 'nav__item--hasItems': hasItems }">
      <button class="nav__link material-icons" v-if="!hasItems">shopping_cart</button>
      <button class="nav__link material-icons" v-if="hasItems && !isLogged" @click.self="toggleModal(1, true)">shopping_cart</button>
      <nuxt-link class="nav__link material-icons" :to="$t('checkoutPath')" v-if="hasItems && isLogged">shopping_cart</nuxt-link>
      <div class="nav__submenu nav__submenu--empty" v-if="!hasItems">{{ $t('cartEmpty') }}</div>
      <div class="nav__submenu nav__submenu--cart" v-if="hasItems">
        <ul class="nav__list">
          <li v-for="cartItem in cartItems" class="nav__list--item">
            <div class="nav__list--details">
              <p><b>{{ $t('statusDate') }}:</b> <span class="status__date" v-for="bookingDate in cartItem.bookingDates" v-html="bookingDate"></span></p>
              <p><b>{{ $t('statusDaysNumber') }}:</b> <span v-html="cartItem.totalDays"></span></p>
            </div>
            <button class="nav__list--remove" type="button" @click="removeCartItem(cartItem.id)">&times;</button>
          </li>
        </ul>
        <span class="nav__submenu--total"><b>{{ $t('checkoutTotal') }}:</b> <span v-html="totalPrice"></span>&nbsp;zł</span>
        <button class="nav__submenu--btn" type="submit" v-if="!isLogged" @click.self="toggleModal(1, true)">{{ $t('checkoutGo') }}<span class="material-icons">keyboard_arrow_right</span></button>
        <nuxt-link class="nav__submenu--btn" type="submit" v-if="isLogged" :to="$t('checkoutPath')">{{ $t('checkoutGo') }}<span class="material-icons">keyboard_arrow_right</span></nuxt-link>
      </div>
      <span class="nav__link--status" v-if="cartItems.length > 0" v-html="cartItems.length"></span>
    </li>
  </ul>
  <transition name="modal">
    <Modal v-show="openModal(1)" @close="toggleModal(1, true)" :modalType="'login'" ref="loginForm">
      <h3 slot="header" class="modal__title">{{ $t('userLoginTitle') }}</h3>
      <div slot="content" class="modal__content">
        <div class="row">
          <div class="col col-50">
            <h4 class="modal__subtitle" v-html="$t('accountHave')"></h4>
            <LoginForm @login="login" :global="this.global" :alert="this.alert"></LoginForm>
          </div>
          <div class="col col-50">
            <h4 class="modal__subtitle">{{ $t('accountHaveNo') }}</h4>
            <p v-html="this.global.loginModal[0][`content_${currentLocale}`]"></p>
            <button class="modal__btn" type="submit" ref="submitBtn">{{ $t('userRegister') }}</button>
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
import Booking from '@/types/Booking';

@Component({
  mixins: [ToggleModalMxn]
})
export default class Nav extends Vue {
  public currentLocale = this.$i18n.locale;
  public activeModal = 0;
  private locales = this.$i18n.locales;
  private isLogged = this.$store.getters['_user/isLogged'];
  private hasItems = false;
  private isOpenModal = false;
  private alert = '';
  private cartItems = this.$store.getters['_cart/bookings'];
  private totalPrice = this.$store.getters['_cart/totalPrice'];

  @Prop() navItems: any;
  @Prop() global: any;

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

  created() {
    this.navItems.sort((a: NavItem, b: NavItem) => {
      return a.order - b.order;
    });

    if (this.cartItems.length > 0)
      this.hasItems = true;
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

  showUser() {
    console.dir('isLogged: ' + this.$store.getters['_user/isLogged']);
    console.dir(this.$store.getters['_user/loggedUser']);
  }

  async login(creds: any) {
    try {
      await (this as any).$auth.loginWith('local', {
        data: creds
      });

      if (this.alert !== '')
        this.alert = '';

    } catch (e) {

      console.dir(e.response.data.message[0].messages[0].id);
      console.dir(e.response.data.message[0].messages[0]);

      switch (true) {
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.email.provide':
          this.alert = this.$t('userEmailProvide') as string;
          break;
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.password.provide':
          this.alert = this.$t('userPasswordProvide') as string;
          break;
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.invalid':
          this.alert = this.$t('userCredsInvalid') as string;
          break;
        default:
          this.alert = this.$t('userErrorOther') as string;
      }
    }
  }

  async logout() {
    await (this as any).$auth.logout();
  }

  removeCartItem(id: number) {
    const removedBooking = this.$store.getters['_cart/bookings'].find((booking: Booking) => booking.id === id);
    this.$store.commit('_cart/removeBooking', id);
    this.$store.commit('_days/removeFromCart', removedBooking.bookingDays);
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_nav";
@import "../assets/scss/components/_modal";
</style>
