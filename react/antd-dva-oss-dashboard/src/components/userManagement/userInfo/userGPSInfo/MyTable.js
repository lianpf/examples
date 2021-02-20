/**
 * lianpf 17/07/28
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './MyTable.less';

import { Table, Icon} from 'antd';

const columns = [{
  title: '日期',
  dataIndex: 'date',
  key: 'date',
}, {
  title: '定位地址',
  dataIndex: 'position',
  key: 'position',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
},
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

    const data = [{
      date: '2017-07-19 23:35:03',
      position: '浙江省杭州市西湖区文一西路',
      remark: '发起借款',
    },{
      date: '2017-07-19 23:35:03',
      position: '浙江省杭州市西湖区文一西路',
      remark: '打开APP',
    },{
      date: '2017-07-19 23:35:03',
      position: '浙江省杭州市西湖区文一西路',
      remark: '',
    },
    ];

    return (
        <div>
          <Table {...this.state.table} columns={columns} dataSource={data} />
        </div>
    )
  }
}

export default MyTable;
