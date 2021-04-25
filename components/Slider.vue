<template>
<div>
  <div class="slider">
    <div class="slider__nav">
      <a class="slider__prev material-icons" @click.prevent="prevSlide" href="#">chevron_left</a>
      <a class="slider__next material-icons" @click.prevent="nextSlide" href="#">chevron_right</a>
    </div>

    <transition-group name="fade" tag="div">
      <div class="slider__slide" v-for="i in [currentIndex]" :key="i" v-hover-tooltip="$tc('clickToEnlarge')">
        <img :src="currentImg.mobile" @click="$emit('toggleModal', currentImg)" data-image />
      </div>
    </transition-group>
  </div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'nuxt-property-decorator';
import Modal from "@/components/Modal.vue";
import ToggleModalMxn from "@/mixins/toggleModalMxn";
import {
  hoverTooltip
} from '../directives/hoverTooltip';

@Component({
  components: {
    Modal,
  },
  directives: {
    hoverTooltip,
  },
  mixins: [ToggleModalMxn]
})
export default class Slider extends Vue {
  @Prop() images: any;
  currentIndex = 0;

  nextSlide() {
    this.currentIndex += 1;
  }

  prevSlide() {
    this.currentIndex -= 1;
  }

  get currentImg() {
    if (this.images.length)
      return this.images[Math.abs(this.currentIndex) % this.images.length];
  }

}
</script>

<style scoped lang="scss">
@import "./assets/scss/components/_slider";
.fade-enter-active,
.fade-leave-active {
    transition: all 0.9s ease;
    overflow: hidden;
    visibility: visible;
    width: 100%;
    opacity: 1;
}

.fade-enter,
.fade-leave-to {
    visibility: hidden;
    width: 100%;
    opacity: 0;
}
</style>
