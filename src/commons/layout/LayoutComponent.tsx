import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuComponent, { dataMenuAdmin } from '../menu/MenuComponent';
import { HeaderComponent } from './HeaderComponent';
import { RouterAdminComponent } from '../../router/RouterComponent';

const { Content, Sider } = Layout;

interface IStateLayoutComponent {
  collapsed: boolean;
}

interface IPropsLayoutComponent {
}

export default class LayoutComponent extends Component<IPropsLayoutComponent, IStateLayoutComponent> {
  constructor(props: IPropsLayoutComponent) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  render() {
    return (
      <div className={'layout'}>
        <Layout>
          <HeaderComponent toggle={() => this.setState({ collapsed: !this.state.collapsed })} />
          <Sider trigger={null} theme={'light'} collapsible collapsed={this.state.collapsed} style={{ marginTop: 69 }}>
            <MenuComponent data={dataMenuAdmin} />
          </Sider>

          <Layout className='layout__site-layout'>
            <Content className='layout__site-layout__site-layout-background'>
              <RouterAdminComponent />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
