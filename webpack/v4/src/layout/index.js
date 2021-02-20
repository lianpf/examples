import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import HomePage from '../homePage/index';
import Button from '../button/index';
import Message from '../message/index';
import Countdown from '../countdown/index';

import './index.less';
import RedArrow from './img/redArrow.png';
import names from 'classnames';

import { getUrl } from '../utils/index';
// import { Button } from "../../src/index";

/**
 * 懒加载或者按需加载
 * 
 * */

const menuListConfig = [
  {
    isShow: true,
    text: '组件库',
    path: '/component',
    exact: true,
    main: () => <HomePage />
  },
  {
    isShow: true,
    text: 'Button 按钮',
    path: '/component/button',
    exact: true,
    main: () => <Button />,
    // main: () => import ('../button/index'),
  },
  {
    isShow: true,
    text: 'Countdown 倒计时',
    path: '/component/countdown',
    exact: true,
    main: () => <Countdown />
  },
  {
    isShow: true,
    text: 'Message 全局提示',
    path: '/component/message',
    exact: true,
    main: () => <Message />
  }
];

let routes = [];
menuListConfig.length && menuListConfig.map(({isShow, path, exact, main}) => {
  if (!isShow) {
    return
  }
  const childRouter = {
    path,
    exact,
    main,
  };
  routes.push(childRouter);
});

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location: {pathname} } = this.props;

    const activeUrl = pathname;
    // console.log('--activeUrl--', activeUrl);

    return (
        <div className={`layout`} >
          <div className={`header`}>
            <div className={'logo'}>
              react-pc-ui
            </div>
          </div>
          <div className={`leftMenu`}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {
                menuListConfig.map((item, index) => {
                  if (item.isShow) {
                    return (
                        <li key={index} className={names(`menuItem ${item.path === pathname ? `activeItem` : ''}`)} >
                          <Link to={item.path}>{item.text}</Link>
                        </li>
                    )
                  }
                })
              }
            </ul>
          </div>
          <div className={`rightContent`}>
            <Router>
              <Switch>
                {
                  routes.map((route, index) => {
                    return <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                  })
                }
              </Switch>
            </Router>
          </div>
        </div>
    );
  }
}
// function mapStateToProps(state) {
//   const { activeItemUrl, userAccountAuth, cashAmt, award, creditsNum, showVerifyConfirm } = state.accountMenu;
//   return { activeItemUrl, userAccountAuth, cashAmt, award, creditsNum, riskTest: state.riskTest, showVerifyConfirm };
// }

export default connect()(Index);
