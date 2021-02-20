import { message } from 'antd';
import fetch from 'dva/fetch';
import { origin, history } from '../utils/config';

class auth {
  // 参数params { account, password, verifyCode, imgCodeId }
  login(account, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.accessToken) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    serverLogin(account, password, (res) => {
      if (res.authenticated) {
        localStorage.accessToken = res.accessToken;
        localStorage.userName = res.userName;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    });
  }


  getToken() {
    return localStorage.accessToken;
  }

  getUserName() {
    return localStorage.userName;
  }

  logout(cb) {
    delete localStorage.accessToken;
    delete localStorage.userName;
    if (cb) cb();
    history.push('/login');
    this.onChange(false);
  }


  loggedIn() {
    return !!localStorage.accessToken;
  }


  onChange() {

  }
}


function serverLogin(account, password, cb) {
  fetch(`${origin}/account/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      account,
      password,
    }),
  }).then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        cb({
          authenticated: true,
          accessToken: json.data.accessToken,
          userName: json.data.name,
        });
      } else {
        cb({
          authenticated: false,
        });
        message.error(json.msg);
      }
    });
}


export default new auth();
