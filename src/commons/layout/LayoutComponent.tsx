import React, { Component } from "react";
import { Layout } from "antd";
import MenuComponent from "../menu/MenuComponent";
import RangePickerComponent from "../range-picker/RangePickerComponent";

const { Header, Content, Sider } = Layout;

interface IHeaderComponent {
  toggle: () => any
}

const HeaderComponent: React.FC<IHeaderComponent> = ({ toggle }) => {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "2px 50px",
        position: "fixed",
        zIndex: 1,
        width: "100%",
        backgroundColor: "white",
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
      <div className={"layout"}>
        <Layout>
          <HeaderComponent toggle={() => this.setState({ collapsed: !this.state.collapsed })} />
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ marginTop: 69 }}>
            <MenuComponent />
          </Sider>

          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: "0px 16px",
                padding: "24px 0",
                minHeight: "calc(100vh - 90px)",
                backgroundColor: "rgb(240, 242, 245)",
                marginTop: 60,
              }}
            >
              <RangePickerComponent />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}