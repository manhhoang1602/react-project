import React from 'react';
import './App.scss';
import LayoutComponent from './commons/layout/LayoutComponent';
import { BrowserRouter, Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import history from './service/History';

moment.locale('vi_VN');

function App() {
  return (
    <Router history={history}>
      <ConfigProvider locale={viVN}>
        <LayoutComponent />
      </ConfigProvider>
    </Router>
  );
}

export default App;
