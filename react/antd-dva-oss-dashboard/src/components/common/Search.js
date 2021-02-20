/**
 * Created by ziyu on 17/3/9.
 */

import React, { Component, PropTypes } from 'react'
import { Form, Input, Button, DatePicker, Select, Icon, Radio } from 'antd';
import {fetchPost} from '../../utils/request';
import Styles from './search.less';
import moment from 'moment';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
class Search extends React.Component {

  /*
  父元素传递参数格式
   {
     list: [
       {
       name: 'label名称',
       type: '控件类型(select text range buttonRadio search group)',
       key: '参数字段'(若为range, 传入数组['startDate','endDate'] 若为group 传入数组['findtype','inputValue']),
       className: '控件样式,多个样式以空格分割',
       values: [] //若是select,buttonRadio多传一个空数组接收options的值
       }
     ],
     api: '获取数据接口地址'
   }
   */
  constructor (props) {
    super(props);
    this.state = {
      params : props.searchParams,
      data: {},
      initStates: {}
    };
  }

  componentDidMount () {
    if(this.state.params.api) {
      fetchPost(`${this.state.params.api}`).then((res) => {
        this.state.params.list.forEach((value, index) => {
          for(let i in res.data) {
            switch (value.type) {
              case 'group':
                if(value.key[0] == i) {
                  value.values = value.values.concat(res.data[i]);
                }
                break;

              case 'range':
                value.values = [
                  moment().subtract('days', 7),
                  moment(),
                ];
                break;

              default:
                if(value.key === i) {
                  value.values = value.values.concat(res.data[i]);
                }
            }

          }
        });

        this.initState(this.state.params.list)
      });
    } else {
      this.state.params.list.forEach((value, index) => {
        if(value.type == 'range') {
          value.values = [
            moment().subtract('days', 7),
            moment(),
          ];
        }
      });
      this.initState(this.state.params.list)
    }
  }

  initState(list) {
    let initStates = {};
    for(let i in list) {
      let value = list[i];
      if(typeof value.key == 'object') {
        if(value.type == 'range') {
          let start = value.key[0];
          let end = value.key[1];
          initStates[start] = value.values[0].format(dateFormat)
          initStates[end] = value.values[1].format(dateFormat)
        } else {
          value.key.forEach((val, ind) => {
            initStates[val] = ''
          })
        }
      } else {
        initStates[value.key] = ''
      }
    }
    this.setState({
      data: initStates,
      initStates,
    });
  }

  changeTime(time, keys) {
    if (time.length != 0) {
      let startDate = time[0].format(dateFormat);
      let endDate = time[1].format(dateFormat);

      this.setState({
        data: {
          ...this.state.data,
          [keys[0]]: startDate,
          [keys[1]]: endDate
        }
      }, () => {
        this.copyState()
      })
    } else {
      this.setState({
        ...this.state.data,
        startDate: '',
        endDate: ''
      }, () => {
        this.copyState()
      })
    }
  }

  copyState () {
    let copyState = {};
    for(let i in this.state.data) {
      if(this.state.data[i] != '') {
        copyState[i] = this.state.data[i]
      }
    }
    this.props.changeParams(copyState);
  }

  groupSearch () {
    let btnSearchParams = {};
    this.state.params.list.forEach((value, index) => {
      switch (value.type) {
        case 'text':
          btnSearchParams[value.key] = this.props.form.getFieldValue(value.key);
          break;

        case 'group':
          value.key.forEach((val, ind) => {
            btnSearchParams[val] = this.props.form.getFieldValue(val);
          });
          break;
        default:
      }
    });
    this.setState({
      data: {
        ...this.state.data,
        ...btnSearchParams
      }
    }, () => {
      this.copyState()
    });
  }

  changeField (field, value) {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value,
      }
    }, () => {
      this.copyState()
    });
  }


  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({
      data: this.state.initStates
    },()=>{
      let copyState = {};
      for(let i in this.state.data) {
        if(this.state.data[i] != '') {
          copyState[i] = this.state.data[i]
        }
      }
      this.props.changeParams(copyState);
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form inline>
        {
          this.state.params.list.map((value, index) => {
            switch (value.type) {
              case 'group':
                return (
                  <span key='100'>
                    <FormItem
                      className={`${value.className} ${Styles.itemWrapper}`}
                      label={value.name}
                    >
                    {getFieldDecorator(`${value.key[0]}`, {initialValue: ""})(

                      <Select placeholder="请选择" style={{width: 100}}>
                        {
                          value.values.map((val, ind) => {
                            return(<Option key={ind} value={val.value}>{val.name}</Option>)
                          })
                        }
                      </Select>
                    )}
                    </FormItem>

                    <FormItem className={`${Styles.itemWrapper}`}  key='101'>
                      {getFieldDecorator(`${value.key[1]}`)(
                        <Input placeholder='请输入值'
                               style={{width: 180}}/>
                      )}
                    </FormItem>
                  </span>
                )
              case 'select':
                return (
                  <FormItem
                    className={`${value.className} ${Styles.itemWrapper}`}
                    label={value.name}
                    key={index}
                  >
                    {getFieldDecorator(`${value.key}`, {initialValue: ""})(

                      <Select onChange={(e) => this.changeField(`${value.key}`, e)} placeholder="请选择" style={{width: 100}}>
                        {
                          value.values.map((val, ind) => {
                            return(<Option key={ind} value={val.value}>{val.name}</Option>)
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                );

              case 'text':
                return (
                  <FormItem className={`${value.className} ${Styles.itemWrapper}`}  key={index} label={value.name}>
                    {getFieldDecorator(`${value.key}`)(
                      <Input placeholder={value.placeHolder}
                             style={{width: 180}}/>
                    )}
                  </FormItem>
                );

              case 'range':
                return (
                  <FormItem className={`${value.className} ${Styles.itemWrapper}`} label={value.name}  key={index}>
                    {getFieldDecorator(`${value.key[0]}`,{initialValue: value.values})(
                      <RangePicker onChange={(e) => {this.changeTime(e,value.key)}}/>
                    )}
                  </FormItem>
                );

              case 'buttonRadio':
                return (
                  <FormItem className={`${value.className} ${Styles.itemWrapper}`} label={value.name} key={index}>
                    {getFieldDecorator(`${value.key}`, {
                    })(
                      <RadioGroup onChange={(e) => this.changeField(`${value.key}`, e.target.value)}>
                        {
                          value.values.map((val, ind) => {
                            return (
                            <RadioButton key={ind} value={val.value}>{val.name}</RadioButton>
                            )
                          })
                        }
                      </RadioGroup>
                    )}
                  </FormItem>
                );

              case 'search':
                return (
                  <FormItem className={`${value.className} ${Styles.itemWrapper}`}  key='102'>
                    <Button type='primary' icon='search' onClick={()=>{this.groupSearch()}}>搜索</Button>
                  </FormItem>
                );

              default:

            }

          })
        }

        <FormItem className={Styles.refreshBtn} >
          <Button type="ghost" onClick={(e) => this.handleReset(e)}><Icon type="reload"/></Button>
        </FormItem>

      </Form>
    );
  }
}

Search = Form.create()(Search);
export default Search;
