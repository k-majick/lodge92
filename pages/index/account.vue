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
          <ul class="main__list" v-if="userBookings.length">
            <li v-for="booking in userBookings">
              <span v-if="booking.bookingDays.length">
                <span v-if="currentLocale === 'en'">{{ $dayjs(booking.bookingDays[0].date).format('MMMM D, YYYY') }}</span>
                <span v-else>{{ $dayjs(booking.bookingDays[0].date).format('D MMMM YYYY') }} <span v-if="currentLocale === 'pl'">r.</span></span>
                <span v-if="booking.bookingDays.length > 1"> &rarr;
                  <span v-if="currentLocale === 'en'">{{ $dayjs(booking.bookingDays[booking.bookingDays.length - 1].date).format('MMMM D, YYYY') }}</span>
                  <span v-else>{{ $dayjs(booking.bookingDays[booking.bookingDays.length - 1].date).format('D MMMM YYYY') }} <span v-if="currentLocale === 'pl'">r.</span></span>
                </span>
              </span>
            </li>
          </ul>
          <span v-if="!userBookings.length">
            {{ $tc('userAccountBookingsNo') }}
          </span>
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
