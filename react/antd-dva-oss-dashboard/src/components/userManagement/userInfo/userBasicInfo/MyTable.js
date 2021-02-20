/**
 * lianpf 17/07/28
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './MyTable.less';

import { Table, Icon} from 'antd';

const columns = [{
  title: '银行卡号',
  dataIndex: 'number',
  key: 'number',
}, {
  title: '开户行',
  dataIndex: 'bankName',
  key: 'bankName',
}, {
  title: '预留手机号',
  dataIndex: 'mobile',
  key: 'mobile',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '绑定时间/解绑时间',
  dataIndex: 'bindDate',
  key: 'bindDate',
  render: (text, recode) => {
    if (recode.unbundDate) {
      return(<span>{recode.bindDate} / {recode.unbundDate}</span>)
    } else {
      return(<span>{recode.bindDate}</span>)
    }
  }
}
];

class MyTable extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      table: {
        bordered: true,
        pagination: false,
      },
    }
  }

  render () {

    const {data} = this.props;
    return (
        <div>
          <Table {...this.state.table} columns={columns} dataSource={data} />
        </div>
    )
  }
}

export default MyTable;
