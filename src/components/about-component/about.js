import React, { Component } from 'react';
import './index.css';

// 导出该组件供给其它模块使用
class AboutComponent extends Component {
  render() {
    return <h1 className="hello-component">about,Component</h1>
  }
}

export default AboutComponent;