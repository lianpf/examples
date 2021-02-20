import React, {Component, PropTypes} from 'react';

import { Layout, DatePicker } from 'antd';
const {Content} = Layout;
const { RangePicker } = DatePicker;

import MyBreadcrumb from '../../common/Breadcrumb';
import MyStep from './MyStep';
import DetailPannel from './DetailPannel';
import MyTag from '../../common/MyTag';

import styles from './rechargeBillDetail.less';

class AccountBalance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {
        startDate: '',
        endDate: '',
      },

    };

  }

  componentDidMount() {
    console.log(`--账单明细--`);
    console.log(this.props.params.id);
  }


  render() {
    const arrData = ['财务管理', '充值账单', '账单明细'];
    return (
      <div>
        <Layout style={{ padding: '2px 16px 16px' }}>
          <MyBreadcrumb arrData={arrData}/>
          <Content style={{ background: '#fff', padding: '24px 16px 24px 16px', margin: 0, minHeight: 280 }}>
            <div className={styles.contentTitle}>
              <span className={styles.detailTitle}>充值订单号</span>
              <span className={styles.detailOrderNum}>2016062334521</span>
              <MyTag params={{status: '3', size: '2', text: '交易失败' }} />
            </div>
            <div className={styles.contentStep}>
              <MyStep />
            </div>
            <div className={styles.contentDetail}>
              <div className={styles.detailTitle}>订单详情</div>
              <DetailPannel />
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}

export default AccountBalance;
