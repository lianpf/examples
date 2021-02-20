/**
 * lianpf 17/7/26
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './MyDetailPannel.less';

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
    const {list, isShow} = detailPannelParams;
    const len = list.length;
    /*
    * params
    * detailPannelParams = {name, value}
    * */
    let dd = [];
    list.map((value, index) => {
      if(index % 3 === 0 && ((index + 3) < len)){
        dd.push(<Row gutter={40}>
            <Col span={8} className={Styles.pannelCol}>
              <Row>
                <Col span={9}>{list[index].name}：</Col>
                <Col span={15}>{list[index].value}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{list[index + 1].name}：</Col>
                <Col span={15}>{list[index + 1].value}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={9}>{list[index + 2].name}：</Col>
                <Col span={15}>{list[index + 2].value}</Col>
              </Row>
            </Col>
          </Row>
        )
      }

      if(index % 3 === 0 && ((index + 3) >= len)) {
        if(len % 3 === 1) {
          dd.push(<Row gutter={40}>
              <Col span={8}>
                <Row>
                  <Col span={9}>{list[index].name}：</Col>
                  <Col span={15}>{list[index].value}</Col>
                </Row>
              </Col>
            </Row>
          )
        } else if(len % 3 === 2) {
          dd.push(<Row gutter={40}>
              <Col span={8}>
                <Row>
                  <Col span={9}>{list[index].name}：</Col>
                  <Col span={15}>{list[index].value}</Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={9}>{list[index + 1].name}：</Col>
                  <Col span={15}>{list[index + 1].value}</Col>
                </Row>
              </Col>
            </Row>
          )
        } else if (len % 3 === 0) {
          dd.push(<Row gutter={40}>
              <Col span={8}>
                <Row>
                  <Col span={9}>{list[index].name}：</Col>
                  <Col span={15}>{list[index].value}</Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={9}>{list[index + 1].name}：</Col>
                  <Col span={15}>{list[index + 1].value}</Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={9}>{list[index + 2].name}：</Col>
                  <Col span={15}>{list[index + 2].value}</Col>
                </Row>
              </Col>
            </Row>
          )
        }
      }
    })

    const showPannel = isShow ? dd : (<div>暂无数据!</div>);
    return (
        <div>
          {showPannel}
        </div>
    )
  }
}

export default MyDetailPannel;
