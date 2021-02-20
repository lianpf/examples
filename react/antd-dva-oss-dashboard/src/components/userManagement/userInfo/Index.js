import React, {Component, PropTypes} from 'react';

import { Layout, DatePicker } from 'antd';
const {Content} = Layout;
const { RangePicker } = DatePicker;

import MyBreadcrumb from '../../common/Breadcrumb';

import MyTabs from '../../common/MyTabs';
import MySearch from './MySearch';

import styles from './Index.less';

import UserBasicInfo from './userBasicInfo/Index';
import UserGPSInfo from './userGPSInfo/Index';
import UserBalanceInfo from './userBalanceInfo';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchUser: '',
      userNum: '',
      totalNums: 992
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.childrenSearchUserChange = this.childrenSearchUserChange.bind(this);
  }

  // search
  handleSearch() {
    const {userNum} = this.state;
    this.setState({
      searchUser: userNum,
    });
  }
  childrenSearchUserChange(userNum) {
    this.setState({
      userNum: userNum,
    })
  }

  componentDidMount() {
    let userNo = '';
    // 路由带参
    if ("userNo" in this.props.params) {
      userNo = this.props.params.userNo;
    }

    this.setState({
      userNum: userNo,
      searchUser: userNo,
    })
  }

  render() {
    const arrData = [
      {name: '用户管理'},
      {name: '用户信息'},
    ];

    const {userNum , searchUser} = this.state;
    console.log(`--parent-userNum--`, userNum);
    const tabsParams = [
      { key: 1, tab: '用户基本信息', component: (<UserBasicInfo userNum={searchUser} status="1" />) },
      { key: 2, tab: '芝麻信用', component: (<div>tab 芝麻信用 开发中...</div>) },
      { key: 3, tab: '通讯录/运营商', component: (<div>tab 通讯录/运营商 开发中...</div>) },
      { key: 4, tab: '第三方信用报告', component: (<div>tab 第三方信用报告 开发中...</div>) },
      { key: 5, tab: 'GPS定位信息', component: (<UserGPSInfo />) },
      { key: 6, tab: '账户余额', component: (<UserBalanceInfo userNum={searchUser} />) },
      { key: 7, tab: '借款/出借记录', component: (<div>tab 借款/出借记录 开发中...</div>) },
    ];

    return (
      <div>
        <Layout style={{ padding: '2px 16px 16px' }}>
          <MyBreadcrumb arrData={arrData} />
          <Content style={{ background: '#fff', padding: '24px 16px 24px 16px', margin: 0, minHeight: 280 }}>
            <div className={styles.contentTitle}>用户信息</div>
            <div className={styles.contentSearch}>
              <MySearch handleSearch={this.handleSearch} userNum={userNum} childrenSearchUserChange={this.childrenSearchUserChange} />
            </div>
            <div className={styles.contentTabs}>
              <MyTabs tabsParams={tabsParams} />
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}

export default Index;
