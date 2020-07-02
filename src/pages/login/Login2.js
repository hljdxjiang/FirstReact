import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import "./style.css";

export default class extends Component {
  state = {
    loading: false,
    message: "",
  };

  render() {
    return (
      <div>
        <div className="login-bg">
          <div className="box">
            <div className="header">欢迎登陆</div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                <Input allowClear autoFocus prefix="" placeholder="用户名" />
              </Form.Item>
              <Form.Item>
                <Input.Password prefix="" placeholder="密码" />
              </Form.Item>
              <Button styleName="submit-btn" type="primary" htmlType="submit">
                登陆
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
