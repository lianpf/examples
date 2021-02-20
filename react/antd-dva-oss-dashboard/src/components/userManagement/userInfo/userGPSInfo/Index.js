import React, {Component, PropTypes} from 'react';

import { Row, Col } from 'antd';

import styles from './Index.less';
import MyStep from "../../../common/MyStep";
import MyTable from './MyTable';

import MyDetailPannel from '../../../common/MyDetailPannel';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalNums: 992
    };
  }

  render() {
    return (
      <div className={styles.userChildComponent}>
        <div className={styles.userDetailPannel}>
          <div className={styles.userDetailTitle}>定位信息记录</div>
            <MyTable/>
        </div>
      </div>
    )
  }
}

export default Index;
