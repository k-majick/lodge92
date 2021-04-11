import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from "@/store";
import User from '@/types/User';

@Module({
  dynamic: true,
  name: 'usersModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class UsersModule extends VuexModule {
  user: null | User = null;

  @Mutation
  setUser(data: any) {
    this.user = data.user;
  }

  @Mutation
  resetUser() {
    this.user = null;
  }

  get isLogged() {
    return !!this.user;
  }

  get loggedUser() {
    return this.user;
  }

}
