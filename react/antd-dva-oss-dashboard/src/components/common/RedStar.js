/**
 * lianpf 17/07/26
 */
import React, { Component, PropTypes } from 'react';

class RedStar extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <span style={{"color": "red", "font-size": "12px", "margin-right": "1px"}}>*</span>
    )
  }
}

export default RedStar;
