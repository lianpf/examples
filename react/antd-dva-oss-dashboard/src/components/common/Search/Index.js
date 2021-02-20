/**
 * @author lianPf
 * @date 17-12-06
 */

import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, DatePicker, Select, Icon, Radio, Row, Col } from 'antd';
import { fetchPost } from '../../../utils/request';
import Styles from './Index.less';
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
  /* <Search searchParams={this.state.searchParams} primaryBtnClick={() => this.primaryBtnClick()} changeParams={(params)=>this.changeParams(params)} searchFunc={(params) => this.searchFunc(params)} /> */
  constructor(props) {
    super(props);
    this.state = {
      params: props.searchParams,
      data: {},
      initStates: {},
      pathHash: '',
      pathFinance: '',
      pathAffairs: '',
    };

    this.initParams = this.initParams.bind(this);
  }
  componentDidMount() {
    this.initParams();
  }
  componentWillReceiveProps(props) {
    if (this.state.params != props.searchParams) {
      this.setState({
        params: props.searchParams,
      }, () => {
        this.initParams();
      });
    }
  }
  componentWillMount() {
    this.pathHash = window.location.hash.substring(window.location.hash.indexOf('#') + 1, window.location.hash.indexOf('?'));
    this.pathFinance = window.location.hash.substring(window.location.hash.indexOf('finance'), window.location.hash.indexOf('finance') + 7);
    this.pathAffairs = window.location.hash.substring(window.location.hash.indexOf('affairs'), window.location.hash.indexOf('affairs') + 7);
    console.log(this.pathAffairs, this.pathFinance);
  }

  initParams() {
    if (this.state.params.api) {
      fetchPost(`${this.state.params.api}`).then((res) => {
        // debugger;
        this.state.params.list.forEach((value, index) => {
          for (const i in res.data) {
            switch (value.type) {
              case 'group':
                if (value.key[0] == i) {
                  value.values = value.values.concat(res.data[i]);
                }
                break;
              case 'range':
                if (value.values && !value.values.length && this.pathHash !== '/overdue/personalCheck') {
                  value.values = [
                    moment().subtract('days', 7),
                    moment(),
                  ];
                }
                break;

              default:
                if (value.key === i) {
                  value.values = value.values.concat(res.data[i]);
                }
            }
          }
        });
        this.initState(this.state.params.list);
      });
    } else {
      this.state.params.list.forEach((value, index) => {
        if (value.type === 'range') {
          if (value.values && !value.values.length && this.pathHash !== '/overdue/personalCheck') {
            value.values = [
              moment().subtract('days', 7),
              moment(),
            ];
          }
        }
      });
      this.initState(this.state.params.list);
    }
  }

  initState(list) {
    const initStates = {};
    list.forEach(function (element) {
      const value = element;
      if (typeof value.key === 'object') {
        if (value.type === 'range') {
          const start = value.key[0];
          const end = value.key[1];
          if (this.pathHash !== '/overdue/personalCheck') {
            initStates[start] = value.values[0].format(dateFormat);
            initStates[end] = value.values[1].format(dateFormat);
          } else {
            initStates[start] = null;
            initStates[end] = null;
          }
        } else {
          value.key.forEach((val, ind) => {
            initStates[val] = '';
          });
        }
      } else {
        initStates[value.key] = '';
      }
    });
    this.setState({
      data: initStates,
      initStates,
    });
  }

  changeTime(time, keys) {
    if (time.length) {
      const startDate = time[0].format(dateFormat);
      const endDate = time[1].format(dateFormat);
      this.setState({
        data: {
          ...this.state.data,
          [keys[0]]: startDate,
          [keys[1]]: endDate,
        },
      }, () => {
        this.copyState();
      });
    } else {
      this.setState({
        ...this.state.data,
        startDate: '',
        endDate: '',
      }, () => {
        this.copyState();
      });
    }
  }

  copyState() {
    const copyState = {};
    for (const i in this.state.data) {
      if (this.state.data[i] !== '') {
        copyState[i] = this.state.data[i];
      }
    }
    this.props.changeParams(copyState);
  }
  primaryBtnClick() {
    this.props.primaryBtnClick();
  }

  groupSearch() {
    const btnSearchParams = {};
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
        ...btnSearchParams,
      },
    }, () => {
      this.copyState();
    });
  }

  // 新的searchBtn
  // 逻辑 参数改变不出发search, 只有search button 发生click才触发search接口
  newSearchBtn() {
    const btnSearchParams = {};
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
        ...btnSearchParams,
      },
    }, () => {
      const copyState = {};
      for (const i in this.state.data) {
        if (this.state.data[i] !== '') {
          copyState[i] = this.state.data[i];
        }
      }
      this.props.searchFunc(copyState);
    });
  }

  changeField(field, value) {
    // debugger;
    this.setState({
      data: {
        ...this.state.data,
        [field]: value,
      },
    }, () => {
      this.copyState();
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({
      data: this.state.initStates,
    }, () => {
      const copyState = {};
      for (const i in this.state.data) {
        if (this.state.data[i] !== '') {
          copyState[i] = this.state.data[i];
        }
      }
      this.props.changeParams(copyState);
    });
  }

  callPut() {
    this.props.callPutButton();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const formItemLayoutButton = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    };
    console.log(this.state.params.list, 'this.state.params.list');
    const pathFinance = this.pathFinance;
    const pathAffairs = this.pathAffairs;
    return (
      <Form inline>
        {
            this.state.params.list.map((value, index) => {
              switch (value.type) {
                case 'group':
                  return (
                    <span key="100">
                      <FormItem
                        className={`${value.className} ${Styles.itemWrapper}`}
                        label={value.name}
                      >
                        {getFieldDecorator(`${value.key[0]}`, { initialValue: '' })(

                          <Select placeholder="请选择" style={{ width: 100 }}>
                            {
                          value.values.map((val, ind) => {
                            return (<Option key={ind} value={val.value.toString()}>{val.name}</Option>);
                          })
                        }
                          </Select>,
                    )}
                      </FormItem>

                      <FormItem className={`${Styles.itemWrapper}`} key="101">
                        {getFieldDecorator(`${value.key[1]}`)(
                          <Input
                            placeholder="请输入值"
                            style={{ width: 180 }}
                          />,
                      )}
                      </FormItem>
                    </span>
                  );
                case 'select':
                  return (
                    <FormItem
                      className={`${value.className} ${Styles.itemWrapper}`}
                      label={value.name}
                      key={index}
                    >
                      {getFieldDecorator(`${value.key}`, { initialValue: '' })(

                        <Select onChange={e => this.changeField(`${value.key}`, e)} placeholder="请选择" style={{ width: 100 }}>
                          {
                          value.values.map((val, ind) => {
                            return (<Option key={ind} value={val.value.toString()}>{val.name}</Option>);
                          })
                        }
                        </Select>,
                    )}
                    </FormItem>
                  );

                case 'multipleSelect':
                  console.log('--multipleSelect--', value);
                  return (
                    <FormItem
                      className={`${value.className} ${Styles.itemWrapper}`}
                      label={value.name}
                      key={index}
                    >
                      {getFieldDecorator(`${value.key}`, { initialValue: [] })(

                        <Select mode="multiple" onChange={e => this.changeField(`${value.key}`, e)} placeholder="请选择" style={{ width: 180 }}>
                          {
                            value.values.map((val, index) => {
                              return (<Option key={index} value={val.value}>{val.name}</Option>);
                            })
                          }
                        </Select>,
                      )}
                    </FormItem>
                  );

                case 'text':
                  return (
                    <FormItem className={`${value.className} ${Styles.itemWrapper}`} key={index} label={value.name}>
                      {getFieldDecorator(`${value.key}`)(
                        <Input
                          placeholder={value.placeHolder}
                          style={{ width: 180 }}
                        />,
                    )}
                    </FormItem>
                  );

                case 'range':
                  return (
                    <FormItem className={`${value.className} ${Styles.itemWrapper}`} label={value.name} key={index}>
                      {getFieldDecorator(`${value.key[0]}`, { initialValue: value.values })(
                        <RangePicker onChange={(e) => { this.changeTime(e, value.key); }} />,
                    )}
                    </FormItem>
                  );

                case 'buttonRadio':
                  return (
                    <FormItem className={`${value.className} ${Styles.itemWrapper}`} label={value.name} key={index}>
                      {getFieldDecorator(`${value.key}`, {
                        initialValue: pathFinance === 'finance' || pathAffairs === 'affairs' ? '' : null,
                      })(
                        <RadioGroup onChange={e => this.changeField(`${value.key}`, e.target.value)}>
                          {
                          value.values.map((val, ind) => {
                            return (
                              <RadioButton key={ind} value={val.value}>{val.name}</RadioButton>
                            );
                          })
                        }
                        </RadioGroup>,
                    )}
                    </FormItem>
                  );
                case 'search':
                  return (
                    <FormItem className={`${value.className} ${Styles.itemWrapper}`} key="102">
                      <Button type="primary" icon="search" onClick={() => { this.groupSearch(); }}>搜索</Button>
                    </FormItem>
                  );

                case 'searchBtn':
                  return (
                    <FormItem className={`${value.className} ${Styles.itemWrapper}`} key="103">
                      <Button type="primary" icon="search" onClick={() => { this.newSearchBtn(); }}>搜索</Button>
                    </FormItem>
                  );

                case 'button':
                  return (
                    <FormItem className={`${value.className} ${Styles.itemWrapper}`}>
                      <Button type="primary" onClick={() => { this.primaryBtnClick(); }}>{value.name}</Button>
                    </FormItem>
                  );
                case 'reload':
                  return (
                    <FormItem className={Styles.refreshBtn} >
                      <Button type="ghost" onClick={e => this.handleReset(e)}><Icon type="reload" /></Button>
                    </FormItem>
                  );

                default:
              }
            })
        }
        {
          this.props.button
          ?
            <FormItem>
              <Button style={{ marginLeft: 10, marginTop: 5 }} type="primary" onClick={() => this.callPut()}>
                <Icon type="phone" size="20" />
              </Button><span style={{ marginLeft: 10 }} id="ztth_phone_error" />
            </FormItem>
            :
            <FormItem />
        }

      </Form>

    );
  }
}
Search = Form.create()(Search);
export default Search;
