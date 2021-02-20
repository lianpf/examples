/**
 * lianpf 17/7/26
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './MyTable.less';

import { Form, Row, Col, Input, Button, DatePicker, Select, Icon, Radio } from 'antd';


class DetailPannel extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      list:[
        {name: '充值类型', value: '普通充值/交易充值'},
        {name: '关联借款订单', value: '123456789'},
        {name: '充值用户', value: '连/1234567890'},
        {name: '银行卡号', value: '2345678980'},
        {name: '开户行', value: '招商银行'},
        {name: '备注', value: '******'},
        {name: '交易金额', value: '788元'},
        {name: '实际充值金额', value: '456元'},
        {name: '平台手续费', value: '1'},
        {name: '三方支付手续费', value: '1'},
        {name: '交易创建时间', value: '2017-09-19 13:23'},
        {name: '交易成功时间', value: '2017-10-27 15:08'},
    ]
    };
  }

  render () {
    return (
        <div>
          <Row gutter={40}>
            <Col span={8}>
                <Row>
                    <Col span={9}>{this.state.list[0].name}：</Col>
                    <Col span={15}>{this.state.list[0].value}</Col>
                </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[1].name}：</Col>
                <Col span={15}>{this.state.list[1].value}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[2].name}：</Col>
                <Col span={15}>{this.state.list[2].value}</Col>
              </Row>
            </Col>
          </Row><br/>
          <Row gutter={40}>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[3].name}：</Col>
                <Col span={15}>{this.state.list[3].value}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[4].name}：</Col>
                <Col span={15}>{this.state.list[4].value}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[5].name}：</Col>
                <Col span={15}>{this.state.list[5].value}</Col>
              </Row>
            </Col>
          </Row><br/>
          <Row gutter={40}>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[6].name}：</Col>
                <Col span={15}>{this.state.list[6].value}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[7].name}：</Col>
                <Col span={15}>{this.state.list[7].value}：</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[8].name}：</Col>
                <Col span={15}>{this.state.list[8].value}</Col>
              </Row>
            </Col>
          </Row><br/>
          <Row gutter={40}>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[9].name}：</Col>
                <Col span={15}>{this.state.list[9].value}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[10].name}：</Col>
                <Col span={15}>{this.state.list[10].value}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{this.state.list[11].name}：</Col>
                <Col span={15}>{this.state.list[11].value}</Col>
              </Row>
            </Col>
          </Row><br/>
        </div>
    )
  }
}

export default DetailPannel;
