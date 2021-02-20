/**
 * lianpf 17/07/29.
 */

import React, { Component, PropTypes } from 'react'
import { Form, Row, Col, Input, Button, DatePicker, Select, Icon, Radio } from 'antd';

import {fetchPost} from '../../../utils/request';
import moment from 'moment';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
class Search extends React.Component {

  constructor (props) {
    super(props);

    this.inputUserNumChange = this.inputUserNumChange.bind(this);
  }

  inputUserNumChange(event) {
    this.props.childrenSearchUserChange(event.target.value, event);
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8} key={'a02'}>
            身份标识：&nbsp;&nbsp;&nbsp;
            <Input placeholder={'请输入注册手机号或者身份证号'} style={{'width': '70%'}} onChange={this.inputUserNumChange} value={this.props.userNum}/>
          </Col>
          <Col span={10}>
            <Button type="primary" onClick={this.props.handleSearch}>搜索</Button>
          </Col>
        </Row><br/>
        <Row>
        </Row>
      </div>
    );
  }
}

// Search = Form.create()(Search);
export default Search;
