import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export class State {
}

export const store = new Vuex.Store({
  state: new State()
});
