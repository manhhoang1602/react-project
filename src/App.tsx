import React from 'react';
import './App.scss';
import LayoutComponent from './commons/layout/LayoutComponent';
import { Route, Router, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import history from './service/History';
import Login from './modules/login/Login';

moment.locale('vi_VN');

function App() {
  return (
    <Router history={history}>
      <ConfigProvider locale={viVN}>
        <Switch>
          <Route exact path={'/login'} component={Login} />
          <Route component={LayoutComponent} />
        </Switch>
      </ConfigProvider>
    </Router>
  );
}

export default App;
