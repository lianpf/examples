import React, {Component, PropTypes} from 'react';

import { Layout, DatePicker, Button, Row, Col, message} from 'antd';
const {Content} = Layout;
const { RangePicker } = DatePicker;

import Pannel from './Pannel';
import MyTable from './MyTable';
import MySearch from './MySearch';

import styles from './Index.less';
import {fetchGet, fetchPost} from '../../../../utils/request';



class AccountBalance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pannelData: {},
      userNum: props.userNum,
      opType: '0',
      startDate: '',
      endDate: '',
      currentPage: 1,
      pageSize: 10,
      userBalanceList: [],
      totalCount: 100
    };

    this.getBalanceAccount = this.getBalanceAccount.bind(this);
    this.getUserBalanceList = this.getUserBalanceList.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.userNum != props.userNum) {
      this.setState({
        userNum: props.userNum,
      },()=>{
        console.log(`--now-balance-state-`, this.state.userNum);
        // 获取更新list数据
        const {opType, startDate, endDate, currentPage, pageSize, userNum} = this.state;
        const params = {opType, startDate, endDate, currentPage, pageSize, userNum};
        this.getUserBalanceList(params);
        this.getBalanceAccount(userNum);
      })
    }
  }

  // data
  getBalanceAccount(userNum) {
    // console.log(`---balance--`, userNum);
    if (userNum) {
      fetchGet(`/user/balance/${userNum}`).then(json => {
        if (json.code === 0) {
          this.setState({
            pannelData: json.data
          });
        } else {
          message.error(json.msg);
        }
      })
    }
  }
  getUserBalanceList(params) {
    const {userNum, opType, startDate, endDate, currentPage, pageSize} = params;
    const _params = {opType, startDate, endDate};
    if (userNum) {
      fetchPost(`/user/balance/list/${userNum}?currentPage=${currentPage}&pageSize=${pageSize}`, _params).then(json => {
        console.log(`--update-add-00-`);
        if (json.code === 0 ) {
          this.setState({
            userBalanceList: json.data.balaceBillAndBankVoList,
            currentPage: json.page.currentPage,
            pageSize: json.page.pageSize,
            totalCount: json.page.totalCount,
            userNum,
            opType,
            startDate,
            endDate,
          })
        } else {
          message.error(json.msg);
        }
      });
    } else {
      this.setState({
        userNum: '',
        opType: '0',
        startDate: '',
        endDate: '',
        currentPage: 1,
        pageSize: 10,
        userBalanceList: [],
        totalCount: 0
      });
    }
  }

  // table
  nextpage(page) {
    const {userNum, opType, startDate, endDate, pageSize} = this.state;
    const params = {
      userNum,
      opType,
      startDate,
      endDate,
      currentPage: page,
      pageSize,
    }
    this.getUserBalanceList(params);
  }
  showPageSize(current, pageSize) {
    const {userNum, opType, startDate, endDate} = this.state;
    const params = {
      userNum,
      opType,
      startDate,
      endDate,
      currentPage: current,
      pageSize
    }
    this.getUserBalanceList(params);
  }
  tableRowSelect(selectedRowKeys, selectedRows) {
    console.log(`--table-parent--`);
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  // search
  handleSearch(params) {
    const {userNum} = this.state;
    const {rangePicker, opType} = params;
    const startDate = rangePicker[0];
    const endDate = rangePicker[1];
    const _params = {
      userNum,
      opType,
      startDate,
      endDate,
      currentPage: 1,
      pageSize: 10
    }
    console.log(`--parent-search-`, _params);
    this.getUserBalanceList(_params);
  }
  handleReset() {
    this.setState({
      opType: '0',
      startDate: '',
      endDate: '',
      currentPage: 1,
      pageSize: 10
    })
  }

  componentDidMount() {
    const {userNum} = this.props;
    const {opType, startDate, endDate, currentPage, pageSize} = this.state;
    const params = {
      userNum,
      opType,
      startDate,
      endDate,
      currentPage,
      pageSize
    }
    this.getBalanceAccount(userNum);
    this.getUserBalanceList(params);
  }

  render() {
    const {userBalanceList, totalCount, pannelData} = this.state;

    const that = this;
    const pagination = {
      current: that.state.currentPage,
      total: totalCount || 0,
      pageSize: that.state.pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal(total){
        return `总共 ${total} 条`;
      },
      onChange(current) {
        that.nextpage(current)
      },
      onShowSizeChange(current, pageSize) {
        that.showPageSize(current,pageSize)
      }
    };
    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        that.tableRowSelect(selectedRowKeys, selectedRows);
      }
    };

    const {balance, expend, income} = pannelData;
    const pannelParams = {
      list: [
        { name: '  当前余额金额(元)', value: balance},
        { name: '  收入(元)', value: income},
        { name: '  支出(元)', value: expend},
      ],
      isShow: Object.keys(pannelData).length
    }
    return (
      <div className={styles.userChildComponent}>
        <div className={styles.userDetailPannel}>
          {/*<div className={styles}>日汇总账单</div>*/}
          <Pannel params={pannelParams} />
        </div>
        <div className={styles.userDetailPannel}>
          <MySearch handleSearch={this.handleSearch} handleReset={this.handleReset}/>
        </div>
        <div className={styles.userDetailPannel}>
          <Button type="primary" className="styles.btnPrimary">导出</Button><br/>
          <MyTable pagination={pagination} rowSelection={rowSelection} data={userBalanceList}/>
        </div>
      </div>
    )
  }
}

export default AccountBalance;
