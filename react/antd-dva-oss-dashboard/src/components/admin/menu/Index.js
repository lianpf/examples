/**
 * lianpf 17/08/07.
 */
import React, { Component, PropTypes } from 'react'
import { fetchGet, fetchPost } from './../../../utils/request'
import { Button, message} from 'antd';

import Styles from './Index.less';

import { Layout, DatePicker, Table, Card } from 'antd';
const {Content} = Layout;
import MyBreadcrumb from '../../common/Breadcrumb';
import MyTable from './MyTable';
import MyModal from './MyModal';
import SecondClass from './SecondClass';

const arrData = [
  {name: '系统管理'},
  {name: '菜单管理'},
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMenuState: {
        visible: false,
        confirmLoading: false,
      },
      editMenuId: 0,
      name: '',
      url: '',
      firstMenus: [],
      activeItem:null,
      activeId:null,
      handleItem:null,
      currentPage: 1,
      pageSize: 10,
      totalCount: 100,
    }

    this.addMenu = this.addMenu.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.addMenuHandle = this.addMenuHandle.bind(this);
    this.editMenuHandle = this.editMenuHandle.bind(this);
    this.initMenuModal = this.initMenuModal.bind(this);


    this.editMenu = this.editMenu.bind(this);
    this.deleteMenu = this.deleteMenu.bind(this);
  }

  addMenu() {
    console.log(`--addMenu-modal--`);
    this.setState({
      modalMenuState: {
        visible: true,
        confirmLoading: false,
      },
    })
  }
  editMenu(id) {
    console.log(`--edit-000--`);
    console.log(`--edit--${id}--`);
    fetchGet(`/menu/${id}`).then(json => {
      if (json.code == 200) {
        console.log(`--editMsg--`, json);
        const {name, url} = json.data;
        this.setState({
          editMenuId: id,
          modalMenuState: {
            visible: true,
            confirmLoading: false,
          },
          name: name,
          url: url,
        })
      } else {
        message.error(json.msg);
      }
    });
  }
  deleteMenu(id) {
    console.log(`--delete--000--`);
    console.log(`--delete--${id}--`);
  }
  handleModal(data) {
    console.log(`--父组件-modal--`, data);

    this.setState({
      modalMenuState: {
        visible: true,
        confirmLoading: true,
      },
    });
    const {menuId} = data;
    if (menuId === 0) {
      this.addMenuHandle(data);
    } else {
      this.editMenuHandle(data);
    }
  }
  addMenuHandle(data) {
    const { firstMenu, secondMenu, name, url} = data;
    const params = {
      firstMenu,
      secondMenu,
      name,
      url,
    }
    fetchPost('/menu/add', params).then(json => {
      if (json.code == 200) {
        message.info("添加成功");
        this.initMenuModal();
        this.getFirstMenus();
      } else {
        message.error(json.msg);
      }
    });
  }
  editMenuHandle(data) {
    const {menuId, name, url} = data;
    const params = {name, url};
    fetchPost('/menu/' + menuId + '/update', params).then(json => {
      if (json.code == 200) {
        message.info("修改成功");
        this.initMenuModal();
        this.getFirstMenus();
      } else {
        message.error(json.msg);
      }
    });
  }
  initMenuModal() {
    this.setState({
      modalMenuState: {
        visible: false,
        confirmLoading: false,
      },
      editMenuId: 0,
      name: '',
      url: '',
    });
  }

  cancelModal() {
    this.setState({
      modalMenuState: {
        visible: false,
        confirmLoading: false,
      },
    })
  }
  componentDidMount() {
    this.getFirstMenus();
  }

  // lianpf
  getFirstMenus() {
    fetchPost('/menu/parent/0/list').then(json => {
      if (json.data != null) {
        let data = json.data.list;
        this.setState({
          firstMenus: data,
          activeItem:data[0],
          handleItem:data[0],
          activeId:data[0].id
        });
      }
    });
  }
  //单击行
  handleClickRow(record) {
    console.log(`--单击行--`, record.id);
    this.setState({
      activeId: record.id,
      activeItem:record,
      handleItem:record
    })
  }

  //单击行 样式改变
  handleChosedRow(itemId) {
    if (itemId == this.state.activeId) {
      return Styles.active;
    } else {
      return "";
    }
  }

  setHandleItem(item){
    console.log(`--first--handleClickRow--`, item);
    this.setState({
      handleItem:item
    });
  }

  render() {
    const firstColumns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width:50
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span>
          <a onClick={() => this.handleClickRow(record)}>{text}</a>
        </span>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.editMenu(record.id)}>修改</a>
        </span>
      ),
    }];

    const {modalMenuState, editMenuId, name, url, firstMenus} = this.state;
    const modalParams = {modalMenuState, editMenuId, name, url};

    return (
      <div>
        <Layout style={{ padding: '2px 16px 16px' }}>
          <MyBreadcrumb arrData={arrData}/>
          <Content style={{ background: '#fff', padding: '24px 16px 24px 16px', margin: 0, minHeight: 280 }}>
            <Button type="primary" onClick={this.addMenu}>新增</Button><br/>
            <MyModal modalParams={modalParams} cancelModal={this.cancelModal} handleModal={this.handleModal}/>
            <div style={{width: '30%', display: 'inline-block', float: 'left'}}>
              <Card bodyStyle={{padding:0}} bordered={false}>
                <Table pagination={false} bordered style={{background:'#FFFFFF'}} dataSource={firstMenus} columns={firstColumns}
                rowClassName={(record) => this.handleChosedRow(record.id)}
                title={() => '一级导航'} size="small" />
              </Card>
            </div>
            <div style={{width: '70%', display: 'inline-block', float: 'left',paddingLeft:10}}>
              <SecondClass activeItem={this.state.activeItem} edit={this.editMenu} setHandleItem={(item)=>this.setHandleItem(item)} />
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}


export default Index;
