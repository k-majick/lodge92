<template>
<form class="form form--password" @submit.prevent="processForm" ref="form" novalidate>
  <div class="form__group form__group--txt">
    <span class="form__alert"></span>
    <input class="form__input" type="text" name="name" v-model="email">
    <label class="form__label">{{ $tc('userEmail') }}</label>
  </div>
  <div class="form__group form__group--alert">
    <span class="form__alert" v-if="alert" v-html="alert"></span>
  </div>
  <div class="form__group form__group--submit">
    <button class="form__btn" type="submit" ref="submitBtn">{{ $tc('userSendBtn') }}</button>
  </div>
</form>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'nuxt-property-decorator';

@Component
export default class FormPasswordLost extends Vue {
  private email = '';
  private alert = '';

  async processForm() {
    this.alert = '';
    this.$nuxt.$loading.start();
    (this.$refs.submitBtn as HTMLButtonElement).disabled = true;

    const user = {
      email: this.email
    };

    try {
      let res = await this.$strapi.forgotPassword(user);

      (res as any).ok === true ? this.alert = this.$tc('userPasswordResetConfirm') as string : this.alert = this.$tc('userErrorOther') as string;
      
    } catch (e) {

      switch (true) {
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.email.format':
          this.alert = this.$tc('userEmailProvideCorrect') as string;
          break;
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.user.not-exist':
          this.alert = this.$tc('userEmailNotExist') as string;
          break;
        default:
          this.alert = this.$tc('userErrorOther') as string;
      }

      (this.$refs.submitBtn as HTMLButtonElement).disabled = false;
    }

    this.$nuxt.$loading.finish();
  }

  reset() {
    this.email = '';
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/_form";
</style>
