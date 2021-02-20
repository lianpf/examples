/**
 * lianpf 17/08/10.
 */
import React, { Component, PropTypes } from 'react'
import { fetchPost } from './../../../utils/request'
import { Button } from 'antd';

import Styles from './Index.less';

import { Layout, DatePicker, message } from 'antd';
const {Content} = Layout;
import MyBreadcrumb from '../../common/Breadcrumb';
import MyTable from './MyTable';
import MyModal from './MyModal';
import SetModal from './setRoleMenuModal';

const arrData = [
  {name: '系统管理'},
  {name: '角色管理'},
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: props.params,
      modalRoleState: {
        visible: false,
        confirmLoading: false,
      },
      modalSetState: {
        visible: false,
        confirmLoading: false,
      },
      editRoleId: 0,
      name: '',
      description: '',
      roleListData: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 100,
      checkedKeys: [],
      roleId: 0,
    }

    this.initRoleListData = this.initRoleListData.bind(this);
    this.getRoleListData = this.getRoleListData.bind(this);

    this.addRole = this.addRole.bind(this);
    this.editRole = this.editRole.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleAddModal = this.handleAddModal.bind(this);
    this.handleUpdateModal = this.handleUpdateModal.bind(this);

    this.setRole = this.setRole.bind(this);

    this.cancelSetModal = this.cancelSetModal.bind(this);
    this.handleSetModal = this.handleSetModal.bind(this);
  }

  initRoleListData() {
    const {currentPage, pageSize} = this.state;
    const params = {currentPage, pageSize};
    this.getRoleListData(params);
  }

  getRoleListData(params) {
    const {currentPage, pageSize} = params;
    fetchPost(`/admin/role/list?currentPage=${currentPage}&pageSize=${pageSize}`, {}).then(json => {
      console.log(`--get-role-post--`);
      if (json.code === 200) {
        this.setState({
          roleListData: json.data.list,
          currentPage: json.data.page.currentPage,
          pageSize: json.data.page.pageSize,
          totalCount: json.data.page.totalCount,
        });
      } else {
        message.error(json.msg);
      }
    })
  }

  // modal
  addRole() {
    console.log(`--addMenu-modal--`);
    this.setState({
      modalRoleState: {
        visible: true,
        confirmLoading: false,
      },
    })
  }
  editRole(params) {
    console.log(`--edit-000--`);
    console.log(`--edit--${id}--`);
    const {id, name, description} = params;
    this.setState({
      editRoleId: id,
      name,
      description,
      modalRoleState: {
        visible: true,
        confirmLoading: false,
      },
    })

  }
  handleModal(params) {
    const {id} = params;
    this.setState({
      modalRoleState: {
        visible: true,
        confirmLoading: true,
      },
    });
    if (id === 0) {
      this.handleAddModal(params);
    } else {
      this.handleUpdateModal(params);
    }
  }
  handleAddModal(params) {
    const {name, description} = params;
    const _params = {
      name,
      type: 1,
      description
    };
    fetchPost(`/admin/role/add`, _params).then(json => {
      if (json.code === 200) {
        this.cancelModal();
        this.initRoleListData();
      } else {
        message.error(json.msg);
      }
    })
  }
  handleUpdateModal(params) {
    const {id, name, description} = params;
    const _params = {
      name,
      type: 1,
      description
    };
    fetchPost(`/admin/role/${id}/update`, _params).then(json => {
      if (json.code === 200) {
        this.cancelModal();
        this.initRoleListData();
      } else {
        message.error(json.msg);
      }
    })
  }
  cancelModal() {
    this.setState({
      modalRoleState: {
        visible: false,
        confirmLoading: false,
      },
      editRoleId: 0,
      name: '',
      description: '',
    })
  }

  // table
  nextpage(page) {
    const { pageSize} = this.state;
    const params = {
      currentPage: page,
      pageSize,
    }
    this.getRoleListData(params);
  }
  showPageSize(current, pageSize) {
    const params = {
      currentPage: current,
      pageSize: pageSize,
    }
    this.getRoleListData(params);
  }

  // set access modal
  setRole(id) {
    fetchPost(`/menu/role/${id}/ids`, {}).then(json => {
      if (json.code === 200) {
        this.setState({
          modalSetState: {
            visible: true,
            confirmLoading: false,
          },
          checkedKeys: json.data.list,
          roleId: id,
        })
      } else {
        message.error(json.msg);
      }
    })
  }
  handleSetModal(params) {
    this.setState({
      modalSetState: {
        visible: true,
        confirmLoading: true,
      },
    });
    fetchPost(`/permission/role/menu`, params).then(json => {
      if (json.code === 200) {
        this.cancelSetModal();
      } else {
        message.error(json.msg);
      }
    })
  }
  cancelSetModal() {
    this.setState({
      modalSetState: {
        visible: false,
        confirmLoading: false,
      },
      checkedKeys: [],
    })
  }

  componentDidMount() {
    this.initRoleListData();
  }

  render() {
    const {modalRoleState, editRoleId, name, description, roleListData, totalCount} = this.state;
    const modalParams = {modalRoleState, editRoleId, name, description};

    const that = this;
    const pagination = {
      current: that.state.currentPage,
      total: totalCount || 0,
      pageSize: that.state.pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal(total){
        return `总共 ${total} 条`;
      },
      onChange(current) {
        that.nextpage(current)
      },
      onShowSizeChange(current, pageSize) {
        that.showPageSize(current,pageSize)
      }
    };

    return (
      <div>
        <Layout style={{ padding: '2px 16px 16px' }}>
          <MyBreadcrumb arrData={arrData}/>
          <Content style={{ background: '#fff', padding: '24px 16px 24px 16px', margin: 0, minHeight: 280 }}>
            <Button type="primary" onClick={this.addRole}>新增</Button><br/>
            <MyTable pagination={pagination} data={roleListData} edit={this.editRole} set={this.setRole}/>
            <MyModal modalParams={modalParams} cancelModal={this.cancelModal} handleModal={this.handleModal}/>
            <SetModal roleId={this.state.roleId} modalState={this.state.modalSetState} checkedKeys={this.state.checkedKeys} cancelModal={this.cancelSetModal} handleModal={this.handleSetModal}/>
          </Content>
        </Layout>
      </div>
    )
  }
}


export default Index;
