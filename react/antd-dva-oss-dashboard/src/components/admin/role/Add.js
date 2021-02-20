/**
 * Created by yujianfu on 2016/11/17.
 */
import React, { Component, PropTypes } from 'react'
import { Form, message, Select, Input, Button, Icon } from 'antd';
import { fetchPost } from './../../../utils/request'
import Styles from './Index.less'
const FormItem = Form.Item;
const Option = Select.Option;

import { Layout, DatePicker } from 'antd';
const {Content} = Layout;
import MyBreadcrumb from '../../common/Breadcrumb';


const arrData = [
  {name: '系统管理'},
  {name: '菜单管理'},
  {name: '新增'},
];

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstMenus: null,
      secondMenus: null,
      params: {
        firstMenu: null,
        secondMenu: null,
        name: null,
        url: null
      }
    };
  }

  componentDidMount() {
    // this.getFirstMenus();
  }

  handleSubmit(e) {
    e.preventDefault();
    const {firstMenu, secondMenu, name, url} = this.props.form.getFieldsValue();
    if (typeof (name) == 'undefined') {
      message.error("必填项不能为空");
    } else {
      this.setState({
        params: {
          firstMenu: firstMenu,
          secondMenu: secondMenu,
          name: name,
          url: url
        }
      }, () => {
        this.createMenu();
      })
    }
  }

  createMenu() {
    fetchPost('/menu/add', this.state.params).then(json => {
      if (json.code == 0) {
        message.info("添加成功");
        this.props.form.resetFields();
      } else {
        message.error(json.msg);
      }
    });
  }

  getFirstMenus() {
    fetchPost('/menu/parent/0/list', this.state.params).then(json => {
      if (json.data != null) {
        let data = json.data.list;
        this.setState({
          firstMenus: data
        });
      }
    });
  }

  getSecondMenus(firstMenuId) {
    fetchPost('/menu/parent/' + firstMenuId + '/list').then(json => {
      if (json.data != null) {
        let data = json.data.list;
        this.setState({
          secondMenus: data
        });
      }
    });
  }


  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  createFirstClassMenus(menus) {
    if (menus == null || menus.length == 0) {
      return <Option key="null">无</Option>;
    }

    let res = [];
    res.push(<Option key="null">无</Option>);
    menus.map(function (menu) {
      res.push(<Option key={menu.id}>{menu.name}</Option>)
    });

    return res;
  }

  changeFirstClass(classId) {
    this.getSecondMenus(classId)
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <div>
        <Layout style={{ padding: '2px 16px 16px' }}>
          <MyBreadcrumb arrData={arrData}/>
          <Content style={{ background: '#fff', padding: '24px 16px 24px 16px', margin: 0, minHeight: 280 }}>
            <div className={Styles.addClass}>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="一级菜单"
                >
                  {getFieldDecorator('firstMenu')(
                    <Select placeholder="选择一级菜单" onChange={(e) => this.changeFirstClass(e)}>
                      {this.createFirstClassMenus(this.state.firstMenus)}
                    </Select>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="二级菜单"
                >
                  {getFieldDecorator('secondMenu')(
                    <Select placeholder="选择二级菜单">
                      {this.createFirstClassMenus(this.state.secondMenus)}
                    </Select>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="名称"
                  hasFeedback
                >
                  {getFieldDecorator('name', {
                    rules: [
                      {required: true, message: '名称不能为空!'},
                    ],
                  })(
                    <Input />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="url"
                  hasFeedback
                >
                  {getFieldDecorator('url')(
                    <Input />
                  )}
                </FormItem>


                <FormItem wrapperCol={{span: 12, offset: 6}}>
                  <Button type="primary" onClick={(e) => this.handleSubmit(e)}>创建菜单</Button>
                  &nbsp;
                  <Button type="ghost" onClick={(e) => this.handleReset(e)}><Icon type="reload"/></Button>
                </FormItem>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }

}


Add = Form.create()(Add);
export  default Add;
