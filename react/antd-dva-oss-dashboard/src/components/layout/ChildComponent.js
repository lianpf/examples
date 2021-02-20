import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';

import Home from '../home/Home';

import { history } from '../../utils/config';

const SubMenu = Menu.SubMenu;

class ChildComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      menus: [],
      defaultOpenKeys: [],
      activeModule: null,
      urlValue: '',
      defaultSelectedKeys: [],
      showIndex:false,
      activeMenuItem: 10,
    };

    this.createSubMenuContent = this.createSubMenuContent.bind(this);
  }

  /*componentWillReceiveProps(props) {
      if (this.state.activeModule != props.activeModule) {
        this.setState({
          activeModule: props.activeModule,
          menus:props.menus,
          defaultOpenKeys:[],
          defaultSelectedKeys:[]
        }, () => {
          this.clickSwitchPage();
        });
    }
  }*/



  createSubMenuContent(activeMenuItem) {
    console.log(`--childComponent--${activeMenuItem}`);

    if(activeMenuItem === 10) {
      history.push('/home');
    }if(activeMenuItem === 41) {
      history.push('/login');
    }
    this.setState({activeMenuItem: activeMenuItem});
  }

  componentDidMount() {
    console.log(`--childComponent--000--`);
    const {activeMenuItem} = this.props;
    this.createSubMenuContent(activeMenuItem);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let bool = false;
    if (nextProps.activeMenuItem != this.state.activeMenuItem) {
      console.log(`--childComponent--更新--${nextProps.activeMenuItem}`);
      this.createSubMenuContent(nextProps.activeMenuItem);
      bool = true;
    }
    return bool;

  }
  render() {


    return (
      <div>
        {/*<Home />*/}
      </div>
    );
  };
}



export default ChildComponent;
