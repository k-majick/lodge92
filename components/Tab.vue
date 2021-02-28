<template>
<div v-show="isActive">
  <slot></slot>
</div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from 'nuxt-property-decorator';

@Component
export default class Tab extends Vue {
  isActive = true;

  @Prop() title!: string;

}
</script>

<style lang="scss">

</style>
