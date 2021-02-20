/**
 * lianpf 17/08/01.
 */
import React, { Component, PropTypes } from 'react'
import { fetchPost } from './../../../utils/request';

import Styles from './Index.less';

import { Layout, Row, Col, message, Button } from 'antd';
const {Content} = Layout;
import MyBreadcrumb from '../../common/Breadcrumb';
import MyTable from './MyTable';
import MyModal from './MyModal';
import MySearch from './MySearch';

const arrData = [
  {name: '系统管理'},
  {name: '用户管理'},
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMenuState: {
        visible: false,
        confirmLoading: false,
      },
      adminListData: [],
      fullName: '',
      currentPage: 1,
      pageSize: 10,
      totalCount: 100,
      id: 0,
      name: '',
      password: '',
      fullName: '',
      telephone: '',
      mobilephone: '',
    }

    this.initAdminList = this.initAdminList.bind(this);
    this.getAdminList = this.getAdminList.bind(this);

    this.addMenu = this.addMenu.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.editMenu = this.editMenu.bind(this);
    this.addModalOk = this.addModalOk.bind(this);
    this.editModalOk = this.editModalOk.bind(this);

    this.nextpage = this.nextpage.bind(this);
    this.showPageSize = this.showPageSize.bind(this);
    this.tableRowSelect = this.tableRowSelect.bind(this);

    this.handlerSearch = this.handlerSearch.bind(this);
    this.handlerReset = this.handlerReset.bind(this);
  }

  //data
  initAdminList() {
    const { fullName, currentPage, pageSize} = this.state;
    const params = {
      fullName,
      currentPage,
      pageSize
    }
    this.getAdminList(params);
  }
  getAdminList(params) {
    const {fullName, currentPage, pageSize} = params;

    const _params = {fullName};
    fetchPost(`/admin/list?currentPage=${currentPage}&pageSize=${pageSize}`, _params).then(json => {
      console.log(`--getAdminList-00-`);
      if (json.code === 200 ) {
        console.log(`--getAdminList-11-`, json.data);
        this.setState({
          adminListData: json.data.list,
          currentPage: json.data.page.currentPage,
          pageSize: json.data.page.pageSize,
          totalCount: json.data.page.totalCount,
          fullName,
        })
      } else {
        message.error(json.msg);
      }
    });
  }

  // modal
  addMenu() {
    console.log(`--addMenu-modal--`);
    this.setState({
      modalMenuState: {
        visible: true,
        confirmLoading: false,
      },
    })
  }
  editMenu(record) {
    console.log(`--edit-000--`, record);
    const {id, name, fullName, mobilephone, telephone} = record;
    this.setState({
      id,
      name,
      password: '',
      fullName,
      telephone,
      mobilephone,
      modalMenuState: {
        visible: true,
        confirmLoading: false,
      },
    });
  }
  handleModal(params) {
    const {id} = params;
    this.setState({
      modalMenuState: {
        visible: true,
        confirmLoading: true,
      },
    });

    if (id === 0) {
      this.addModalOk(params);
    } else {
      this.editModalOk(params);
    }
  }
  addModalOk(params) {
    const {name, password, roles, fullName, type, mobilephone, telephone} = params;
    const _params = {name, password, roles, fullName, type, mobilephone, telephone};
    fetchPost(`/admin/add`, _params).then(json => {
      console.log(`--admin-add-00-`);
      if (json.code === 200 ) {
        console.log(`--admin-add-11-`);
        this.cancelModal();
        this.initAdminList();
      } else {
        message.error(json.msg);
      }
    });
  }
  editModalOk(params) {
    const {id, name, password, fullName, mobilephone, telephone} = params;
    const _params = {
      name,
      password,
      roles: [],
      fullName,
      type: '',
      mobilephone,
      telephone
    };
    fetchPost(`/admin/${id}/update`, _params).then(json => {
      console.log(`--update-add-00-`);
      if (json.code === 200 ) {
        console.log(`--admin-update-11-`);
        this.cancelModal();
        this.initAdminList();
      } else {
        message.error(json.msg);
      }
    });
  }

  cancelModal() {
    this.setState({
      modalMenuState: {
        visible: false,
        confirmLoading: false,
      },
      id: 0,
      name: '',
      password: '',
      fullName: '',
      telephone: '',
      mobilephone: '',
    })
  }

  // table
  nextpage(page) {
    const {fullName, pageSize} = this.state;
    const params = {
      fullName,
      currentPage: page,
      pageSize,
    }
    this.getAdminList(params);
  }
  showPageSize(current, pageSize) {
    const {fullName} = this.state;
    const params = {
      fullName,
      currentPage: current,
      pageSize: pageSize,
    }
    this.getAdminList(params);
  }
  tableRowSelect(selectedRowKeys, selectedRows) {
    console.log(`--table-parent--`);
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  //search
  handlerSearch(params) {
    const {fullName} = params;
    const _params = {
      fullName,
      currentPage: 1,
      pageSize: 10,
    }
    this.getAdminList(_params);
  }

  handlerReset() {
    this.setState({
      fullName: ""
    });
  }

  componentDidMount() {
    this.initAdminList();
  }

  render() {
    const {modalMenuState, adminListData, id, name, password, fullName, telephone, mobilephone, totalCount} = this.state;
    const modalParams = {modalMenuState, id, name, password, fullName, telephone, mobilephone};

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
    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        that.tableRowSelect(selectedRowKeys, selectedRows);
      }
    };

    return (
      <div>
        <Layout style={{ padding: '2px 16px 16px' }}>
          <MyBreadcrumb arrData={arrData}/>
          <Content style={{ background: '#fff', padding: '24px 16px 24px 16px', margin: 0, minHeight: 280 }}>
            <Row>
              <Col span={12}>
                <Button type="primary" onClick={this.addMenu}>新增</Button>
              </Col>
              <Col span={12}>
                <MySearch handlerSearch={this.handlerSearch} handlerReset={this.handlerReset} />
              </Col>
            </Row><br/>
            <div>共搜索到&nbsp;{totalCount}&nbsp;条数据</div>
            <MyTable pagination={pagination} rowSelection={rowSelection} data={adminListData} editMenu={this.editMenu} />
            <MyModal modalParams={modalParams} cancelModal={this.cancelModal} handleModal={this.handleModal}/>
          </Content>
        </Layout>
      </div>
    )
  }
}


export default Index;
