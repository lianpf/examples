import React, {Component, PropTypes} from 'react'
import {fetchPost} from '../../../utils/request'
import {Table, Icon, Popconfirm, message, Button, Card} from 'antd';


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {
        startDate: '',
        endDate: ''
      },
      list: [],
      applyTotalNum: '',
      sysRejectTotalNum: '',
      sysVerifyTotalNum: '',
      manTotalNum: '',
      manPassTotalNum: '',
      manRejectTotalNum: '',
      manVerifyTotalNum: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(props) {
    if (props.params.startDate != this.state.params.startDate) {
      this.setState({
        params: props.params,
      }, () => {
        this.getData()
      });
    }
  }

  getData() {
    this.setState({
      loading: true
    });


    fetchPost('/audit/apply/list',
      this.state.params).then(json => {
      let total = {
        applyDate: '总计',
        applyNum: json.data.applyTotalNum,
        sysRejectNum: json.data.sysRejectTotalNum,
        sysVerifyNum: json.data.sysVerifyTotalNum,
        manNum: json.data.manTotalNum,
        manPassNum: json.data.manPassTotalNum,
        manRejectNum: json.data.manRejectTotalNum,
        manVerifyNum: json.data.manVerifyTotalNum,
      };
      json.data.applyDataVOLista.push(total);
      this.setState({
        params: this.state.params,
        list: json.data.applyDataVOLista,
        loading: false
      });
    });
  }


  render() {


    var self = this;

    const columns = [{
      title: '日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
      render: (text, record) => {
        return <div>
          {text.substring(0, 10)}
        </div>
      }
    }, {
      title: '申请订单数/比例',
      dataIndex: 'applyNum',
      key: 'applyNum',
      render: (text, record) => {
        if (!record.applyRatio) {
          return <div>
            {text}
          </div>
        }
        return <div>
          {text}/<span style={{color: "#f60"}}>{record.applyRatio}</span>
        </div>
      }
    }, {
      title: '系统拒绝数/比例',
      dataIndex: 'sysRejectNum',
      key: 'sysRejectNum',
      render: (text, record) => {
        if (!record.sysRejectRatio) {
          return <div>
            {text}
          </div>
        }
        return <div>
          {text}/<span style={{color: "#f60"}}>{record.sysRejectRatio}</span>
        </div>
      }
    }, {
      title: '系统审核中/比例',
      dataIndex: 'sysVerifyNum',
      key: 'sysVerifyNum',
      render: (text, record) => {
        if (!record.sysVerifyRatio) {
          return <div>
            {text}
          </div>
        }
        return <div>
          {text}/<span style={{color: "#f60"}}>{record.sysVerifyRatio}</span>
        </div>
      }
    }, {
      title: '人工流入数/比例',
      dataIndex: 'manNum',
      key: 'manNum',
      render: (text, record) => {
        if (!record.manRatio) {
          return <div>
            {text}
          </div>
        }
        return <div>
          {text}/<span style={{color: "#f60"}}>{record.manRatio}</span>
        </div>
      }
    }, {
      title: '人工通过数/比例',
      dataIndex: 'manPassNum',
      key: 'manPassNum',
      render: (text, record) => {
        if (!record.manPassRatio) {
          return <div>
            {text}
          </div>
        }
        return <div>
          {text}/<span style={{color: "#f60"}}>{record.manPassRatio}</span>
        </div>
      }
    }, {
      title: '人工拒绝数/比例',
      dataIndex: 'manRejectNum',
      key: 'manRejectNum',
      render: (text, record) => {
        if (!record.manRejectRatio) {
          return <div>
            {text}
          </div>
        }
        return <div>
          {text}/<span style={{color: "#f60"}}>{record.manRejectRatio}</span>
        </div>
      }
    }, {
      title: '人工审核中/比例',
      dataIndex: 'manVerifyNum',
      key: 'manVerifyNum',
      render: (text, record) => {
        if (!record.manVerifyRatio) {
          return <div>
            {text}
          </div>
        }
        return <div>
          {text}/<span style={{color: "#f60"}}>{record.manVerifyRatio}</span>
        </div>
      }
    }];


    return (
      <Card bodyStyle={{padding: 10}} bordered={false}>
        <div className="ant-layout-container">
          <Table columns={columns} dataSource={this.state.list} loading={self.state.loading}
                 bordered
                 pagination={false}
                 style={{background: '#FFFFFF'}}
                 size="small"
          >
          </Table>
        </div>
      </Card>

    )
  }


}
export  default List;
