import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import DocumentTitle from "react-document-title";
import axios from "../../commons/ajax";
import { hasAnyMenus } from "../../commons";
import { setCookieAndSession } from "../../commons/localstore";
import "./index.css";

const mapStateToProps = (state, ownstate) => {
  return {};
};
const mapDispatchToProps = (dispatch, state) => {
  return {
    login: (val) => dispatch({ type: "Login", value: val }),
    refresh: (val) => dispatch({ type: "RefreshToken", value: val }),
  };
};

class Login extends React.Component {
  formRef = React.createRef();
  state = {
    userid: "",
    passwd: "",
  };
  onLogin = () => {
    var user = {};
    user.userid = this.state.userid;
    user.password = this.state.passwd;
    axios({
      url: "/api/auth/lgoin",
      method: "post",
      data: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            var storeuser = response.data.result;
            setCookieAndSession("_userid", storeuser.userid);
            setCookieAndSession("_refresh_token", storeuser.refToken);
            setCookieAndSession("_refresh_time", storeuser.refreshTime);
            setCookieAndSession("_user_roles", storeuser.roleID);
            setCookieAndSession("_token", storeuser.token);
            this.props.login(storeuser);
            if (!hasAnyMenus()) {
              message.error("您没有任何菜单权限，无法登陆", 3);
            }
            window.location.href = "/";
          } else {
          }
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });

    //window.location.href = "/";
  };
  onChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    this.setState({ [name]: value });
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };
  render() {
    return (
      <DocumentTitle title="系统登录">
        <div className="black">
          <div className="login-form">
            <Form
              ref={this.formRef}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="userid"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              >
                <Input
                  name="userid"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入用户名"
                  onChange={this.onChange.bind(this)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  name="passwd"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="请输入密码"
                  onChange={this.onChange.bind(this)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={this.onLogin.bind(this)}
                >
                  登录
                </Button>

                <Button
                  type="primary"
                  className="reset-form-button"
                  onClick={this.onReset.bind(this)}
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
