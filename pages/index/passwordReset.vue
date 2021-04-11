<template>
<section class="main__section">
  <div class="container">
    <h2>{{ $tc('userPasswordReset') }}</h2>
    <FormPasswordReset />
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from 'nuxt-property-decorator';
import FormPasswordReset from '@/components/FormPasswordReset.vue';

@Component
export default class PasswordReset extends Vue {
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
