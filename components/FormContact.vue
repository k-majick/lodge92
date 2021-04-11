<template>
<form class="form form--contact" @submit.prevent="sendForm" ref="form" v-on:change="processForm" novalidate>
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
  <div class="form__group form__group--txt" :class="{'form__group--error': $v.message.$dirty && $v.message.$error}">
    <span class="form__alert">{{ validationMessage('message') }}</span>
    <textarea class="form__input" name="message" rows="9" v-model.trim="$v.message.$model" @blur="$v.message.$touch()"></textarea>
    <label class="form__label">{{ $tc('userMessage') }}</label>
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
      message: {
        required,
        alphaDiacritic,
        minLength: minLength(10),
        maxLength: maxLength(1000)
      },
    }
  })
  export default class FormContact extends Vue {
    private currentLocale = this.$i18n.locale;
    private name = '';
    private email = '';
    private message = '';
    private alert = '';
    private messageObj = {
      userEmail: '',
      userName: '',
      userMessage: '',
    };
    private validationMessages: {
      [key: string]: any
    } = {
      name: {
        required: "vNameRequired",
        alphaDiacritic: "vNameAlphaDiacritic",
        minLength: "vNameMinLength",
        maxLength: "vNameMaxLength",
      },
      email: {
        required: "userEmailProvide",
        email: "userEmailProvideCorrect",
        maxLength: "vEmailMaxLength",
      },
      message: {
        required: "vMessageRequired",
        minLength: "vMessageMinLength",
        maxLength: "vMessageMaxLength",
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

    setMessageObj() {
      this.messageObj = {
        userEmail: this.email,
        userName: this.name,
        userMessage: this.message,
      }
    }

    async sendForm() {
      if (this.$v.$invalid == true) {
        this.processForm();
        return;
      }

      (this.$refs.submitBtn as HTMLButtonElement).disabled = true;
      this.$nuxt.$loading.start();
      this.setMessageObj();

      try {
        (this as any).$strapi.create('messages', this.messageObj).then((res: any) => {
          this.alert = this.$tc(`${res}`);
          console.dir(res);
        });
      } catch (err) {
        this.alert = err.message;
        (this.$refs.submitBtn as HTMLButtonElement).disabled = false;
      }

      this.$nuxt.$loading.finish();
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
