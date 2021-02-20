import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import auth from './services/auth';

import { history } from './utils/config';

import MainLayout from './components/layout/MainLayout';
import Home from './components/home/Home';
import Login from './components/login/Login';

// 用户管理
import UserInfo from './components/userManagement/userInfo/Index';

// 系统管理
import SysMenuList from './components/admin/menu/Index';
import SysRoleList from './components/admin/role/Index';
import SysAdminList from './components/admin/admin/Index';

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default function ({ history }) {
  return (
    <Router history={history}>

      {/* 登录 -- /login放在 "/"route内部，会出现递归问题 */}
      <Route path="/login" component={Login} />

      {/* onEnter={requireAuth} */}
      <Route path="/" component={MainLayout} onEnter={requireAuth} >

        <IndexRoute component={Home} />
        {/* 首页 */}
        <Route path="home" component={Home} />

        {/* 用户管理 */}
        <Route path="userManagement">
          <Route path="userInfo" component={UserInfo} />
          <Route path="userInfo/:userNo" component={UserInfo} />
        </Route>

        {/* 系统管理 */}
        <Route path="systemManagement">
          <Route path="menu" component={SysMenuList} />
          <Route path="role" component={SysRoleList} />
          <Route path="admin" component={SysAdminList} />
        </Route>

      </Route>
    </Router>
  );
};
