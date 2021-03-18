<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('checkout') }}</h2>
    <div class="row">
      <div class="col col-60">
        <h3>{{ $tc('checkoutSelectPayment') }}</h3>
        <tabs class="checkout__tabs" @tabChanged="resetAlert">
          <p>{{ $tc('userLoggedAs') }}
            <nuxt-link class="text__link" :to="$tc('userAccountPath')">{{ userName }}</nuxt-link>.
          </p>
          <tab class="tab" :title="$tc('checkoutTransfer')">
            <form class="form form--checkout" @submit.prevent="submitTransfer" novalidate>
              <img class="form__img" src="@/assets/gfx/logo-p24-min.svg" width="120" height="40" alt="Przelewy24">
              <div class="form__group">
                <div ref="p24"></div>
              </div>
              <div class="form__group form__group--checkbox">
                <input class="form__input" type="checkbox" id="p24-regulations" name="p24-regulations" ref="p24-regulations" v-model="regulationsAccepted">
                <label class="form__label" for="p24-regulations">
                  <span v-if="currentLocale === 'de'">
                    *Ich erkläre, dass ich <a class="text__link" href="https://www.przelewy24.pl/regulamin" target="_blank">die Vorschriften</a> und <a class="text__link" href="https://www.przelewy24.pl/obowiazekinformacyjny"
                      target="_blank">Informationspflichten</a> von Przelewy24 gelesen habe.
                  </span>
                  <span v-if="currentLocale === 'en'">
                    *I declare that I have read <a class="text__link" href="https://www.przelewy24.pl/regulamin" target="_blank">the regulations</a> and <a class="text__link" href="https://www.przelewy24.pl/obowiazekinformacyjny"
                      target="_blank">information requirements</a> of Przelewy24.
                  </span>
                  <span v-if="currentLocale === 'pl'">
                    *Oświadczam, że zapoznałem się z <a class="text__link" href="https://www.przelewy24.pl/regulamin" target="_blank">regulaminem</a> i <a class="text__link" href="https://www.przelewy24.pl/obowiazekinformacyjny"
                      target="_blank">obowiązkiem informacyjnym</a> serwisu Przelewy24.
                  </span>
                </label>
              </div>
              <div class="form__group form__group--alert" v-if="alert">
                <span class="form__alert">{{ alert }}</span>
              </div>
              <div class="form__group form__group--submit">
                <button class="main__btn">Pay {{ totalAmount }}</button>
              </div>
            </form>
          </tab>
          <tab class="tab" :title="$tc('checkoutCard')">
            <form class="form form--checkout form--card" @submit.prevent="submitCard" novalidate>
              <div class="card__icons">
                <div v-for="icon in cardIcons" class="card__icon" :class="icon.img"></div>
              </div>
              <div class="form__group">
                <div ref="card"></div>
              </div>
              <div class="form__group form__group--alert" v-if="alert">
                <span class="form__alert">{{ alert }}</span>
              </div>
              <div class="form__group form__group--submit">
                <button class="main__btn">{{ $tc('checkoutPay') }} {{ totalAmount }}</button>
              </div>
            </form>
          </tab>
        </tabs>
      </div>
      <div class="col col-40">
        <h3>{{ $tc('checkoutUserReservations') }}</h3>
        <div class="checkout">
          <CartItems />
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
import Tab from '@/components/Tab.vue';
import Tabs from '@/components/Tabs.vue';
import CartItems from "@/components/CartItems.vue";
import Reservation from '@/types/Reservation';
import Day from '@/types/Day';
import Order from '@/types/Order';
import User from '@/types/User';

