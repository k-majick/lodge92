<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $t('checkout') }}</h2>
    <div class="row">
      <div class="col col-60">
        <h3>Wybór metody płatności</h3>
        <tabs class="checkout__tabs">
          <tab class="tab" title="Przelew online">
            <form class="form form--checkout" @submit.prevent="handleSubmit" novalidate>
              <img class="form__img" src="@/assets/gfx/logo-p24-min.svg" width="120" height="40" alt="Przelewy24">
              <div class="form__group">
                <div ref="p24"></div>
              </div>
              <div class="form__group form__group--checkbox">
                <input class="form__input" type="checkbox" id="p24-regulations" name="p24-regulations" ref="p24-regulations" v-model="regulationsAccepted">
                <label class="form__label" for="p24-regulations">
                  *Oświadczam, że zapoznałem się z <a class="text__link" href="https://www.przelewy24.pl/regulamin" target="_blank">regulaminem</a> i <a class="text__link" href="https://www.przelewy24.pl/obowiazekinformacyjny"
                    target="_blank">obowiązkiem
                    informacyjnym</a> serwisu Przelewy24.
                </label>
              </div>
              <div class="form__group form__group--alert" v-if="alert">
                <span class="form__alert">{{ alert }}</span>
              </div>
              <div class="form__group form__group--submit">
                <button class="main__btn">Pay</button>
              </div>
            </form>
          </tab>
          <tab class="tab" title="Karta">
            <div ref="card"></div>
          </tab>
        </tabs>

        <!-- <Card ref="card-stripe" stripe="pk_test_51I8B4AIE5xAywf5DEmphvTL0ByRuXdUF4yh2ShW5gtJH6BgpQhGF4mbNgxfpzE4XBnl7HFeyVx301PCvgkWKj0DL00Rm0PowlV" @change='complete = $event.complete' /> -->

      </div>
      <div class="col col-40">
        <h3>Twoje zamówienie</h3>
        <div class="checkout">
          czek
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
// import {
//   Card,
//   createToken
// } from 'vue-stripe-elements-plus';
import Tab from '@/components/Tab.vue';
import Tabs from '@/components/Tabs.vue';
import Booking from '@/types/Booking';
import Day from '@/types/Day';
import User from '@/types/User';

interface Order {
  amount: number,
    bookings: any[],
}

@Component({
  middleware: 'auth',
  components: {
    // Card,
    Tab,
    Tabs,
  }
})
export default class Checkout extends Vue {
  public currentLocale = this.$i18n.locale;
  public isLogged = this.$store.getters['_user/isLogged'];
  private totalAmount = 0;
  private bookings: Booking[] = [];
  private userEmail = '';
  private userName = '';
  private userAddress = '';
  private userAddressNo = '';
  private userPostalCode = '';
  private userCity = '';
  private user: User | null = null;
  private clientSecret = '';
  private p24bank: any = null;
  private p24selected: string = '';
  private alert: string | null = '';
  private regulationsAccepted: boolean = false;
  private order: Order = {
    amount: 0,
    bookings: []
  };

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
    if (this.isLogged)
      this.getUserData();

    this.setOrder();
  }

  mounted() {
    this.$store.watch(() => this.$store.getters['_user/isLogged'], isLogged => {
      this.isLogged = isLogged;
    });

    const elements = (this as any).$stripe.elements();
    const p24options = {
      classes: {
        base: 'checkout__p24',
        empty: 'checkout__p24--empty',
        focus: 'checkout__p24--focus',
      },
      style: {
        base: {
          backgroundColor: 'white',
          color: '#008080',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '16px',
          padding: '10px 15px'
        },
        complete: {
          color: '#008080'
        }
      }
    };
    this.p24bank = elements.create('p24Bank', p24options);
    this.card = elements.create('card', {});
    this.p24bank.mount(this.$refs.p24);
    this.card.mount(this.$refs.card);
    this.p24bank.on('change', (e: Event) => {
      this.p24selected = (e as any).value;
      this.validateForm();
    });
  }

  setOrder() {
    this.bookings = this.$store.getters['_cart/bookings'];
    this.bookings.forEach(booking => {
      this.order.amount += booking.cost! * 100;
      this.order.bookings.push({
        bookingCost: booking.cost!,
        bookingDates: booking.bookingDates as string[],
        bookingDays: booking.bookingDays!.map(day => day.date),
      });
    });
  }

  getUserData() {
    this.user = this.$store.getters['_user/loggedUser'];
    this.userEmail = this.user!.email;
    this.userName = this.user!.username;
  }

  @Watch('regulationsAccepted')
  validateForm() {
    switch (true) {
      case this.p24selected === '':
        this.alert = 'select bank';
        break;
      case this.regulationsAccepted == false:
        this.alert = 'check it';
        return false;
        break;
      default:
        this.alert = null;
        return true;
    }
  }

  async handleSubmit() {
    // let token = '';
    // try {
    //   const response = await createToken();
    //   token = response.token.id;
    // } catch (err) {
    //   console.dir(err);
    //   return;
    // }
    // console.dir(token);
    // try {
    //   await (this as any).$strapi.create('bookings', order);
    //   this.emptyCart();
    // } catch (err) {
    //   console.dir(err);
    // }
    // let res = (this as any).$strapi.find('bookings');
    // console.dir(res);

    // console.dir(this.order);


    if (this.validateForm() === false)
      return;


    try {
      (this as any).$strapi.create('bookings', this.order).then((res: any) => {
        this.clientSecret = res.client_secret;
        console.dir(this.clientSecret);
        this.confirmPayment();
      });
    } catch (err) {
      console.dir(err);
    }
  }

  async confirmPayment() {
    const {
      error
    } = await (this as any).$stripe.confirmP24Payment(
      this.clientSecret, {
        payment_method: {
          p24: this.p24bank,
          billing_details: {
            email: this.userEmail,
            name: this.userName,
          },
        },
        payment_method_options: {
          p24: {
            // In order to be able to pass the `tos_shown_and_accepted` parameter, you must
            // ensure that the P24 regulations and information obligation consent
            // text is clearly visible to the customer. See
            // https://stripe.com/docs/payments/p24/accept-a-payment#requirements
            // for directions.
            tos_shown_and_accepted: true,
          }
        },
        return_url: 'http://localhost:8888/kontakt',
      }
    );
  }

  emptyCart() {
    console.log('empty cart');
  }

}
</script>

<style lang="scss">
@import "../../assets/scss/components/_form";
@import "../../assets/scss/components/_checkout";
</style>
