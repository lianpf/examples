import React, { Component, PropTypes } from 'react';
import { Table } from 'react-pc-ui';
import {connect} from 'react-redux';


import './index.less';
// import c from '../../src/component/table';

function getChild(props, key) {
  let childDom = null;
  if (key + 1 > React.Children.count(props.children)) {
    return childDom;
  }
  React.Children.forEach(props.children, (child, index) => {
    if (index === key) {
      childDom = React.cloneElement(child);
    }
  });
  return childDom;
}

const columns = [{
  title: '参数',
  dataIndex: 'param',
  key: 'param',
}, {
  title: '说明',
  dataIndex: 'desc',
  key: 'desc',
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '默认值',
  dataIndex: 'default',
  key: 'default',
}];

class Index extends React.Component {
  constructor(props) {
    super(props);
    // this.setState = {
    //   demoDom: getChild(props, 0),
    //   codingDom: getChild(props, 1),
    // };
  }

  render() {
    // let { codingDom, demoDom} = this.state;
    const { options } = this.props;
    return (
        <div className={`show-example-layout`}>
          <h1>{options.title}</h1>
          <p>描述: {options.desc}</p>
          <h2>func</h2>
          <p>{options.func}</p>
          <h2>效果展示</h2>
          {getChild(this.props, 0)}

          <h2>代码展示</h2>
          {getChild(this.props, 1)}

          <h2>API</h2>
          {
            options.api && options.api.length && options.api.map((item, index) => {
              return (
                  <div key={`${item.name}-api-${index}`}>
                    <h4>{item.name}</h4>
                    <Table dataSource={item.dataSource} columns={columns} />
                  </div>
              );
            })
          }
          <Table />
        </div>
    );
  }
}
// function mapStateToProps(state) {
//   const { borrowMoney } = state;
//   return { borrowMoney };
// }

export default connect()(Index);

