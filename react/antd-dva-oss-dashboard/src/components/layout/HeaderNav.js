/*
* @author lianPf
* @date 17-12-05
* */
import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';
import auth from '../../services/auth';
import styles from './MainLayout.less';

const { SubMenu } = Menu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      activeKey: '',
    };
  }
  // componentWillReceiveProps(props) {
  //   if (props.menus[0] && props.menus[0].appId !== this.state.activeKey) {
  //     this.setState({
  //       activeKey: props.menus[0].appId,
  //     });
  //   }
  // }

  handleClick(e) {
    const menu = this.props.menus.filter(_m => _m.appCode === e.key)[0];
    this.props.dispatch({
      type: 'menu/changeApp',
      payload: { ...menu },
    });
  }

  render() {
    const { appName, menus } = this.props;

    return (
      <div className={styles.headerWrapper}>
        <div
          style={{ minWidth: '13%', height: '48px', float: 'left', lineHeight: '48px', paddingLeft: '22px' }}
        >
          <Icon type="appstore" className={styles.iconHead} />&nbsp;
          <span className={`${styles.headNavSpec}`}>&nbsp;**管理后台</span>
        </div>
        <div className={styles.tabs}>
          <Menu
            onClick={e => this.handleClick(e)}
            mode="horizontal"
            selectedKeys={[this.state.activeModule]}
            className={styles.headNav}
          >
            <SubMenu key="title" title={appName}>
              {
                menus.map((item) => {
                  return( <Menu.Item key={item.appCode} className={styles.headNavItem}>{item.appName}</Menu.Item>);
                })
              }
            </SubMenu>
          </Menu>
        </div>

        <div className={styles.user}>
          <Menu
            mode="horizontal"
            className={styles.headNav}
          >
            <Menu.Item className={` ${styles.pl10} ${styles.introNone}`}>
              <Icon type="user" />
              <span>
                <span
                  onClick={(e) => {
                    auth.Mylogin();
                  }}
                >
            欢迎您,
                 {
                   auth.getUserName()
                 }
                </span>
              </span>
            </Menu.Item>
            <Menu.Item className={` ${styles.pl10} ${styles.introNone}`}>
              <span
                onClick={(e) => {
                  auth.logout();
                }}
              > 退出
                    <Icon type="logout" />
              </span>
            </Menu.Item>
          </Menu>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { appName } = state.menu;
  return { appName };
}

export default connect(mapStateToProps)(Header);
