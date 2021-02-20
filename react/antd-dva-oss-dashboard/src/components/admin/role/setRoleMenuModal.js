/**
 * lianpf 17/08/01
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './MyModal.less';

import { Modal, Button, Row, Col, Tree, Input, Radio, message} from 'antd';
import { fetchPost } from './../../../utils/request'

const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;

class MyModal extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      checkedKeys: props.checkedKeys,
      expandedKeys: props.checkedKeys,
      treeData: [],
      roleId: props.roleId,
    }

    this.handleOk = this.handleOk.bind(this);
    this.initMenuList = this.initMenuList.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.checkedKeys != props.checkedKeys) {
      this.setState({
        checkedKeys: props.checkedKeys,
        expandedKeys: props.checkedKeys,
        roleId: props.roleId,
      })
    }
  }

  initMenuList() {
    fetchPost(`/menu/list`, {}).then(json => {
      if (json.code === 200) {
        this.setState({
          treeData: json.data.list
        })
      } else {
        message.error(json.msg);
      }
    })
  }
  handleOk(event) {
    const {checkedKeys, roleId} = this.state;
    const params = {
      roleId: roleId,
      menuIds: checkedKeys,
    }
    // console.log(`--params--${JSON.stringify(params)}`);
    this.props.handleModal(params, event);
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({
      checkedKeys,
    });
  }
  onExpand = (expandedKeys) => {
    console.log('expandedKeys', expandedKeys);
    this.setState({
      expandedKeys,
    });
  }

  componentDidMount() {
    this.initMenuList();
  }

  render () {
    const { visible, confirmLoading } = this.props.modalState;

    const loopSecondMenu = data => data.map((item) => {
      if (item.navs.length > 0) {
        <TreeNode key={item.id} title={item.key}>
          {loopSecondMenu(item.navs)}
        </TreeNode>
      }
      return (<TreeNode key={item.id} title={item.key} />)
    });

    const loopFirstMenu = data => data.map((item) => {
      if (item.navs.length > 0) {
        return (
          <TreeNode key={item.id} title={item.parentName}>
            {loopSecondMenu(item.navs)}
          </TreeNode>
        );
      }
      return ( <TreeNode key={item.id} title={item.parentName} />);
    });

    const gData = this.state.treeData;

    console.log('--oncheck--' + this.state.checkedKeys);
    return (
        <div>
          <Modal
            title="设置权限"
            visible={visible}
            confirmLoading={confirmLoading}
            onOk={this.handleOk}
            width = '300px'
            onCancel={this.props.cancelModal}
            okText="确认"
            cancelText="取消"
          >
            <Tree
              checkable
              expandedKeys={this.state.expandedKeys}
              onCheck={this.onCheck}
              onExpand = {this.onExpand}
              checkedKeys={this.state.checkedKeys}
            >
              {loopFirstMenu(gData)}
            </Tree>
          </Modal>
        </div>
    )
  }
}

export default MyModal;
