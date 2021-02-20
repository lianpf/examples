/**
 * lianpf 17/07/26
 */
import React, { Component, PropTypes } from 'react';

class MyTag extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {

    /*
    * 调用传参数
    * {
    *   status: 1/2/3 success/progress/error 决定背景颜色
    *   size： 1/2 small(24*40) / big (24*60)
    *   text: 显示文本
    * }*/

    const {status, size, text } = this.props.params;
    let _color = '#41b883';
    if (status == '2') {
      _color = '#108ee9';
    } else if(status == '3') {
      _color = '#f04134';
    }

    let _w = '40px';
    let _h = '24px';
    if (size == '2') {
      _w = '60px';
    }

    const tagStyle = {
      'display': 'inline-block',
      'text-align': 'center',
      'min-width': _w,
      'height': _h,
      'line-height': '24px',
      'background': _color,
      'border-radius': '3px',
      'font-size': '12px',
      'color': '#ffffff',
      'padding': '0 8px'
    };


    return (
        <div style={tagStyle}>
          {text}
        </div>
    )
  }
}

export default MyTag;
