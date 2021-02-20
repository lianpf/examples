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
      pagination: {},
    }

    this.nextpage = this.nextpage.bind(this);
    this.showPageSize = this.showPageSize.bind(this);
  }

  nextpage(page) {
    console.log(`--00--${page}`);
  }
  showPageSize(current, pageSize) {
    console.log(`--currentPage-${current}--|--pageSize-${pageSize}`);
  }

  render () {

    const columns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '菜单代码',
      dataIndex: 'menuNo',
      key: 'menuNo',
    }, {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    }, {
      title: '父菜单代码',
      dataIndex: 'parentMenuNo',
      key: 'parentMenuNo',
    }, {
      title: 'URL',
      dataIndex: 'menuUrl',
      key: 'menuUrl',
    }, {
      title: '是否启用',
      dataIndex: 'disable',
      key: 'disable',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.props.editMenu(record.id)}>修改</a>
          <span className="ant-divider" />
          <a onClick={() => this.props.deleteMenu(record.id)}>删除</a>
        </span>
      ),
    }];

    const data = [{
      id: 1,
      menuNo: 1,
      menuName: '首页',
      parentMenuNo: 0,
      menuUrl: '/home',
      disable: '禁用',
    },{
      id: 2,
      menuNo: 2,
      menuName: '系统管理',
      parentMenuNo: 0,
      menuUrl: '/system',
      disable: '启用',
    },{
      id: 3,
      menuNo: 3,
      menuName: '菜单管理',
      parentMenuNo: 2,
      menuUrl: '/system/menu',
      disable: '启用',
    },{
      id: 4,
      menuNo: 4,
      menuName: '角色管理',
      parentMenuNo: 2,
      menuUrl: '/system/role',
      disable: '启用',
    },{
      id: 5,
      menuNo: 5,
      menuName: '财务管理',
      parentMenuNo: 0,
      menuUrl: '/finance',
      disable: '启用',
    },

    ];

    const that = this;
    const pagination = {
      total: 100 || 0,
      pageSize: 10,
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

    return (
        <div>
          <Table {...this.state.table} style={{'text-align': 'center'}} pagination={pagination} columns={columns} dataSource={data} />
        </div>
    )
  }
}

export default MyTable;
