<template>
<nav class="nav" ref="nav">
  <ul class="nav__items">
    <li class="nav__item" v-for="navItem in navItems">
      <nuxt-link class="nav__link" :key="navItem.id" :to="navItem.NavItemRoutes[0][`route_${currentLocale}`]">{{ navItem.NavItemNames[0][`name_${currentLocale}`] }}</nuxt-link>
    </li>
    <li class="nav__item nav__item--lang" v-for="locale in this.$i18n.locales">
      <nuxt-link class="nav__link" :key="locale.code" :to="switchLocalePath(locale.code)">{{ locale.code }}</nuxt-link>
    </li>
    <li class="nav__item nav__item--user" :class="{ 'nav__item--logged': isLogged }">
      <button class="nav__link material-icons" v-if="!isLogged">account_circle</button>
      <nuxt-link class="nav__link material-icons" v-if="isLogged" :to="$tc('userAccountPath')">account_circle</nuxt-link>
      <ul class="nav__submenu">
        <li class="nav__item" v-if="!isLogged">
          <button class="nav__link" @click.self="toggleModal(1, true)">{{ $tc('userLogging') }}</button>
        </li>
        <li class="nav__item" v-if="!isLogged">
          <nuxt-link class="nav__link" :to="$tc('userRegisterPath')">{{ $tc('userRegistration') }}</nuxt-link>
        </li>
        <li class="nav__item" v-if="isLogged">
          <nuxt-link class="nav__link" v-if="isLogged" :to="$tc('userAccountPath')">{{ $tc('userAccount') }}</nuxt-link>
        </li>
        <li class="nav__item" v-if="isLogged">
          <button class="nav__link" @click="logout">{{ $tc('userLogOut') }}</button>
        </li>
      </ul>
      <span class="nav__link--status" v-if="isLogged">&check;</span>
    </li>
    <li class="nav__item nav__item--cart" :class="{ 'nav__item--hasItems': hasItems }">
      <button class="nav__link material-icons" v-if="!hasItems">shopping_cart</button>
      <button class="nav__link material-icons" v-if="hasItems && !isLogged" @click.self="toggleModal(1, true)">shopping_cart</button>
      <nuxt-link class="nav__link material-icons" :to="$tc('checkoutPath')" v-if="hasItems && isLogged">shopping_cart</nuxt-link>
      <div class="nav__submenu nav__submenu--empty" v-if="!hasItems">{{ $tc('cartEmpty') }}</div>
      <div class="nav__submenu nav__submenu--cart" v-if="hasItems">
        <CartItems />
        <button class="nav__submenu--btn" type="submit" v-if="!isLogged" @click.self="toggleModal(1, true)">{{ $tc('checkoutGo') }}<span class="material-icons">keyboard_arrow_right</span></button>
        <nuxt-link class="nav__submenu--btn" type="submit" v-if="isLogged" :to="$tc('checkoutPath')">{{ $tc('checkoutGo') }}<span class="material-icons">keyboard_arrow_right</span></nuxt-link>
      </div>
      <span class="nav__link--status" v-if="cartItems.length > 0" v-html="cartItems.length"></span>
    </li>
  </ul>
  <transition name="modal">
    <Modal v-show="openModal(1)" @close="toggleModal(1, true)" :modalType="'login'">
      <h3 slot="header" class="modal__title">{{ $tc('userLoginTitle') }}</h3>
      <div slot="content" class="modal__content">
        <div class="row">
          <div class="col col-50">
            <h4 class="modal__subtitle" v-html="$tc('accountHave')"></h4>
            <LoginForm @goto="goto" @closeModal="toggleModal(1, true)" :global="this.global" ref="loginForm"></LoginForm>
          </div>
          <div class="col col-50">
            <h4 class="modal__subtitle">{{ $tc('accountHaveNo') }}</h4>
            <p v-html="this.global.loginModal[0][`content_${currentLocale}`]"></p>
            <button class="modal__btn" @click="goto('userRegisterPath')">{{ $tc('userRegistration') }}</button>
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
  Vue,
} from 'nuxt-property-decorator';
import NavItem from '@/types/NavItem';
import Modal from "@/components/Modal.vue";
import CartItems from "@/components/CartItems.vue";
import LoginForm from "@/components/LoginForm.vue";
import ToggleModalMxn from "@/mixins/toggleModalMxn";
import {
  mapMutations
} from 'vuex';

@Component({
  mixins: [ToggleModalMxn]
})
export default class Nav extends Vue {
  currentLocale = this.$i18n.locale;
  activeModal = 0;
  isLogged = this.$store.getters['_user/isLogged'];
  hasItems = false;
  isOpenModal = false;
  cartItems = this.$store.getters['_cart/reservations'];
  totalPrice = this.$store.getters['_cart/totalPrice'];

  @Prop() navItems: any;
  @Prop() global: any;

  created() {
    this.navItems.sort((a: NavItem, b: NavItem) => {
      return a.order - b.order;
    });

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
  }

  goto(path: string) {
    this.$router.push({
      path: this.$tc(path)
    });

    this.toggleModal(1, true);
  }

  async logout() {
    (this.$refs.loginForm as any).logout();
  }

  beforeDestroy() {
    (this as any).unwatch();
    (this as any).unwatch2();
    (this as any).unwatch3();
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_nav";
@import "../assets/scss/components/_modal";
</style>
