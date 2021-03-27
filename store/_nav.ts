import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from "@/store";
import NavItem from '@/types/NavItem';

export interface MyState {
  navItems: Array<NavItem> | null;
}

@Module({
  dynamic: true,
  name: 'NavItemsModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class NavItemsModule extends VuexModule implements MyState {
  navItems: Array<NavItem> = [];
  isOpen: boolean = true
  isMini: boolean = true;

  @Mutation
  setNavItems(navItems: Array<NavItem>) {
    this.navItems = navItems;
  }

  @Mutation
  toggleNavOpen() {
    this.isOpen = !this.isOpen;
  }

  @Mutation
  toggleNavMini() {
    this.isMini = !this.isMini;
  }

  get sortedNavItems(): Array<NavItem> {
    return [...this.navItems].sort((a: NavItem, b: NavItem) => {
      return a.order - b.order;
    });
  }

  get isNavOpen() {
    return this.isOpen;
  }

  get isNavMini() {
    return this.isMini;
  }

}
