import React from 'react';
import {connect} from 'react-redux';

import './index.less';
import '../utils/common.less';

let componentStr = "{Countdown}";
let _className="className={'button'}";
let _disabledClassName="disabledClassName={'disabledButton'}";
let _duration="duration={10}";
let _countingText="countingText={'__TIME__s后再次获取'}";
let _highestLevelState="highestLevelState={'-1'}";
let _onClick="onClick={this.clickFunc}";
let _onStart="onStart={this.onStart}";
let _onEnd="onEnd={this.onEnd}";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  tabsChange(key) {
    console.log('--tabs-change--', key);
  }

  render() {
    return (
        <div className={'homePage'}>
          <div className={'item'}>
            <div className={'titleOne'}>组件库: react-pc-ui of React</div>
            <p>这是react-pc-ui的 React 实现, 是作者 <a href="https://github.com/lianpf">@lianpf</a>
              在工作之余总结归纳的在其web项目中的常规组件, 希望在方便自己的同时，也能帮助到大家！
            </p>
          </div>

          <div className={'item'}>
            <div className={'titleTwo'}>基础环境</div>
            <ul>
              <li>现代浏览器和 IE9 及以上</li>
              <li>React web 项目</li>
            </ul>
          </div>

          <div className={'item'}>
            <div className={'titleTwo'}>版本</div>
            <ul>
              <li>
                <div className={'inlineBlock firstInlineBlock'}>当前版本:</div>
                <a className={'inlineBlock'} href="https://www.npmjs.org/package/react-pc-ui">
                  <img src="https://img.shields.io/npm/v/react-pc-ui.svg?style=flat-square" alt="npm package" />
                </a>
              </li>
            </ul>
            <div className={'titleThree'}>重大版本</div>
            <ul>
              <li>v1.0.0: react-pc-ui 发布！</li>
              <li>v1.0.5: 10个基础组件 button、modal、table、message、breadcrumb、tabs、slider、steps、countdown、 pagination 雏形 </li>
            </ul>
          </div>

          <div className={'item'}>
            <div className={'titleTwo'}>现有组件</div>
            <ul>
              <li>Button</li>
              <li>Modal</li>
              <li>Modal</li>
              <li>Message</li>
              <li>Breadcrumb</li>
              <li>Tabs</li>
              <li>Slider</li>
              <li>Steps</li>
              <li>Countdown</li>
              <li>Pagination</li>
            </ul>
          </div>

          <div className={'item'}>
            <div className={'titleTwo'}>安装</div>
            <div className={'titleThree'}>使用 npm 安装</div>
            <div>推荐使用 npm 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用</div>
            <div className={'showCoding'}>
              $  <span className={'highLightRed'}>npm install</span> react-pc-ui --save
            </div>
            <div>如果你的网络环境不佳，推荐使用 <a href="https://github.com/cnpm/cnpm">cnpm</a></div>
          </div>

          <div className={'item'}>
            <div className={'titleTwo'}>示例</div>
            <div className={'showCoding'}>
              <div><span className={'highLightBlue'}>import</span> React <span className={'highLightBlue'}>from</span> 'react';</div>
              <div><span className={'highLightBlue'}>import</span> { componentStr } <span className={'highLightBlue'}>from</span> 'react-pc-ui';</div><br />
              React.render(<br />
              <div className={'textLeft'}>
                &lt; <span className={'highLightRed'}>Countdown</span>  <br />
                <div className={'textLeft'}>{_className}</div>
                <div className={'textLeft'}>{_disabledClassName}</div>
                <div className={'textLeft'}>{_duration}</div>
                <div className={'textLeft'}>{_countingText}</div>
                <div className={'textLeft'}>{_highestLevelState}</div>
                <div className={'textLeft'}>{_onClick}</div>
                <div className={'textLeft'}>{_onStart}</div>
                <div className={'textLeft'}>{_onEnd}</div>
                /&gt;, container);
              </div>
            </div>
          </div>

          <div className={'item'}>
            <div className={'titleTwo'}>如何贡献</div>
            <div>如果你希望参与贡献，欢迎 <a href="https://github.com/lianpf/react-pc-ui/pulls">Pull Request</a></div>
          </div>

          <div className={'item'}>
            <div className={'titleTwo'}>联系作者</div>
            <div>如果你有任何关于该组件库的想法或者其他考虑，欢迎联系</div>
            <ul>
              <li>gitHub: <a href="https://github.com/lianpf">@lianpf</a></li>
              <li>e-mail: wanderlian@foxmail.com</li>
            </ul>
          </div>
        </div>
    );
  }
}

export default connect()(Index);

