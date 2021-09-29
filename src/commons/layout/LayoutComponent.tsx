import React, { Component } from 'react';
import { Card, Col, Layout, Row } from 'antd';
import MenuComponent, { dataMenuAdmin } from '../menu/MenuComponent';
import RangePickerComponent from '../range-picker/RangePickerComponent';
import UploadFileComponent from '../upload/UploadFileComponent';
import { Notification } from '../notification/Notification';
import ExportCsv, { dataExport } from '../export-excel/ExportCSV';
import TableComponent from '../table/TableComponent';
import LineChart, { dataLineChart } from '../chart/LineChart';
import BarChart, { dataBarChart } from '../chart/BarChart';
import DoughnutAndPieChart from '../chart/DoughnutAndPieChart';
import Dashboard from '../../modules/dashboard/Dashboard';

const { Header, Content, Sider } = Layout;

interface IHeaderComponent {
  toggle: () => any;
}

const HeaderComponent: React.FC<IHeaderComponent> = ({ toggle }) => {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '2px 50px',
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 4,
      }}
    >
      <div>
        <div>
          <div>
            <div onClick={() => toggle()}>Hoang DEV</div>
          </div>
        </div>
      </div>
    </Header>
  );
};

interface IStateLayoutComponent {
  collapsed: boolean;
}

interface IPropsLayoutComponent {}

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
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ marginTop: 69 }}>
            <MenuComponent data={dataMenuAdmin} />
          </Sider>

          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: '0px 16px',
                padding: '24px 0',
                minHeight: 'calc(100vh - 90px)',
                backgroundColor: 'rgb(240, 242, 245)',
                marginTop: 60,
              }}
            >
              <Dashboard />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
