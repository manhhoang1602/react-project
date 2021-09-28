import React from 'react';
import './App.scss';
import LayoutComponent from './commons/layout/LayoutComponent';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi_VN');

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={viVN}>
        <LayoutComponent />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
