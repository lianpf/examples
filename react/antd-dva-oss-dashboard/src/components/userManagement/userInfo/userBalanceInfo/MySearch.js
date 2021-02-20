/**
 * lianpf 17/08/01.
 */

import React, { Component, PropTypes } from 'react'
import { Form, Row, Col, Input, Button, DatePicker, Select, Icon, Radio } from 'antd';

import {fetchPost} from '../../../../utils/request';
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
      rangePicker: '',
      rangePickerStr: '',
      tradeType: '0',
    };

    this.rangerPickerChange = this.rangerPickerChange.bind(this);
    this.selectTradeTypeChange = this.selectTradeTypeChange.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  rangerPickerChange(date, dateString) {
    console.log(dateString);
    console.log(date);
    this.setState({
      rangePicker: date,
      rangePickerStr: dateString
    });
  }

  selectTradeTypeChange(value) {
    console.log(`--tradeStatus--${value}`);
    this.setState({tradeType: value});
  }


  handleSearch(event) {
    const { rangePickerStr, tradeType } = this.state;
    const params = {
      rangePicker: rangePickerStr,
      opType: tradeType,
    };
    console.log(`-searchParams--${JSON.stringify(params)}`);
    this.props.handleSearch(params, event);
  }

  handleReset() {
    this.setState({
      rangePicker: '',
      rangePickerStr: '',
      tradeType: '',
    });
    this.props.handleReset();
  }

  render() {
    return (
      <div>
        <Row gutter={40}>
          <Col span={8} key={'a01'}>
            交易时间：<RangePicker onChange={this.rangerPickerChange} value={this.state.rangePicker} style={{'width': '75%'}} />
          </Col>
          <Col span={6} key={'a04'}>
            <Row gutter={8}>
              <Col span={8} style={{'height': '28px', 'line-height': '28px'}}>交易类型:</Col>
              <Col span={16}>
                <Select placeholder="请选择" style={{width: 100}} onChange={this.selectTradeTypeChange} value={this.state.tradeType}>
                  <Option key={13} value="0">支出</Option>
                  <Option key={11} value="1">收入</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Button type="primary" onClick={this.handleSearch}>搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              取消
            </Button>
          </Col>
        </Row><br/>
      </div>
    );
  }
}

// Search = Form.create()(Search);
export default Search;
