import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
// import { Button } from 'react-pc-ui'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('--button-onClick--');
  }

  render() {
    return (
      <div>
        <h3>Button 组件</h3>
      </div>
    );
  }
}
// function mapStateToProps(state) {
//   const { borrowMoney } = state;
//   return { borrowMoney };
// }

export default connect()(Index);

