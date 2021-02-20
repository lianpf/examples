/**
 * lianpf 17/08/01
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './MyTable.less';

import { Table, Icon} from 'antd';

const id = 1;


class MyTable extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      table: {
        bordered: true,
        pagination: true,
      },
    }
  }

  render () {
    const columns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.props.edit(record)}>修改</a>
          <span className="ant-divider" />
          <a onClick={() => this.props.set(record.id)}>设置权限</a>
        </span>
      ),
    }];
    const {pagination, data} = this.props;
    return (
        <div>
          <Table {...this.state.table} style={{'text-align': 'center'}} pagination={pagination} columns={columns} dataSource={data} />
        </div>
    )
  }
}

export default MyTable;
