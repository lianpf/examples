/**
 * lianpf 17/08/01.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './MyTable.less';

import { Table, Icon} from 'antd';

class MyTable extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      table: {
        bordered: true,
        pagination: true,
      },
      pagination: {},
    }

  }

  render () {
    const {pagination, rowSelection, data} = this.props;
    const columns = [{
      title: '交易日期时间',
      dataIndex: 'gmtCreate',
      key: 'tradeDate',
    }, {
      title: '交易明细',
      dataIndex: 'comment',
      key: 'tradeDetail',
    }, {
      title: '交易金额',
      dataIndex: 'amount',
      key: 'tradeMoney',
    }, {
      title: '账户余额',
      dataIndex: 'currentBalance',
      key: 'accountBalance',
    }, {
      title: '关联支付商户单号',
      dataIndex: 'orderNo',
      key: 'linkSellerOrderNum',
    }, {
      title: '银行卡号',
      dataIndex: 'number',
      key: 'bankAccount',
    },{
      title: '开户行',
      dataIndex: 'name',
      key: 'openBank',
    }
    ];

    console.log(`--data--`, data);
    return (
        <div>
          <Table {...this.state.table} pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    )
  }
}

export default MyTable;
