<template>
<div class="floors main__panel">
  <div class="floors__plan" v-html="floorPlan" v-hover-tooltip="currentRoomName" @roomId="getRoomName"></div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'nuxt-property-decorator';
import rawFloors from '@/assets/gfx/floorplan.svg?raw';
import {
  hoverTooltip
} from '../directives/hoverTooltip';

@Component({
  directives: {
    hoverTooltip,
  },
})
export default class Floors extends Vue {
  private floorPlan = rawFloors;
  private currentRoomName = '';

  @Prop() rooms!: [];
  @Prop() locale!: string;

  @Watch('locale')
  getRoomName(e: any) {
    let room = this.rooms.find(room => (room as any).room_id === e.detail);
    if (room) {
      this.currentRoomName = room![`name_${this.locale}`];
    } else {
      this.currentRoomName = '';
    }
  }

}
</script>

<style lang="scss">
@import "../assets/scss/components/_floors";
</style>
