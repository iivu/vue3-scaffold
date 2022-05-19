import { createStore } from 'vuex';

export default createStore({
  state: {},
  mutations: {
    setState(state, payload) {
      for (let p in payload) {
        if (payload.hasOwnProperty(p)) {
          state[p] = payload[p];
        }
      }
    },
  },
});
