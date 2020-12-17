<template>
<div class="calendar">

</div>
</template>

<script lang="ts">
import {
  Store
} from "vuex";
import {
  Component,
  Vue,
} from 'nuxt-property-decorator';
import nav from "@/components/nav.vue";

@Component
export default class Calendar extends Vue {

}
</script>

<style lang="scss">
@import "../assets/scss/components/_calendar";
</style>
