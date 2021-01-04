import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from "@/store";

@Module({
  dynamic: true,
  name: 'modalsModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class ModalsModule extends VuexModule {
  loginModalActive = false;

  @Action({ rawError: true })
  loginModalEnable() {
    this.context.commit('loginModalSwitch', true);
  }

  @Action({ rawError: true })
  loginModalDisable() {
    this.context.commit('loginModalSwitch', false);
  }

  @Mutation
  loginModalSwitch(isActive: boolean) {
    console.log('isActive? ' + isActive)
    this.loginModalActive = isActive;
  }

  get isLoginModalActive() {
    return this.loginModalActive;
  }

}
