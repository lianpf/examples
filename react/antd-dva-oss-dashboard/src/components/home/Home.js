import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
// import { fetchPost } from '../../utils/request'
import styles from './Home.less';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      menus: [],
      activeModule: ""
    };
  }

  componentDidMount() {
    console.log(`--home--`);
  }

  render() {
    return (
      <div>home 待开发 ...</div>
    );
  }
}



export default Home;
