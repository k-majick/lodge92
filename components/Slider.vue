<template>
<div class="slider">
  <div class="slider__nav">
    <a class="slider__prev material-icons" @click.prevent="prevSlide" href="#">chevron_left</a>
    <a class="slider__next material-icons" @click.prevent="nextSlide" href="#">chevron_right</a>
  </div>
  <transition-group name="fade" tag="div">
    <div class="slider__slide" v-for="i in [currentIndex]" :key="i">
      <picture>
        <source media="(max-width: 767px)" :srcset="currentImg.mobile" />
        <source media="(min-width: 768px)" :srcset="currentImg.desktop" />
        <img />
      </picture>
    </div>
  </transition-group>

</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'nuxt-property-decorator';

@Component
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
