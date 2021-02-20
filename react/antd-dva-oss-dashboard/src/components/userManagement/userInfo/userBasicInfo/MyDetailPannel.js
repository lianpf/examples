/**
 * lianpf 17/7/26
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './MyDetailPannel.less';
import MyTag from '../../../common/MyTag';

import { Form, Row, Col, Input, Button, DatePicker, Select, Icon, Radio } from 'antd';


class MyDetailPannel extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      list:[

    ]
    };
  }

  render () {
    const detailPannelParams = this.props.detailPannelParams;
    const len = detailPannelParams.length;
    /*
    * params
    * detailPannelParams = {name, value}
    * */

    let dd = [];
    dd.push(
      <Row gutter={40}>
        <Col span={6}>
          <Row>
            <Col span={9}>{detailPannelParams[0].name}：</Col>
            <Col span={15}>{detailPannelParams[0].value}</Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={9}>{detailPannelParams[1].name}：</Col>
            <Col span={15}>{detailPannelParams[1].value}</Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={9}>{detailPannelParams[2].name}：</Col>
            <Col span={15}>{detailPannelParams[2].value}</Col>
          </Row>
        </Col>
        <Col span={6}>
          <MyTag params={{
            status: '2',
            size: '2',
            text: `${detailPannelParams[3].name}个月内联系${detailPannelParams[3].value}次`
          }}/>
        </Col>
      </Row>
    );
    dd.push(
      <Row gutter = {40} >
        <Col
          span = {6} >
          < Row >
            < Col
              span = {9} > {detailPannelParams[4].name}：</Col>
            <Col span={15}>{detailPannelParams[4].value}</Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={9}>{detailPannelParams[5].name}：</Col>
            <Col span={15}>{detailPannelParams[5].value}</Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={9}>{detailPannelParams[6].name}：</Col>
            <Col span={15}>{detailPannelParams[6].value}</Col>
          </Row>
        </Col>
        <Col span={6}>
          <MyTag
            params={{status: '2', size: '2', text: `${detailPannelParams[7].name}个月内联系${detailPannelParams[7].value}次`}}/>
        </Col>
      </Row>
    );

    const showPannel = (detailPannelParams[0].value && detailPannelParams[1].value && detailPannelParams[2].value) ? dd : (<div>暂无数据!</div>);
    return (
        <div>
          {showPannel}
        </div>
    )
  }
}

export default MyDetailPannel;