@Component({
  components: {
    Tab,
    Tabs,
  }
})
export default class Checkout extends Vue {
  private currentLocale = this.$i18n.locale;
  private isLogged = this.$store.getters['_user/isLogged'];
  private reservations: Reservation[] = this.$store.getters['_cart/reservations'];
  private userEmail = this.$store.getters['_user/loggedUser'].email;
  private userName = this.$store.getters['_user/loggedUser'].username;
  // private userAddress = '';
  // private userAddressNo = '';
  // private userPostalCode = '';
  // private userCity = '';
  private user: User | null = null;
  private card: any = null;
  private p24bank: any = null;
  private p24selected: string = '';
  private alert: string | null = '';
  private regulationsAccepted: boolean = false;
  private totalAmount = this.$store.getters['_cart/totalPrice'];
  private token: any = null;
  private cardValid: boolean = false;
  private order: Order = {
    amount: 0,
    bookings: [],
    method: '',
    token: '',
  };
  private cardIcons = [{
      img: 'card__icon--visa',
      name: 'Visa',
    },
    {
      img: 'card__icon--mastercard',
      name: 'Visa',
    },
    {
      img: 'card__icon--maestro',
      name: 'Maestro',
    },
    {
      img: 'card__icon--discover',
      name: 'Discover',
    },
    {
      img: 'card__icon--amex',
      name: 'American Express',
    }
  ]

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
    this.setOrder();
  }

  mounted() {
    (this as any).unwatch = this.$store.watch(() => this.$store.getters['_user/isLogged'], isLogged => this.isLogged = isLogged);
    (this as any).unwatch2 = this.$store.watch(() => this.$store.getters['_cart/reservations'], reservations => this.reservations = reservations);

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
          padding: '10px 15px',
        },
        complete: {
          color: '#008080',
        }
      }
    };
    this.p24bank = elements.create('p24Bank', p24options);
    this.p24bank.mount(this.$refs.p24);
    this.p24bank.on('change', (e: Event) => {
      this.p24selected = (e as any).value;
      this.validateP24form();
    });

    const cardOptions = {
      classes: {
        base: 'checkout__card',
        empty: 'checkout__card--empty',
        focus: 'checkout__card--focus',
      },
      style: {
        base: {
          iconColor: '#ffffff',
          color: '#ffffff',
          '::placeholder': {
            color: '#ffffff',
          },
          fontFamily: 'Nunito, sans-serif',
          fontSize: '16px',
          padding: '10px 15px',
          ':-webkit-autofill': {
            color: '#441650',
          },
        },
        complete: {
          color: '#ffffff',
        }
      },
      invalid: {
        iconColor: '#ff0000',
        color: '#ffffff',
      },
    }
    this.card = elements.create('card', cardOptions);
    this.card.mount(this.$refs.card);
    this.card.on('change', (e: Event) => {
      this.validateCard(e);
    });
  }

  resetAlert() {
    this.alert = '';
  }

  @Watch('reservations')
  @Watch('isLogged')
  redirect() {
    if (this.reservations.length < 1 || this.isLogged === false)
      this.$router.push(this.$tc('reservationsPath'));
  }

  @Watch('reservations')
  setOrder() {
    this.reservations.forEach(reservation => {
      this.order.amount += reservation.cost! * 100;
      this.order.bookings.push({
        bookingCost: reservation.cost!,
        bookingDays: reservation.reservationDays!.map(day => day.date),
        isPaid: false,
        userEmail: this.userEmail,
        userName: this.userName,
      });
    });

    const formatter = new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0
    });

    (this.totalAmount as any) = formatter.format(this.$store.getters['_cart/totalPrice']);
  }

  validateCard(e: any) {
    if (e.error !== undefined) {

      switch (true) {
        case e.error.code === 'incomplete_number':
          this.alert = this.$tc('checkoutCardNumberIncomplete');
          break;
        case e.error.code === 'invalid_number':
          this.alert = this.$tc('checkoutCardNumberInvalid');
          break;
        case e.error.code === 'incomplete_expiry':
          this.alert = this.$tc('checkoutExpiryIncomplete');
          break;
        case e.error.code === 'invalid_expiry_year_past':
          this.alert = this.$tc('checkoutCardYearExpired');
          break;
        case e.error.code === 'invalid_expiry_month_past':
          this.alert = this.$tc('checkoutCardMonthExpired');
          break;
        case e.error.code === 'incomplete_cvc':
          this.alert = this.$tc('checkoutCardCVVincomplete');
          break;
        case e.error.code === 'incomplete_zip':
          this.alert = this.$tc('checkoutZipIncomplete');
          break;
      }

    } else {
      this.alert = '';
    }

    if (e.complete === true) {
      this.cardValid = true;
    } else {
      this.cardValid = false;
    }

    return false;
  }

  @Watch('regulationsAccepted')
  validateP24form() {
    switch (true) {
      case this.p24selected === '':
        this.alert = this.$tc('checkoutSelectBank');
        return false;
        break;
      case this.regulationsAccepted == false:
        this.alert = this.$tc('checkoutAcceptRules');
        return false;
        break;
      default:
        this.alert = null;
        return true;
    }
  }

  async submitTransfer() {
    if (!this.validateP24form())
      return;

    this.$nuxt.$loading.start();
    this.order.method = 'p24';

    try {
      (this as any).$strapi.create('bookings', this.order).then((res: any) => {
        console.dir(res);
        this.confirmP24Payment(res.client_secret);
      });
    } catch (err) {
      this.alert = err.message;
      this.$nuxt.$loading.finish();
      // console.dir(err);
      return;
    }
  }

  async submitCard() {
    if (!this.cardValid) {
      this.alert = this.$tc('checkoutCardDetails');
      return;
    }

    this.$nuxt.$loading.start();

    try {
      const res = await (this as any).$stripe.createToken(this.card);

      this.order.method = 'card';
      this.order.token = res.token.id;

      try {
        (this as any).$strapi.create('bookings', this.order).then((res: any) => {
          console.dir(res);
          this.confirmCardPayment(res.client_secret);
        });
      } catch (err) {
        this.alert = err.message;
        this.$nuxt.$loading.finish();
        // console.dir(err);
      }

    } catch (err) {
      this.alert = err.message;
      this.$nuxt.$loading.finish();
      // console.dir(err);
      return;
    }
  }

  async confirmP24Payment(clientSecret: string) {
    this.resetCart();

    await (this as any).$stripe.confirmP24Payment(clientSecret, {
      payment_method: {
        p24: this.p24bank,
        billing_details: {
          email: this.userEmail,
          name: this.userName,
        },
      },
      payment_method_options: {
        p24: {
          tos_shown_and_accepted: true,
        }
      },
      return_url: `${this.$config.appUrl}/${this.$tc('userAccountPath')}?payment=confirmed`,
    }); // redirects away
  }

  async confirmCardPayment(clientSecret: string) {
    this.resetCart();

    await (this as any).$stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.card,
        billing_details: {
          email: this.userEmail,
          name: this.userName,
        }
      }
    }).then((res: any) => {
      this.$nuxt.$loading.finish();

      if (res.error) {
        this.alert = res.error.message;
      } else {
        console.dir('payment processed');
        if (res.paymentIntent.status === 'succeeded') {
          console.dir('success');
          console.dir(res);
          this.$router.push({ path: this.$tc('userAccountPath'), query: { payment: 'confirmed' }});
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    });
  }

  resetCart() {
    this.$store.commit('_cart/reset');
    this.$store.commit('_days/resetCartDays');
  }

  beforeDestroy() {
    (this as any).unwatch();
    (this as any).unwatch2();
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/_form";
@import "../../assets/scss/components/_checkout";
</style>
