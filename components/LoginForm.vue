<template>
<form class="form form--login" ref="form" @submit.prevent="login" novalidate>
  <div class="form__group form__group--txt">
    <input class="form__input" type="email" name="email" v-model="email">
    <label class="form__label">{{ $tc('userEmail') }}</label>
  </div>
  <div class="form__group form__group--txt">
    <input class="form__input" type="password" name="password" v-model="password">
    <label class="form__label">{{ $tc('userPassword') }}</label>
  </div>
  <div class="form__group form__group--alert" v-if="alert">
    <span class="form__alert">{{ alert }}</span>
  </div>
  <div class="form__group form__group--submit">
    <button class="form__btn" type="submit" ref="submitBtn">{{ $tc('userLogIn') }}</button>
    <a class="form__btn form__btn--link" @click.prevent="gotoRetrievePassword" ref="forgotBtn">{{ $tc('userPasswordForgot') }}</a>
  </div>
</form>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'nuxt-property-decorator';

@Component
export default class LoginForm extends Vue {
  currentLocale = this.$i18n.locale;
  email = '';
  password = '';
  alert = '';

  async login() {
    this.alert = '';

    const creds = {
      identifier: this.email,
      password: this.password
    }

    try {
      let res = await (this as any).$strapi.login(creds);

      this.$store.commit('_user/setUser', res);
      this.alert = ((this.$tc('userLoggedAs') as string) + ' ' + this.$store.getters['_user/loggedUser'].username) + '.';

      setTimeout(() => {
        this.$emit('closeModal');
      }, 2000);

      setTimeout(() => {
        this.reset();
      }, 2500);

    } catch (e) {
      switch (true) {
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.confirmed':
          this.alert = this.$tc('userEmailConfirm') as string;
          break;
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.email.provide':
          this.alert = this.$tc('userEmailProvide') as string;
          break;
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.password.provide':
          this.alert = this.$tc('userPasswordProvide') as string;
          break;
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.invalid':
          this.alert = this.$tc('userCredsInvalid') as string;
          break;
        default:
          this.alert = this.$tc('userErrorOther') as string;
      }

      (this.$refs.submitBtn as HTMLButtonElement).disabled = false;
    }
  }

  async logout() {
    await this.$strapi.logout();
    this.$store.commit('_user/resetUser');
  }

  reset() {
    this.alert = '';
    this.email = '';
    this.password = '';
  }

  gotoRetrievePassword() {
    const isLogged = this.$store.getters['_user/isLogged'];

    if (isLogged === false) {
      this.$emit('goto', 'userPasswordRetrievePath');
    } else {
      return;
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/_form";
@import "../assets/scss/components/_modal";
</style>
