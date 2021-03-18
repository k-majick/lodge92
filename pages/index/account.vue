<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('userAccount') }}</h2>
    <!-- <button class="material-icons" @click="showUser">account_circle</button> -->
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
          <span v-if="!userBookings.length">
            {{ $tc('userAccountBookingsNo') }}
          </span>
          <ul class="main__list" v-else>
            <li v-for="booking in userBookings">
              <span v-if="booking.bookingDays.length">
                <span v-if="currentLocale === 'en'">{{ $dayjs(booking.bookingDays[0]).format('MMMM D, YYYY') }}</span>
                <span v-else>{{ $dayjs(booking.bookingDays[0]).format('D MMMM YYYY') }} <span v-if="currentLocale === 'pl'">r.</span></span>
                <span v-if="booking.bookingDays.length > 1"> &rarr;
                  <span v-if="currentLocale === 'en'">{{ $dayjs(booking.bookingDays[booking.bookingDays.length - 1]).format('MMMM D, YYYY') }}</span>
                  <span v-else>{{ $dayjs(booking.bookingDays[booking.bookingDays.length - 1]).format('D MMMM YYYY') }} <span v-if="currentLocale === 'pl'">r.</span></span>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <transition name="modal">
    <Modal v-show="openModal(1)" @close="toggleModal(1, true)" :modalType="'txh'">
      <h3 slot="header" class="modal__title">Dziękujemy!</h3>
      <div slot="content" class="modal__content text--center">
        <p>Twoja rezerwacja została opłacona. Życzymy udanego pobytu!</p>
        <button class="modal__btn modal__btn--center" @click="toggleModal(1, true)">Ok</button>
      </div>
    </Modal>
  </transition>
</section>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue
} from 'nuxt-property-decorator';
import Modal from "@/components/Modal.vue";
import ToggleModalMxn from "@/mixins/toggleModalMxn";

@Component({
  mixins: [ToggleModalMxn]
})
export default class Account extends Vue {
  currentLocale = this.$i18n.locale;
  user = this.$store.getters['_user/loggedUser'];
  myUser = (this as any).$strapi.user;
  userEmail = this.$store.getters['_user/loggedUser'].email;
  userName = this.$store.getters['_user/loggedUser'].username;
  userBookings = '';
  activeModal = 0;
  isOpenModal = false;

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

    if (this.$route.query.payment === 'confirmed')
      this.toggleModal(1, true);

  }

  showUser() {
    console.dir(this.$strapi.user);
    console.dir(this.userBookings);
  }

  getUserBookings() {
    try {
      (this as any).$strapi.find('bookings', {
        userName: this.userName
      }).then((res: any) => {
        this.userBookings = res;
      });
    } catch (err) {
      console.dir('error' + err);
    }
  }

}
</script>

<style scoped lang="scss">

</style>
