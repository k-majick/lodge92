<template>
<div class="modal__mask" :class="`modal__mask--${modalType}`">
  <div class="modal__wrapper">
    <div class="modal">
      <button class="modal__close" type="button" @click="$emit('close')">&times;</button>
      <slot name="header"></slot>
      <slot name="content"></slot>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from 'nuxt-property-decorator';

@Component({})
export default class Modal extends Vue {
  @Prop() modalType!: string;

}
</script>
