/**
 * lianpf 17/08/01
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
    const columns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '账号',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '姓名',
      dataIndex: 'fullName',
      key: 'fullName',
    }, {
      title: '类型',
      dataIndex: 'typeMsg',
      key: 'typeMsg',
    }, {
      title: '手机号',
      dataIndex: 'mobilephone',
      key: 'mobilephone',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.props.editMenu(record)}>修改</a>
        </span>
      ),
    }];

    const {pagination, rowSelection, data} = this.props;
    return (
        <div>
          <Table {...this.state.table} style={{'text-align': 'center'}} pagination={pagination} columns={columns} dataSource={data} />
        </div>
    )
  }
}

export default MyTable;
