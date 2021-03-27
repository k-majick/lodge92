<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('userPasswordReset') }}</h2>
    <form class="form form--password" @submit.prevent="processForm" ref="form" novalidate>
      <div class="form__group form__group--txt">
        <span class="form__alert"></span>
        <input class="form__input" type="password" name="name" v-model="newPassword">
        <label class="form__label">{{ $tc('userPasswordNew') }}</label>
      </div>
      <div class="form__group form__group--txt">
        <span class="form__alert"></span>
        <input class="form__input" type="password" name="name" v-model="passwordConfirm">
        <label class="form__label">{{ $tc('userPasswordConfirm') }}</label>
      </div>
      <div class="form__group form__group--alert">
        <span class="form__alert" v-if="alert" v-html="alert"></span>
      </div>
      <div class="form__group form__group--submit">
        <button class="form__btn" type="submit" ref="submitBtn">{{ $tc('userSendBtn') }}</button>
      </div>
    </form>
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';

@Component
export default class PasswordReset extends Vue {
  private newPassword = '';
  private passwordConfirm = '';
  private alert = '';

  async processForm() {
    this.alert = '';
    this.$nuxt.$loading.start();
    (this.$refs.submitBtn as HTMLButtonElement).disabled = true;

    const req = {
      code: this.$route.query.code as string,
      password: this.newPassword,
      passwordConfirmation: this.passwordConfirm
    };

    try {
      let res = await this.$strapi.resetPassword(req);

      (res as any).jwt ? this.alert = this.$tc('userPasswordChangeConfirm') as string : this.alert = this.$tc('userErrorOther') as string;
      this.$nuxt.$loading.finish();

    } catch (e) {
      console.dir(e);

      switch (true) {
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.params.provide':
          this.alert = this.$tc('userPasswordNewInvalid') as string;
          break;
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.code.provide':
          this.alert = this.$tc('userPasswordResetCodeInvalid') as string;
          break;
        case e.response.data.message[0].messages[0].id === 'Auth.form.error.password.matching':
          this.alert = this.$tc('userPasswordNewMismatch') as string;
          break;
        default:
          this.alert = this.$tc('userErrorOther') as string;
      }

      (this.$refs.submitBtn as HTMLButtonElement).disabled = false;
      this.$nuxt.$loading.finish();
    }
  }

  reset() {
    this.newPassword = '';
    this.passwordConfirm = '';
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/_form";
</style>
