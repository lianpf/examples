import React from 'react';
import fetch from 'dva/fetch';
import { Form, Row, Col, Input, Button, Card, Icon, Checkbox } from 'antd';
import {connect} from 'dva';

import auth from '../../services/auth';
import { history } from '../../utils/config';
import Styles from './Index.less';
import { fetchGetNoToken } from '../../utils/request.js';


const FormItem = Form.Item;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      verificationCodeUrl: '',
      imgCodeId: '',
    }
    this.getVerificationCode = this.getVerificationCode.bind(this);
  }

  componentDidMount() {
    console.log('--haha--');
    this.getVerificationCode();
  }

  getVerificationCode() {
    console.log('--点击图片获取新的验证码2222--');
    this.props.dispatch({
      type: 'login/getImgCode',
      payload: {},
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { account, password, verificationCode } = values;
        const verifycode = verificationCode;
        const { imgCodeId } = this.state;

        localStorage.accessToken = 'a34567dg44';
        localStorage.userName = 'testAdmin';
        history.push('/');

        // this.props.dispatch({
        //   type: 'login/submit',
        //   payload: {
        //     params: { account, password, verifycode, imgCodeId },
        //   },
        // });

        // auth.login(account, password, verifycode, imgCodeId, (loggedIn)=> {
        //   if (loggedIn) {
        //     console.log(`--login-success--`);
        //     history.push('/')
        //   }
        // })
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const verificationCodeUrl = this.props.codeImg;
    // const verificationCodeUrl = this.props.codeImg;
    // const verificationCodeUrl = '';

    console.log(`--loginTestDva/Login-verificationCodeUrl--`, verificationCodeUrl);
    console.log(`--loginTestDva/Login-getFieldDecorator--`, getFieldDecorator);


    return (
        <div className={Styles.backgroundWrapper}>
          <div className={Styles.loginWrapper}>
            <Card title="管理员登录">
              <Form style={{ width: 300, margin: 'auto' }} onSubmit={this.handleSubmit} className={Styles.loginForm}>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                  )}
                </FormItem>
                <Row gutter={32}>
                  <Col span={12}>
                    <FormItem>
                      {getFieldDecorator('verificationCode', {
                        rules: [{ required: true, message: '请输入验证码!' }],
                      })(
                        <input style={{width: '100%',}} type="text" placeholder="验证码" />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <img src={verificationCodeUrl} alt="" onClick={this.getVerificationCode} style={{width: '100%', height: '40px'}}/>
                  </Col>
                </Row>
                <FormItem className={Styles.verCode}>
                  <Button type="primary" htmlType="submit" className={Styles.loginFormButton}>
                    登录
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </div>
        </div>
    );
  }
}

Login = Form.create()(Login);

function mapStateToProps(state) {
  const { modalParams, captchap, mobile, verifyCode, getCodeSta, token, baichuanPwd, baichuanUserId, codeImg, imgCodeId, getCodeText, countDownStatus } = state.login;
  return { modalParams, captchap, mobile, verifyCode, getCodeSta, token, baichuanPwd, baichuanUserId, codeImg, imgCodeId, getCodeText, countDownStatus };
}

export default connect(mapStateToProps)(Login);

