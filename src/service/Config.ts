import Login from '../modules/login/Login';
import Dashboard from '../modules/dashboard/Dashboard';

export class Config {
  static limit: number = 24;
  static routerAdmin = [
    {
      path: `/dashboard`,
      component: Dashboard,
    },
    {
      path: '/login',
      component: Login,
    },
  ];
  static routerEnterprise = [
    {
      path: `/dashboard`,
      component: Dashboard,
    },
    {
      path: '/login',
      component: Login,
    },
  ];
}
