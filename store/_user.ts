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
  token: null | string = null;

  @Mutation
  setUser(data: any) {
    this.user = data.user;
    this.token = data.jwt;
  }

  @Mutation
  resetUser() {
    this.user = null;
    this.token = null;
  }

  get isLogged() {
    return !!this.token;
  }

  get loggedUser() {
    return this.user;
  }

}
