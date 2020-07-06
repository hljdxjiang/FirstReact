import React from "react";
import { Layout, Popover, Menu, Modal, Input, message } from "antd";
import { Redirect } from "react-router-dom";
import { clearCookieAndSession, getUserID } from "../../commons/localstore";
import { gologin } from "../../commons";
import avater from "./b1.jpg";
import Side from "../side";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./index.css";
import axios from "../../commons/ajax";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
class MHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showconfirm: false,
      visible: false,
      orgpasswd: "",
      newpasswd: "",
      newpasswd2: "",
    };
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  mapStateToProps = () => {};
  menuClick = (e) => {
    if (e.key === "logout") {
      clearCookieAndSession();
      //window.location.href = "/login";
    } else {
      if (e.key === "changepasswd") {
        this.setState({ showconfirm: true });
      }
    }
  };
  onOkClick = () => {
    if (
      this.state.orgpasswd === "" ||
      this.state.newpasswd === "" ||
      this.state.newpasswd2 === ""
    ) {
      message.warning("信息输入不完整。");
      return;
    }
    if (this.state.newpasswd !== this.state.newpasswd2) {
      message.warning("两次密码输入不一致,请重新输入");
      return;
    }
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
    if (!reg.test(this.state.newpasswd)) {
      message.warning("新密码必须8-15位的数字和字母组合");
      return;
    }
    var obj = {};
    obj.userid = getUserID();
    obj.orgPasswd = this.state.orgpasswd;
    obj.newpasswd = this.state.newpasswd;
    axios({
      url: "/api/user/changepwd",
      method: "POST",
      data: JSON.stringify(obj),
    })
      .then((res) => {
        if (res && res.status && res.status === 200) {
          if (res.data.code === 0) {
            message.info("密码修改成功,请重新登录");
            this.setState({
              showconfirm: false,
            });
            gologin();
          } else {
            message.info(res.data.message);
          }
        }
      })
      .catch((err) => {});
  };
  onCancelClick = () => {
    this.setState({ showconfirm: false });
  };
  inputChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    this.setState({
      [name]: value,
    });
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
              <Menu.Item key="changepasswd">修改密码</Menu.Item>
              <Menu.Item key="logout">退出登录</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <Modal
          title={"修改密码"}
          visible={this.state.showconfirm}
          onOk={this.onOkClick.bind(this)}
          onCancel={this.onCancelClick.bind(this)}
        >
          <div className="model_div">
            <label className="model_lable model_title_lable">原密码：</label>
            <Input.Password
              placeholder="请输入原密码"
              name="orgpasswd"
              onChange={this.inputChange.bind(this)}
              value={this.state.orgpasswd}
            />
          </div>
          <div className="model_div">
            <label className="model_lable model_title_lable">新密码：</label>
            <Input.Password
              placeholder="请输入新密码"
              name="newpasswd"
              onChange={this.inputChange.bind(this)}
              value={this.state.newpasswd}
            />
          </div>
          <div className="model_div">
            <label className="model_lable model_title_lable">确认密码：</label>
            <Input.Password
              placeholder="请输入确认密码"
              name="newpasswd2"
              onChange={this.inputChange.bind(this)}
              value={this.state.newpasswd2}
            />
          </div>
        </Modal>
      </Header>
    );
  }
}

export default MHeader;
