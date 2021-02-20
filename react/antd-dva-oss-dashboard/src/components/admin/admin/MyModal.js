/**
 * lianpf 17/08/02
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './MyModal.less';

import { Modal, Button, Row, Col, Tree, Input, Radio, Select, message} from 'antd';
import { fetchPost } from './../../../utils/request';
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
import RedStar from '../../common/RedStar';

class MyModal extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      modalParams: props.modalParams,
      id: props.modalParams.id,
      account: props.modalParams.name,
      password: props.modalParams.password,
      name: props.modalParams.fullName,
      phone: props.modalParams.mobilephone,
      userRole: '',
      planeNum: props.modalParams.telephone,
      selectData: [],
      maskClosable: false,
    }

    this.getSelectData = this.getSelectData.bind(this);

    this.accoutnInput = this.accoutnInput.bind(this);
    this.pswInput = this.pswInput.bind(this);
    this.nameInput = this.nameInput.bind(this);
    this.phoneInput = this.phoneInput.bind(this);
    this.selectUserRole = this.selectUserRole.bind(this);
    this.planeNumInput = this.planeNumInput.bind(this);

    this.handleOk = this.handleOk.bind(this);
  }

  componentWillReceiveProps (props) {
    if(this.state.modalParams != props.modalParams) {
      this.setState({
        modalParams: props.modalParams,
        id: props.modalParams.id,
        account: props.modalParams.name,
        password: props.modalParams.password,
        name: props.modalParams.fullName,
        phone: props.modalParams.mobilephone,
        planeNum: props.modalParams.telephone
      },()=>{
        // this.getData()
        // 获取更新list数据
      })
    }
  }

  accoutnInput(event) {
    this.setState({
      account: event.target.value
    })
  }
  pswInput(event) {
    this.setState({
      password: event.target.value
    })
  }
  nameInput(event) {
    this.setState({
      name: event.target.value
    })
  }
  phoneInput(event) {
    this.setState({
      phone: event.target.value
    })
  }
  selectUserRole(value) {
    console.log(`--userRole--${value}`);
    this.setState({userRole: value});
  }
  planeNumInput(event) {
    this.setState({
      planeNum: event.target.value
    })
  }

  handleOk(event) {
    const {id, account, password, name, phone, userRole, planeNum } = this.state;
    const params = {
      id,
      name: account,
      password: password,
      fullName: name,
      roles: userRole,
      mobilephone: phone,
      telephone: planeNum,
      type: null
    }
    console.log(`--params--${JSON.stringify(params)}`);
    this.props.handleModal(params, event);
  }

  //select data
  getSelectData() {
    fetchPost(`/admin/role/list?currentPage=1&pageSize=500`, {}).then(json => {
      console.log(`--getSelectd-00-`);
      if (json.code === 200 ) {
        this.setState({
          selectData: json.data.list
        })
      } else {
        message.error(json.msg);
      }
    });
  }

  componentDidMount() {
    this.getSelectData();
  }

  render () {
    const {modalMenuState, id} = this.props.modalParams;
    const { visible, confirmLoading } = modalMenuState;
    const {account, password, name, phone, userRole, planeNum, selectData, maskClosable} = this.state;

    let title = '新增用户';
    let selectStyle = {'display': 'block'};
    if (id != 0) {
      title = '修改用户';
      selectStyle = {'display': 'none'};
    }

    return (
        <div>
          <Modal
            title= {title}
            visible={visible}
            confirmLoading={confirmLoading}
            onOk={this.handleOk}
            onCancel={this.props.cancelModal}
            maskClosable={maskClosable}
            width="400px"
            okText="确认"
            cancelText="取消"
          >
            <Row>
              <Col span={4} className={styles.lableInput}>用户名：</Col>
              <Col span={20}>
                <Input value={account} onChange={this.accoutnInput} placeholder="请输入"/>
              </Col>
            </Row><br/>
            <Row>
              <Col span={4} className={styles.lableInput}>密码：</Col>
              <Col span={20}><Input value={password} onChange={this.pswInput}  placeholder="请输入6位以上数字、字符和_组合密码"/></Col>
            </Row><br/>
            <Row>
              <Col span={4} className={styles.lableInput}>中文名：</Col>
              <Col span={20}><Input value={name} onChange={this.nameInput} placeholder="请输入"/></Col>
            </Row><br/>
            <Row>
              <Col span={4} className={styles.lableInput}>联系电话：</Col>
              <Col span={20}><Input value={phone} onChange={this.phoneInput} placeholder="请输入"/></Col>
            </Row><br/>
            <Row>
              <Col span={4} className={styles.lableInput}>座机号：</Col>
              <Col span={20}><Input value={planeNum} onChange={this.planeNumInput} placeholder="请输入"/></Col>
            </Row><br/>
            <Row style={selectStyle}>
              <Col span={4} className={styles.lableInput}>用户角色：</Col>
              <Col span={20}>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  onChange={this.selectUserRole}
                  placeholder="请选择"
                >
                  {
                    selectData.map(item => {
                      return(
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </Col>
            </Row><br/>
          </Modal>
        </div>
    )
  }
}

export default MyModal;
