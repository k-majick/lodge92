<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('userAccount') }}</h2>
    <button class="material-icons" @click="showUser">account_circle</button>
    <div class="row">
      <div class="col col-60">
        <h3>{{ $tc('userAccountData') }}</h3>
        <div class="main__panel">
          <p><b>{{ $tc('userName') }}:</b> {{ userName }}</p>
          <p><b>{{ $tc('userEmail') }}:</b> {{ userEmail }}</p>
        </div>
      </div>
      <div class="col col-40">
        <h3>{{ $tc('userAccountBookings') }}</h3>
        <div class="main__panel">
          <ul class="main__list">
            <li v-for="booking in userBookings">
              <span>{{ $dayjs(booking.bookingDays[booking.bookingDays.length - 1]).format('D MMMM YYYY') }} - {{ $dayjs(booking.bookingDays[0]).format('D MMMM YYYY') }}</span>
            </li>
          </ul>
        </div>
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
  userBookings = '';

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
    this.getUserBookings();
  }

  showUser() {
    console.dir(this.$strapi.user);

  }

  showMe() {
    console.dir(this.$route.params);
  }

  getUserBookings() {
    try {
      (this as any).$strapi.find('bookings', {
        userName: this.userName
      }).then((res: any) => {
        this.userBookings = res;
        console.dir(this.userBookings);
      });
    } catch (err) {
      console.dir('error' + err);
    }
  }

}
</script>

<style scoped lang="scss">

</style>
