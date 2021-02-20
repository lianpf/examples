/**
 * lianpf 17/07/28
 */
import React, { Component, PropTypes } from 'react';

import { Steps } from 'antd';
const Step = Steps.Step;
const id = 1;

class MyStep extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    /*
    * 调用params
    * stepParams = [{list, current, status}]
    * */
    const stepParams = this.props.stepParams;
    let style = {width: '45%', 'margin-left': '12%'};
    const styleBool = (stepParams.statusHistoryList.length > 2 ) ? true : false;
    if (styleBool) {
      style = {width: '80%', 'margin-left': '10%'}
    }

    let dd = [];
    dd.push(
      <Steps current={stepParams.current} status="Finished">
        {
          stepParams.statusHistoryList.map((value, index) => {
            return(
              <Step key={index} title={value.comment} description={value.gmtCreate} />
            )
          })
        }
      </Steps>
    );

    const showStep = (stepParams.statusHistoryList.length) ? dd : (<div>暂无数据!</div>);
    return (
        <div style={style}>
          {showStep}
        </div>
    )
  }
}

export default MyStep;
