<template>
<form class="form form--register" @submit.prevent="sendForm" ref="form" v-on:change="processForm" novalidate>
  <div class="form__group form__group--txt" :class="{'form__group--error': $v.name.$dirty && $v.name.$error}">
    <span class="form__alert">{{ validationMessage('name') }}</span>
    <input class="form__input" type="text" name="name" v-model="$v.name.$model" @blur="$v.name.$touch()">
    <label class="form__label">{{ $tc('userNameFirst') }}</label>
  </div>
  <div class="form__group form__group--txt" :class="{'form__group--error': $v.email.$dirty && $v.email.$error}">
    <span class="form__alert">{{ validationMessage('email') }}</span>
    <input class="form__input" type="email" name="email" v-model.trim="$v.email.$model" @blur="$v.email.$touch()">
    <label class="form__label">{{ $tc('userEmail') }}</label>
  </div>
  <div class="form__group form__group--txt" :class="{'form__group--error': $v.password.$dirty && $v.password.$error}">
    <span class="form__alert">{{ validationMessage('password') }}</span>
    <input class="form__input" type="password" name="password" v-model.trim="$v.password.$model" @blur="$v.password.$touch()">
    <label class="form__label">{{ $tc('userPassword') }}</label>
  </div>
  <div class="form__group form__group--alert">
    <span class="form__alert" v-if="alert" v-html="alert"></span>
  </div>
  <div class="form__group form__group--submit">
    <button class="form__btn" type="submit" ref="submitBtn">{{ $tc('userRegister') }}</button>
  </div>
</form>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from 'nuxt-property-decorator';
  import {
    validationMixin
  } from 'vuelidate';
  import {
    email,
    minLength,
    maxLength,
    required,
    helpers
  } from 'vuelidate/lib/validators';

  const alphaDiacritic = helpers.regex('alphaDiacritic', /^[a-zA-ZÀ-ž\s]*$/);

  @Component({
    mixins: [validationMixin],
    validations: {
      name: {
        required,
        alphaDiacritic,
        minLength: minLength(3),
        maxLength: maxLength(50)
      },
      email: {
        required,
        email,
        maxLength: maxLength(50)
      },
      password: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
      }
    }
  })
  export default class FormRegister extends Vue {
    private name = '';
    private email = '';
    private password = '';
    private alert = '';
    private validationMessages: {
      [key: string]: any
    } = {
      name: {
        required: "vNameRequired",
        alphaDiacritic: "vNameAlphaDiacritic",
        minLength: "vNameMinLength",
        maxLength: "vNameMaxLength"
      },
      email: {
        required: "userEmailProvide",
        email: "userEmailProvideCorrect",
        maxLength: "vEmailMaxLength"
      },
      password: {
        required: "userPasswordProvide",
        minLength: "vPasswordMinLength",
        maxLength: "vPasswordMaxLength"
      }
    }

    processForm() {
      for (let key in this.validationMessages) {
        this.$v[key].$touch();
        this.validationMessage(key);
      }
    }

    validationMessage(fieldName: string) {
      for (let key in this.validationMessages[fieldName]) {
        if (this.$v[fieldName].$dirty && this.$v[fieldName][key] as unknown == false)
          return this.$tc(this.validationMessages[fieldName][key]);
      }
    }

    async sendForm() {
      if (this.$v.$invalid == true) {
        this.processForm();
        return;
      }

      (this.$refs.submitBtn as HTMLButtonElement).disabled = true;
      this.$nuxt.$loading.start();

      const user = {
        email: this.$v.email.$model,
        username: this.$v.name.$model,
        password: this.$v.password.$model
      }

      try {
        (this as any).$axios.setToken(false);
        let res = await (this as any).$axios.post("auth/local/register", user);

        res.status === 200 ? this.alert = (this.$tc('userRegisteredConfirm') as string) : this.alert = (this.$tc('userErrorOther') as string);
        this.$nuxt.$loading.finish();

      } catch (e) {

        switch (true) {
          case e.response.data.message[0].messages[0].id === 'Auth.form.error.email.taken':
            this.alert = this.$tc('userEmailTaken') as string;
            break;
          default:
            this.alert = this.$tc('userErrorOther') as string;
        }

        this.$nuxt.$loading.finish();
      }
    }

    resetForm() {
      for (let key in this.validationMessages) {
        this.$v[key].$model = '';
      }
      this.$v.$reset();
      (this.$refs.submitBtn as HTMLButtonElement).disabled = false;
    }
  }

  </script>

  <style lang="scss" scoped>
  @import "../assets/scss/components/_form";
  </style>
