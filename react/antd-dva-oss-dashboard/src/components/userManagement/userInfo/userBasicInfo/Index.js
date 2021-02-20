import React from 'react';

import { Row, Col } from 'antd';

import styles from './Index.less';
import MyStep from '../../../common/MyStep';
import MyTable from './MyTable';

import MyDetailPannel from '../../../common/MyDetailPannel';
import { fetchGet } from '../../../../utils/request';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userImg: '',
      userNum: props.userNum,
      status: props.status,
      statusHistoryList: [],
      userBasicInfoVo: {},
      userWorkVo: {},
      userFamilyContactVo: {},
      userFriendContactVo: {},
      userBankInfoList: [],
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.showDiffTypeBasicInfo = this.showDiffTypeBasicInfo.bind(this);
  }
  componentDidMount() {
    const { userNum } = this.props;
    this.getUserInfo(userNum);
  }
  componentWillReceiveProps(props) {
    if (this.state.userNum !== props.userNum || this.state.status !== props.status) {
      this.setState({
        userNum: props.userNum,
        status: props.status,
      }, () => {
        // 获取更新list数据
        this.getUserInfo(props.userNum);
      });
    }
  }
  // data
  getUserInfo(userNo) {
    if (userNo.length) {
      fetchGet(`/user/info/${userNo}`).then((json) => {
        if (json.code === 0) {
          let userFamilyContactVo = {};
          let userFriendContactVo = {};
          let userImg = '';
          const { userStatusList, userBasicInfoVo, userWorkVo, userBankInfoList } = json.data;
          if (json.data.userEmergencyContactVo) {
            userFamilyContactVo = json.data.userEmergencyContactVo.userFamilyContactVo;
            userFriendContactVo = json.data.userEmergencyContactVo.userFriendContactVo;
          }
          if (json.data.userBasicInfoVo) {
            userImg = json.data.userBasicInfoVo.avatar;
          }
          this.setState({
            userImg,
            userFamilyContactVo,
            userFriendContactVo,
            statusHistoryList: userStatusList,
            userBasicInfoVo: userBasicInfoVo || {},
            userWorkVo: userWorkVo || {},
            userBankInfoList: userBankInfoList || {},
          });
        }
      });
    } else {
      this.setState({
        userImg: '',
        statusHistoryList: [],
        userBasicInfoVo: {},
        userWorkVo: {},
        userFamilyContactVo: {},
        userFriendContactVo: {},
        userBankInfoList: [],
      });
    }
  }

  showDiffTypeBasicInfo(status, stepParams) {
    if (status === '1') {
      return (
        <div className={styles.useBasicStep}>
          <Row>
            <Col span={2}><img src={this.state.userImg} style={{ width: '61px', height: '61px' }} alt="" /></Col>
            <Col span={22} style={{ 'padding-top': '12px' }}><MyStep stepParams={stepParams} /></Col>
          </Row>
        </div>
      );
    } else {
      return '';
    }
  }

  render() {
    const { statusHistoryList, userBasicInfoVo, userWorkVo, userFamilyContactVo, userFriendContactVo, userBankInfoList, status } = this.state;
    const { userName, identityNo, identityNoLocation, mobile, mobileLocation, mobileCarrier } = userBasicInfoVo;
    const { qq, education, marriageStatus, liveDetailAddress, liveDuration } = userBasicInfoVo;
    const detailPannelParams = {
      list: [
        { name: '姓名', value: userName },
        { name: '身份证号', value: identityNo },
        { name: '身份证地址', value: identityNoLocation },
        { name: '手机号', value: mobile },
        { name: '手机号归属地', value: mobileLocation },
        { name: '手机号运营商', value: mobileCarrier },
        { name: 'QQ号', value: qq },
        { name: '学历', value: education },
        { name: '婚姻状况', value: marriageStatus },
        { name: '居住地址', value: liveDetailAddress },
        { name: '居住时长', value: `${liveDuration}个月` },
      ],
      isShow: Object.keys(userBasicInfoVo).length,
    };

    const { carrerType, salary, payDay, companyName, companyDetailAddress } = userWorkVo;
    const detailWorkParams = {
      list: [
        { name: '职业', value: carrerType },
        { name: '月收入', value: `${salary} 元` },
        { name: '发薪日', value: `每月${payDay}日` },
        { name: '公司名称', value: companyName },
        { name: '公司地址', value: companyDetailAddress },
      ],
      isShow: Object.keys(userWorkVo).length,
    };

    const familyContactName = userFamilyContactVo.contactName;
    const familyName = userFamilyContactVo.name;
    const familyMobile = userFamilyContactVo.mobile;
    const friendContactName = userFriendContactVo.contactName;
    const friendName = userFriendContactVo.name;
    const friendMobile = userFriendContactVo.mobile;
    const contactUserParams = {
      list: [
        { name: '直系亲属', value: familyContactName },
        { name: '姓名', value: familyName },
        { name: '手机号', value: familyMobile },
        { name: '同事朋友', value: friendContactName },
        { name: '姓名', value: friendName },
        { name: '手机号', value: friendMobile },
      ],
      isShow: (Object.keys(userFamilyContactVo).length || Object.keys(userFriendContactVo).length),
    };

    const stepParams = {
      statusHistoryList,
      current: statusHistoryList.length,
      status: 'wait',
    };
    return (
      <div className={styles.userChildComponent}>
        {this.showDiffTypeBasicInfo(status, stepParams)}
        <div className={styles.userDetailPannel}>
          <div className={styles.userDetailTitle}>用户基础信息</div>
          <MyDetailPannel detailPannelParams={detailPannelParams} />
        </div>
        <div className={styles.userDetailPannel}>
          <div className={styles.userDetailTitle}>工作信息</div>
          <MyDetailPannel detailPannelParams={detailWorkParams} />
        </div>
        <div className={styles.userDetailPannel}>
          <div className={styles.userDetailTitle}>紧急联系人</div>
          <MyDetailPannel detailPannelParams={contactUserParams} />
          {/* <DetailPannel detailPannelParams={contactUserParams}/>*/}
        </div>
        <div className={styles.userDetailPannel}>
          <div className={styles.userDetailTitle}>银行卡列表</div>
          <MyTable data={userBankInfoList} />
        </div>
      </div>
    );
  }
}

export default Index;
