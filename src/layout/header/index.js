import React from "react";
import { Layout, Popover, Menu } from "antd";
import { clearCookieAndSession } from "../../commons/localstore";
import avater from "./b1.jpg";
import Side from "../side";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./index.css";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
class MHeader extends React.Component {
  state = {
    visible: false,
  };
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  mapStateToProps = () => {};
  menuClick = (e) => {
    if (e.key === "logout") {
      clearCookieAndSession();
      //window.location.href = "/login";
    }
    console.log(e.key);
  };
  render() {
    return (
      <Header className="site-layout-background header_sty">
        <div>
          {this.props.ismobile ? (
            <Popover
              content={<Side></Side>}
              trigger="click"
              placement="bottomLeft"
              visible={this.state.visible}
              onVisibleChange={this.handleVisibleChange}
            >
              <div className="trigger">
                <MenuOutlined></MenuOutlined>
              </div>
            </Popover>
          ) : (
            <div className="trigger" onClick={this.props.click}>
              {this.props.collapsed ? (
                <MenuUnfoldOutlined></MenuUnfoldOutlined>
              ) : (
                <MenuFoldOutlined></MenuFoldOutlined>
              )}
            </div>
          )}

          <Menu
            className="header_menu"
            onClick={this.menuClick.bind(this)}
            mode="horizontal"
          >
            <SubMenu
              key="sub1"
              title={
                <span className="avatar">
                  <img src={avater} alt="头像" />
                  <i className="on bottom b-white" />
                </span>
              }
            >
              <Menu.Item key="setting:1">你好</Menu.Item>
              <Menu.Item key="changepwd">修改密码</Menu.Item>
              <Menu.Item key="logout">退出登录</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Header>
    );
  }
}

export default MHeader;
