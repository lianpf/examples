import React, {Component, PropTypes} from 'react'
import {Form, Input, Row, Col, Button, DatePicker, Checkbox, Select, Icon, Radio} from 'antd';


const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        startDate: props.startDate,
        endDate: props.endDate,
      },
    }
  }

  changeItem(key, value) {
    this.setState({
      params: {
        ...this.state.params,
        [key]: value
      }
    }, () => {
      this.props.changeParams(this.state.params);

    })
  }


  changeTime(time) {
    if (typeof(time) != 'undefined') {
      var startDate = time[0].format("YYYY-MM-DD");
      var endDate = time[1].format("YYYY-MM-DD");
      this.setState({
        params: {
          ...this.state.params,
          startDate: startDate,
          endDate: endDate
        }
      }, () => {
        this.props.changeParams(this.state.params);

      });
    }
  }

  handleReset(e) {
    e.preventDefault();
    var values = this.props.form.resetFields();
    this.setState({
      ...values
    }, () => {
      this.props.changeParams({});

    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (

      <Form inline>
        <div>
          <FormItem label="时间范围">
            {getFieldDecorator('time')(
              <RangePicker
                style={{width: 200}}
                onChange={(e) => this.changeTime(e)}

              />
            )}
          </FormItem>

          <FormItem>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={(e) => this.handleReset(e)}><Icon type="reload"/></Button>&nbsp;&nbsp;&nbsp;
            <span>申请订单数=系统拒绝数+系统审核数+流入人工数&nbsp;&nbsp;&nbsp;流入人工数=人工通过数+人工拒绝数+人工审核数</span>
          </FormItem>
        </div>
      </Form>
    );
  }

}

Search = Form.create()(Search);
export  default Search;
