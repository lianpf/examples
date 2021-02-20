import React, {Component, PropTypes} from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';

class MyBreadcrumb extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const arrData = this.props.arrData;
    return (
      <div>
        <Breadcrumb style={{ margin: '8px 0' }}>
          {
            arrData.map((value, index) => {
              const urlValue = '' || value.urlValue;
              return (
                <Breadcrumb.Item key={index}>
                  <Link to={urlValue}>
                    <span>{value.name}</span>
                  </Link>
                </Breadcrumb.Item>
              );
            })
          }
        </Breadcrumb>
      </div>
    )
  }
}

export default MyBreadcrumb;
