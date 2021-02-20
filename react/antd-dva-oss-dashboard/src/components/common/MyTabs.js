/**
 * lianpf 17/07/28
 */
import React, { Component, PropTypes } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class MyTabs extends React.Component {
  constructor (props) {
    super (props);
    this.tabsCallback = this.tabsCallback.bind(this);
  }

  tabsCallback(key) {
    console.log(`--myTabs--${key}`);
  }
  render () {

    /*
    * 调用params
    * tanbsParams = [{key, tab, component}]
    * */
    const tabsParams = this.props.tabsParams;
    return (
      <Tabs onChange={this.tabsCallback} type="card">
        {
          tabsParams.map((value, index) => {
            return (
              <TabPane tab={value.tab} key={value.key}>{value.component}</TabPane>
            )
          })
        }
      </Tabs>
    )
  }
}

export default MyTabs;
