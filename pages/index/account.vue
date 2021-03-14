<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('userAccount') }}</h2>
    <button class="material-icons" @click="showUser">account_circle</button>
    <div class="row">
      <div class="col col-60">
        <h3>{{ $tc('userAccountData') }}</h3>

      </div>
      <div class="col col-40">
        <h3>{{ $tc('userAccountBookings') }}</h3>


      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue
} from 'nuxt-property-decorator';

@Component
export default class Account extends Vue {
  currentLocale = this.$i18n.locale;
  user = this.$store.getters['_user/loggedUser'];
  myUser = (this as any).$strapi.user;
  userEmail = this.$store.getters['_user/loggedUser'].email;
  userName = this.$store.getters['_user/loggedUser'].username;

  async asyncData({
    $strapi,
    app
  }: {
    $strapi: any,
    app: any
  }) {

    return {
      currentLocale: app.i18n.locale
    };
  }

  created() {
    console.dir(this.user)
    console.dir(this.myUser)
  }

  showUser() {
    console.dir(this.$strapi.user);
    console.dir();
  }

}
</script>

<style scoped lang="scss">

</style>
