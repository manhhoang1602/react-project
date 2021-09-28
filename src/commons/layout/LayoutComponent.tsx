import React, { Component } from 'react';
import { Card, Col, Layout, Row, Table } from 'antd';
import MenuComponent from '../menu/MenuComponent';
import RangePickerComponent from '../range-picker/RangePickerComponent';
import UploadFileComponent from '../upload/UploadFileComponent';
import { Notification } from '../notification/Notification';

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
            <MenuComponent />
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
              <Row gutter={16}>
                <Col md={6}>
                  <Card title={'Range picker component'} bordered={false}>
                    <RangePickerComponent />
                  </Card>
                </Col>
                <Col md={6}>
                  <Card title={'Upload component'} bordered={false}>
                    <UploadFileComponent
                      type={'picture-card'}
                      limit={1}
                      name={'image'}
                      path={'http://apidev.tpmart.winds.vn/api/v1/files/uploadFile/1'}
                      size={3}
                      isDisplayImgError={true}
                      logger={(data) => {}}
                    />
                  </Card>
                </Col>
                <Col md={6}>
                  <Card title={'Notification component'} bordered={false}>
                    <button onClick={() => Notification.PushNotification('SUCCESS', 'Test push notyfication')}>
                      Push Notification
                    </button>
                    <button onClick={() => Notification.PushMassage('SUCCESS', 'Test push notyfication')}>
                      Push Message
                    </button>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
