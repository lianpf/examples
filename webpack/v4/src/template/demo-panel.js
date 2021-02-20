import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, index } = this.props;
    return (
        <div key={index} className={'component-demo-item'}>
          <h4>属性: {item.name}</h4>
          <p>描述: {item.desc}</p>
          <p>字段类型: {item.type}</p>
          <h5>{item.name}属性示例:</h5>
          <p>默认: {item.default}</p>
          {this.props.children}
        </div>
    );
  }
}

export default connect()(Index);

