/**
 * lianpf 17/08/07.
 */
import React, { Component, PropTypes } from 'react'
import { fetchPost } from './../../../utils/request'
import { Table } from 'antd';
import Styles from './Index.less'
import LeafMenus from  './LeafMenus'

class SecondClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: null,
      activeParentItem: null,
      activeId: null,
      activeItem:null
    }
  }

  componentWillReceiveProps(props) {
    let activeParentItem = props.activeItem;
    if (activeParentItem != this.state.activeParentItem) {
      this.setState({
        activeParentItem: activeParentItem
      }, () => {
        this.getMenus(activeParentItem.id);
      })
    }
  }


  getMenus(parenId) {
    console.log(`--secondClass--`, parenId);
    fetchPost('/menu/parent/' + parenId + '/list').then(json => {
      if (json.data != null) {
        let data = json.data.list;
        if (data.length > 0) {
          this.setState({
            menus: data,
            activeItem:data[0],
            activeId:data[0].id
          });
        } else {
          this.setState({
            menus: data,
            activeItem: null,
            activeId: ''
          });
        }
      }
    });
  }


  //单击行
  handleClickRow(record) {
    console.log(`--second--handleClickRow--`);
    this.setState({
      activeId: record.id,
      activeItem: record
    },()=>{
      this.props.setHandleItem(record);
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
    console.log(`---item---`, item);
    this.props.setHandleItem(item);
  }

  render() {
    const firstColumns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 50
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
          <a onClick={() => this.props.edit(record.id)}>修改</a>
        </span>
      ),
    }];

    const { menus } = this.state;
    return (
      <div>
        <div style={{width: '42%', display: 'inline-block', float: 'left'}}>
          <Table
            pagination={false}
            bordered
            style={{background:'#FFFFFF'}}
            dataSource={menus}
            columns={firstColumns}
            rowClassName={(record) => this.handleChosedRow(record.id)}
            title={() => '二级导航'}
            size="small"
          />
        </div>
        <div style={{width: '58%', display: 'inline-block', float: 'left', paddingLeft: 10}}>
          <LeafMenus edit={this.props.edit} activeItem={this.state.activeItem} setHandleItem={(item)=>this.setHandleItem(item)}/>
        </div>
      </div>
    )
  }
}


export default SecondClass;
