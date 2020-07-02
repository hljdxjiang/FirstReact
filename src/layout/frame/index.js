import React from "react";
import { Layout } from "antd";
import Sider from "../side";
import Header from "../header";
import Content from "../content";
const mapStateToProps = (state, ownState) => {};

const mapDispatchToProps = (state, action) => {};

class frame extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <Sider></Sider>
        <Layout>
          <Header></Header>
          <Content></Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(frame);
