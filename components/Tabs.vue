<template>
<div class="tabs">
  <ul class="tabs__list">
    <li class="tabs__item" v-for="(tab, index) in tabs" :key="tab.title" @click="selectTab(index)" :class="{'tabs__item--selected': (index === selectedIndex)}">
      {{ tab.title }}
    </li>
  </ul>
  <slot></slot>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';

@Component
export default class Tabs extends Vue {
  selectedIndex = 0;
  tabs: any[] = [];

  mounted() {
    this.tabs = this.$children.filter(el => (el as any).tag !== 'a');
    this.selectTab(0);
  }

  selectTab(i: number) {
    this.selectedIndex = i;
    this.tabs.forEach((tab, index) => {
      tab.isActive = (index === i)
    });
    
    this.$emit('tabChanged');
  }
}
</script>

<style lang="scss">
@import "../assets/scss/components/_tabs";
</style>
