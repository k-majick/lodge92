<template>
<section class="main__section main__section--start">
  <div class="container">
    <div class="main__logo" v-html="logo"></div>
    <h2 class="main__title">{{ start.hero[`title_${currentLocale}`] }}</h2>
    <p class="main__text">{{ start.hero[`intro_${currentLocale}`] }}</p>
  </div>
  <div class="container">
    <div class="row">
      <div class="col col-50">
        <h3>{{ $tc('startBasicInfo') }}</h3>
        <tabs class="main__panel">
          <tab class="tab" :title="$tc('startHome')">
            <ul class="main__list main__list--icons">
              <li class="main__item" v-for="feat in start.house_features">
                <span class="material-icons" v-html="feat.icon"></span>
                {{ feat[`txt_${currentLocale}`] }}
              </li>
            </ul>
          </tab>
          <tab class="tab" :title="$tc('startHood')">
            <ul class="main__list main__list--icons">
              <li class="main__item" v-for="feat in start.hood_features">
                <span class="material-icons" v-html="feat.icon"></span>
                {{ feat[`txt_${currentLocale}`] }}
              </li>
            </ul>
          </tab>
          <div class="main__btns">
            <nuxt-link class="main__btn main__btn--icon main__btn--booking" :to="localePath('index-reservations')">{{ $tc('bookNow') }}</nuxt-link>
            <nuxt-link class="main__btn main__btn--icon main__btn--info" :to="localePath('index-about')">{{ $tc('learnMore') }}</nuxt-link>
          </div>
        </tabs>
      </div>
      <div class="col col-50">
        <h3>{{ $tc('startSeeImages') }}</h3>
        <tabs class="main__panel">
          <tab class="tab" :title="$tc('startHome')">
            <Slider :images="this.images.house" @toggleModal="toggleModalImg" />
          </tab>
          <tab class="tab" :title="$tc('startHood')">
            <Slider :images="this.images.hood" @toggleModal="toggleModalImg" />
          </tab>
        </tabs>
      </div>
    </div>
  </div>

  <transition name="modal">
    <Modal v-show="openModal(1)" @close="toggleModal(1, true)" :modalType="'image'">
      <div slot="content" class="modal__content">
        <picture class="modal__pic">
          <source media="(max-width: 767px)" :srcset="modalImage.mobile" />
          <source media="(min-width: 768px)" :srcset="modalImage.desktop" />
          <img  class="modal__img" @click="$emit('toggleModal')" />
        </picture>
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
import rawLogo from '@/assets/gfx/lodge92-logo.svg?raw';
import Slider from '@/components/Slider.vue';
import Tab from '@/components/Tab.vue';
import Tabs from '@/components/Tabs.vue';
import Modal from "@/components/Modal.vue";
import ToggleModalMxn from "@/mixins/toggleModalMxn";

@Component({
  components: {
    Modal,
    Tab,
    Tabs,
  },
  mixins: [ToggleModalMxn]
})
export default class Start extends Vue {
  public activeModal = 0;
  public modalImage = {};
  private isOpenModal = false;
  private currentLocale = this.$i18n.locale;
  private logo = rawLogo;
  private navButtons = [];
  private images = [];

  async asyncData({
    $strapi,
    app
  }: {
    $strapi: any,
    app: any
  }) {

    return {
      start: await $strapi.find("start"),
      global: await $strapi.find("global"),
      currentLocale: app.i18n.locale
    };
  }

  created() {
    this.navButtons = (this as any).start.NavButtons;
    this.images = (this as any).global.gallery.images;
  }

  toggleModalImg(currentImg: any) {
    this.modalImage = currentImg;
    this.toggleModal(1, true, currentImg)
  }

}
</script>

<style lang="scss">

</style>
