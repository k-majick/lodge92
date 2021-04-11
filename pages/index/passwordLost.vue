<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('userPasswordRetrieve') }}</h2>
    <FormPasswordLost />
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from 'nuxt-property-decorator';
import FormPasswordLost from '@/components/FormPasswordLost.vue';

@Component
export default class PasswordLost extends Vue {
  private isLogged = this.$store.getters['_user/isLogged'];

  mounted() {
    (this as any).unwatch = this.$store.watch(() => this.$store.getters['_user/isLogged'], isLogged => this.isLogged = isLogged);
  }

  @Watch('isLogged')
  redirect() {
    if (this.isLogged === true)
      this.$router.push(this.localePath('index-reservations'));
  }

  beforeDestroy() {
    (this as any).unwatch();
  }

}
</script>

<style lang="scss">

</style>
