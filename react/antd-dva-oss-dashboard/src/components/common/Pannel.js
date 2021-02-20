/**
 * Created by ziyu on 17/3/9.
 */
import React, { Component, PropTypes } from 'react'
import Styles from './pannel.less';

class Pannel extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      panels: []
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      panels: props.panelParams
    })
  }

  render () {
    const len = this.state.panels.length;
    return (
        <div className={Styles.panelBox}>
          {
            this.state.panels.map((data,index) => {
              return (
                <div key={index} style={{width: `${100/len}%`}} className={Styles.panelContainer}>
                  <div className={Styles.panelWrapper}>
                    <span className={Styles.panelData}>{data.value}</span>
                    <span className={Styles.panelTip}>{data.name}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
    )
  }
}

export default Pannel
