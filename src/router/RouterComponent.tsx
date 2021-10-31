import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Config } from '../service/Config';

export const RouterAdminComponent: React.FC = () => {
  return (
    <Switch>
      {
        Config.routerAdmin.map(value => <Route exact path={value.path} component={value.component} />)
      }
    </Switch>
  );
};

export const RouterEnterpriseComponent: React.FC = () => {
  return (
    <Switch>
      {
        Config.routerEnterprise.map(value => <Route exact path={value.path} component={value.component} />)
      }
    </Switch>
  );
};