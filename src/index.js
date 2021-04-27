import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './mock/index.js'
import App from './App.jsx';
import {ConfigProvider} from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
        <App />
  </ConfigProvider>,
  document.getElementById('root')
);