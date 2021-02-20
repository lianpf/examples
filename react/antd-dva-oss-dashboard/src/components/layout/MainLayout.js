/*
* @author lianPf
* @date 17-12-05
* */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

import Header from './HeaderNav';
import SiderParent from './SiderParent';
// import ChildComponent from './ChildComponent';

import { fetchPost } from '../../utils/request';
import { message } from 'antd';
import styles from './MainLayout.less';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      menus: [],
      defaultOpenKeys: ['业务管理', '优惠券管理'],
      content: null,
      activeModule: '',
      activeMenuItem: 10,
      applicationList: [],
      menuList: [],
    };

    this.selectMenuItem = this.selectMenuItem.bind(this);
    // this.getMenuData = this.getMenuData.bind(this);
  }

  selectMenuItem(key) {
    console.log(`--父级组件--${key}`);
    this.setState({
      activeMenuItem: key,
    });
  }

  // componentDidMount() {
  //   this.getMenuData();
  // }

  // getMenuData() {
  //   fetchPost('/menu/user', {}).then((json) => {
  //     // let clickActiveModule = sessionStorage.getItem('clickActiveModule');
  //     if (json.code === 200) {
  //       this.setState({
  //         menus: json.data.list,
  //         activeModule: json.data.list[0].parentName,
  //       });
  //       // sessionStorage.setItem('selectSelectedKeys',json.data.list[0].id);
  //     } else {
  //       message.info(json.msg);
  //     }
  //
  //   });
  // }

  changeField(field, value) {
    this.setState({
      [field]: value,
    });
  }

  render() {
    // console.log(`--parent-Component--`, this.state.menus);
    const { applicationList, menuList, appCode } = this.props;
    console.log('--menus-1--', menuList[appCode]);

    return (
      <div className={styles.mainLayout}>
        <div className={styles.headerClass}>
          <Header menus={applicationList} />
        </div>

        <div className={styles.siderNav}>
          <SiderParent menus={menuList[appCode]} activeModule={this.state.activeModule} selectMenuItem={this.selectMenuItem} />
        </div>

        <div className={styles.childrenComponent}>
          <div className={styles.childrenWrapper}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const menu = state.menu;
  const { applicationList, menuList, activeApp, appCode } = menu;
  return { menu, applicationList, menuList, activeApp, appCode };
}

export default connect(mapStateToProps)(MainLayout);
