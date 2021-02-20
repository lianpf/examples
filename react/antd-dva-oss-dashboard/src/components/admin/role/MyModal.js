/**
 * lianpf 17/08/01
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './MyModal.less';

import { Modal, Button, Row, Col, Tree, Input, Radio} from 'antd';
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;

class MyModal extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      modalParams: props.modalParams,
      editRoleId: props.modalParams.editRoleId,
      roleName: props.modalParams.name,
      roleDescribe: props.modalParams.description,
      maskClosable: false,
    }

    this.handleOk = this.handleOk.bind(this);
    this.roleNameInput = this.roleNameInput.bind(this);
    this.roleDescribeInput = this.roleDescribeInput.bind(this);
  }

  componentWillReceiveProps (props) {
    if(this.state.modalParams != props.modalParams) {
      this.setState({
        modalParams: props.modalParams,
        editRoleId: props.modalParams.editRoleId,
        roleName: props.modalParams.name,
        roleDescribe: props.modalParams.description,
      })
    }
  }

  roleNameInput(event) {
    this.setState({
      roleName: event.target.value
    })
  }
  roleDescribeInput(event) {
    this.setState({
      roleDescribe: event.target.value
    })
  }
  handleOk(event) {
    const {editRoleId, roleName, roleDescribe} = this.state;
    const params = {
      id: editRoleId,
      name: roleName,
      description: roleDescribe,
    }
    // console.log(`--params--${JSON.stringify(params)}`);
    this.props.handleModal(params, event);
  }

  render () {
    let {modalRoleState, editRoleId} = this.state.modalParams;
    const { visible, confirmLoading } = modalRoleState;

    const {roleName, roleDescribe, maskClosable} = this.state;

    let title = '新增角色';
    if (editRoleId != 0) {
      title = '修改角色';
    }
    return (
        <div>
          <Modal
            title={title}
            visible={visible}
            confirmLoading={confirmLoading}
            onOk={this.handleOk}
            onCancel={this.props.cancelModal}
            maskClosable={maskClosable}
            okText="确认"
            cancelText="取消"
          >
            <Row>
              <Col span={4} className={styles.lableInput}>角色名称：</Col>
              <Col span={20}>
                <Input value={ roleName } onChange={this.roleNameInput}  placeholder="请输入"/></Col>
            </Row><br/>
            <Row>
              <Col span={4} className={styles.lableInput}>角色描述：</Col>
              <Col span={20}><Input value={ roleDescribe } onChange={this.roleDescribeInput} placeholder="请输入"/></Col>
            </Row><br/>
          </Modal>
        </div>
    )
  }
}

export default MyModal;
