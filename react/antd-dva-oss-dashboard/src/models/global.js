import * as menuService from '../services/menu';

export default {
    namespace: 'seed',
    state: {
        seed: Date.now(),
        globalSeed: Date.now(),
    },
    reducers: {
      refresh(state) {
        return {
          ...state, seed: Date.now(),
        };
      },
      refreshBox(state) {
        return {
          ...state, globalSeed: Date.now(),
        }
      }
    },
    effects: {
    },
    subscriptions: {
    },
};
