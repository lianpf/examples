/**
 * lianpf 17/08/01
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './MyModal.less';
import { fetchPost } from './../../../utils/request';


import { Modal, Button, Row, Col, Tree, Input, Radio, Select} from 'antd';
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;


const firstMenuData = ['1', '2'];
const secondMenuData = {
  '1': ['11', '12', '13'],
  '2': ['21', '22', '23'],
};
// const firstMenuData = [];
// const secondMenuData = {
//   '1': [],
//   '2': [],
// };

class MyModal extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      modalParams: props.modalParams,
      firstMenus: [],
      secondMenus: [],
      firstMenu: "",
      secondMenu: "",
      menuId: props.modalParams.editMenuId,
      menuName: props.modalParams.name,
      menuUrl: props.modalParams.url,
      maskClosable: false,
    }

    this.handleOk = this.handleOk.bind(this);
    this.menuInputName = this.menuInputName.bind(this);
    this.menuInputUrl = this.menuInputUrl.bind(this);

    this.getFirstMenus = this.getFirstMenus.bind(this);
  }

  componentWillReceiveProps (props) {
    if(this.state.modalParams != props.modalParams) {
      this.setState({
        modalParams: props.modalParams,
        menuId: props.modalParams.editMenuId,
        menuName: props.modalParams.name,
        menuUrl: props.modalParams.url,
      },()=>{
        // this.getData()
        // 获取更新list数据
      })
    }
  }

  menuInputName(event) {
    this.setState({
      menuName: event.target.value
    })
  }
  menuInputUrl(event) {
    this.setState({
      menuUrl: event.target.value
    })
  }
  handleOk(event) {
    const {firstMenu, secondMenu, menuName, menuUrl} = this.state;
    const params = {
      menuId: this.state.menuId,
      firstMenu: firstMenu,
      secondMenu: secondMenu,
      name: menuName,
      url: menuUrl
    }
    console.log(`--params--${JSON.stringify(params)}`);
    this.props.handleModal(params, event);
  }

  firstMenuChange = (value) => {
    console.log(`--value--`, value);
    fetchPost('/menu/parent/' + value + '/list').then(json => {
      if (json.data != null) {
        console.log(`--second-menu--`, json.data);
        let data = json.data.list;
        this.setState({
          firstMenu: value,
          secondMenus: data,
          secondMenu: '',
        });
      }
    });
  }
  secondMenuChange = (value) => {
    this.setState({
      secondMenu: value,
    });
  }

  // get first menu list
  getFirstMenus() {
    fetchPost('/menu/parent/0/list', this.state.params).then(json => {
      console.log('menuData--00');
      if (json.data != null) {
        console.log('menuData', json.data);
        let data = json.data.list;
        this.setState({
          firstMenus: data
        });
      }
    });
  }
  componentDidMount() {
    this.getFirstMenus();
  }


  render () {
    const {modalMenuState, editMenuId} = this.state.modalParams;
    const { visible, confirmLoading } = modalMenuState;

    const {menuName, menuUrl, firstMenus, secondMenus, secondMenu, maskClosable} = this.state;

    const firstMenuOptions = firstMenuData.map(province => <Option key={province}>{province}</Option>);
    const secondMenuOptions = this.state.secondMenus.map(city => <Option key={city}>{city}</Option>);

    let title = '新增菜单';
    let modalStyle = {'display': 'block'};
    if (editMenuId != 0) {
      title = '修改菜单';
      modalStyle = {'display': 'none'};
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
              <Row style={modalStyle}>
                <Col span={6} className={styles.lableInput}>一级菜单：</Col>
                <Col span={18}>
                  <Select placeholder="选择一级菜单" style={{ width: 150 }} onChange={this.firstMenuChange}>
                    {
                      firstMenus.map((value,index) => {
                        return (
                          <Option key={index} value={value.id}>{value.name}</Option>
                        )
                      })
                    }
                  </Select>
                </Col>
              </Row><br/>
              <Row style={modalStyle}>
                <Col span={6} className={styles.lableInput}>二级菜单：</Col>
                <Col span={18}>
                  <Select placeholder="选择二级菜单" value={secondMenu} style={{ width: 150 }} onChange={this.secondMenuChange}>
                    {
                      secondMenus.map((value,index) => {
                        return (
                          <Option key={index} value={value.id}>{value.name}</Option>
                        )
                      })
                    }
                  </Select>
                </Col>
              </Row><br/>
              <Row>
                <Col span={6} className={styles.lableInput}>名称：</Col>
                <Col span={18}><Input value={menuName} onChange={this.menuInputName} placeholder="请输入"/></Col>
              </Row><br/>
              <Row>
                <Col span={6} className={styles.lableInput}>url：</Col>
                <Col span={18}><Input value={menuUrl} onChange={this.menuInputUrl} placeholder="请输入"/></Col>
              </Row><br/>
           </Modal>
        </div>
    )
  }
}

export default MyModal;
