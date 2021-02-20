/**
 * Created by ziyu on 17/4/13.
 */
import { fetchPostForm } from '../utils/request'
// import Loading from '../components/common/components/Loading'
import fetch from 'dva/fetch';
import auth from '../services/auth';

import { fetchGetNoToken } from '../utils/request.js';


export default {
  namespace: 'login',
  state: {
    modalParams: {
      title: '',
      text: '',
      okText: '',
      visible: false,
    },
    captchap: '',
    mobile: '',
    verifyCode: '',
    getCodeSta: true,
    token: '',
    codeImg: '',
    getCodeText: '获取验证码',
    countDownStatus: 0,
  },
  reducers: {
    save(state, { payload }) {
      // console.log({...state,...payload});
      return { ...state, ...payload };
    },
    save(state, { payload }) {
      // console.log({...state,...payload});
      return { ...state, ...payload };
    },
  },
  effects: {
    *getImgCode({ payload }, { call, put }) {
      console.log(`--getImgCode--00--`)
      function GetData() {
        const data = fetchGetNoToken('/admin/verifycode', {});
        return data;
      }
      function consoleLog(data) {
        console.log(`--getImgCode--01--`, data);
      }
      const res = yield call(GetData);
      yield consoleLog(res);
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {
            codeImg: `data:image/png;base64,${res.data.imgBase64Encoder}`,
            imgCodeId: res.data.imgCodeId,
          },
        });
      }
    },

    *submit({ payload: { params } }, { call, put }) {
      function GetData() {
        return (
          auth.login(...params, (loggedIn) => {
            if (loggedIn) {
              console.log(`--login-success--`);
              history.push('/');
            }
          }))
      }
      let data = yield call(GetData);
      if(data.code == 0) {
        Loading.hideLoading()
        yield put({
          type: 'save',
          payload: {
            token: data.data.token,
            baichuanPwd: data.data.baichuanPwd,
            baichuanUserId: data.data.baichuanUserId
          }
        });
      } else {
        Loading.hideLoading()
        yield put({
          type: 'save',
          payload: {
            modalParams: {
              visible: true,
              text: data.msg
            }
          }

        })
      }


    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

      });
    },
  },
};
