// import * as menuService from '../services/menu';

import menus from '../../mock/menu.json';

const { applicationList, menuList, activeApp } = menus;


export default {
  namespace: 'menu',
  state: {
    appId: '1',
    appName: '业务线-a',
    appCode: 'sdzz',
    account: '',
    applicationList,
    menuList,
    activeApp,
  },
  reducers: {
    changeApp(state, { payload }) {
      return {
        ...state, ...payload,
      };
    },
  },
  effects: {
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'users/fetch',
          });
        }
      });
    },
  },
};
