import React from "react";
import { Layout } from "antd";
import Menus from "./menus";
import "./index.css";
const { Sider } = Layout;

class MSider extends React.Component {
  render() {
    return (
      <Sider
        trigger={this.props.trigger}
        collapsible={this.props.collapsible}
        collapsed={this.props.collapsed}
      >
        <div className="logo"></div>
        <Menus />
      </Sider>
    );
  }
}

export default MSider;
