/*
* @author lianPf
* @date 17-12-05
* */
import React from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';

// import { history } from '../../utils/config'
import { history } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class SiderParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menus: [],
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
    };

    this.menuItemClick = this.menuItemClick.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.activeModule != props.activeModule) {
      const selectOpenKeys = sessionStorage.getItem('selectOpenKeys');
      this.setState({
        activeModule: props.activeModule,
        menus: props.menus,
        defaultOpenKeys: selectOpenKeys,
        defaultSelectedKeys: [],
      });
    }
    /* if (this.state.activeModule != props.activeModule) {
      this.setState({
        activeModule: props.activeModule,
        menus:props.menus,
        defaultOpenKeys:[],
        defaultSelectedKeys:[]
      }, () => {
        this.clickSwitchPage();
      });
    }*/
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  menuItemClick = (e) => {
    this.props.selectMenuItem(e.key, e);
  };

  // menu function
  onOpenChange(openKeys) {
    sessionStorage.setItem('selectOpenKeys', openKeys);
    this.setState({
      defaultOpenKeys: openKeys,
    });
  }
  onSelect(item) {
    sessionStorage.setItem('selectSelectedKeys', item.key);
    const selectedKeys = [];
    selectedKeys.push(item.key);
    this.setState({
      defaultSelectedKeys: selectedKeys,
    });
  }


  render() {
    const { menus, defaultOpenKeys } = this.props;
    // console.log('子item--defaultOpenKeys--', defaultOpenKeys);

    const loopSecondMenu = data => data.map((item) => {
      if (item.navs.length > 0) {
        <SubMenu key={item.id} title={item.key}>
          {loopSecondMenu(item.navs)}
        </SubMenu>;
      }
      return (
        <Menu.Item key={item.id}>
          <Link to={item.value}>
            <span>{item.key}</span>
          </Link>
        </Menu.Item>
      );
    });

    const loopFirstMenu = data => data.map((item) => {
      if (item.navs.length > 0) {
        return (
          <SubMenu key={item.id} title={<span><Icon type="mail" /><span>{item.parentName}</span></span>}>
            {loopSecondMenu(item.navs)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.id}>
          <Link to={item.value}>
            <Icon type="pie-chart" />
            <span>{item.parentName}</span>
          </Link>
        </Menu.Item>
      );
    });

    let openMenuArr = [];
    const selectMenuArr = [];
    const selectOpenKeys = sessionStorage.getItem('selectOpenKeys');
    const selectSelectedKeys = sessionStorage.getItem('selectSelectedKeys');
    console.log('--console-selectOpenKeys--', selectOpenKeys);
    if (selectOpenKeys != ('' || undefined || null)) {
      openMenuArr = selectOpenKeys.split(',');
    }

    selectMenuArr.push(selectSelectedKeys);

    return (
      <div style={{ width: 240 }}>
        <Menu
          defaultSelectedKeys={selectMenuArr}
          defaultOpenKeys={openMenuArr}
          onOpenChange={e => this.onOpenChange(e)}
          onSelect={item => this.onSelect(item)}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed} onClick={this.menuItemClick}
        >
          {loopFirstMenu(menus)}
        </Menu>
      </div>
    );
  }
}


export default SiderParent;
