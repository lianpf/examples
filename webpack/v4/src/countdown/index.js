import React from 'react';
import {connect} from 'react-redux';

// import '../utils/common.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Countdown 组件</h3>
      </div>
    );
  }
}

export default connect()(Index);

