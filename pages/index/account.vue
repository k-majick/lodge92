<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('userAccount') }}</h2>
    <button class="material-icons" @click="showUser">account_circle</button>
    <div class="row">
      <div class="col col-60">
        <h3>{{ $tc('userAccountData') }}</h3>
        <div class="main__panel" v-if="user">
          <p><b>{{ $tc('userName') }}:</b> {{ user.username }}</p>
          <p><b>{{ $tc('userEmail') }}:</b> {{ user.email }}</p>
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
import User from '@/types/User';
import Modal from "@/components/Modal.vue";
import ToggleModalMxn from "@/mixins/toggleModalMxn";

@Component({
  mixins: [ToggleModalMxn]
})
export default class Account extends Vue {
  private currentLocale = this.$i18n.locale;
  private user: User | null = (this as any).$strapi.user;
  private userBookings = [];
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
    if (this.$route.query.payment === 'confirmed')
      this.toggleModal(1, true);

    if (this.user)
      this.userBookings = this.user!.bookings;

  }

  showUser() {
    console.dir(this.$strapi.user);
  }

}
</script>

<style scoped lang="scss">

</style>
