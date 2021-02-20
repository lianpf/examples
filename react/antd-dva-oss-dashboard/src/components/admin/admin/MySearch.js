/**
 * lianpf 17/08/01.
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
    this.state = {
      params : props.searchParams,
      userName:'',
    };

    this.inputUserNameChange = this.inputUserNameChange.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  inputUserNameChange(event) {
    this.setState({userName: event.target.value});
  }

  handleSearch(event) {
    const { userName } = this.state;
    const params = {
      fullName: userName,
    };

    this.props.handlerSearch(params, event);
  }

  handleReset() {
    this.setState({
      userName: '',
    });
    this.props.handlerReset();
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24} key={'a02'} style={{ textAlign: 'right' }}>
            姓名：
            <Input onChange={this.inputUserNameChange} placeholder={'请输入'} style={{width: 180}} value={this.state.userName}/>
            <Button type="primary" onClick={this.handleSearch} style={{ marginLeft: 8 }}>搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              取消
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

// Search = Form.create()(Search);
export default Search;
