import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from "@/store";

@Module({
  dynamic: true,
  name: 'usersModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class UsersModule extends VuexModule {
  get isLogged() {
    return this.context.rootState.auth.loggedIn;
  }

  get loggedUser() {
    return this.context.rootState.auth.user;
  }
}
