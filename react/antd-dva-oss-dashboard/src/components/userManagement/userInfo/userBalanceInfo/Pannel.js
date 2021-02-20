/**
 * Created by ziyu on 17/3/9.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './pannel.less';
import MyTag from '../../../common/MyTag';

class Pannel extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    const {list, isShow} = this.props.params;
    const len = list.length + 1;

    let dd = [];
    if (isShow) {
      list.map((data,index) => {
        let buttonDiv = '';
        let styleWidth = {};
        let styleBorder = {};
        if (index === 0) {
          styleWidth = {width: `25%`, };
          styleBorder = {'border-right': '1px solid #e9e9e9'};
        } else {
          styleWidth = {width: `${60/len}%`};
          styleBorder = {};
        }
        dd.push(
          <div key={index} style={styleWidth} className={Styles.panelContainer}>
            <div className={Styles.panelWrapper} style={styleBorder}>
              <span className={Styles.panelTip}>{data.name}</span>
              <span className={Styles.panelData}>{data.value}</span>
            </div>
          </div>
        )
      })
    }

    const showPannel = isShow ? dd : (<div>暂无数据!</div>)
    return (
        <div className={Styles.panelBox}>
          {showPannel}
        </div>
    )
  }
}

export default Pannel
