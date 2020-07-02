import React from "react";
import { Row, Col, Card } from "antd";
import {
  MessageOutlined,
  MailOutlined,
  CloudServerOutlined,
  BankOutlined,
} from "@ant-design/icons";
import Messagelist from "./Messagelist";
import "./info.css";

class Info extends React.Component {
  state = {
    schoolinfo: {
      stype: "基础版",
      enddt: "2020-05-11",
      cnt: 1000,
      stucnt: 0,
    },
    sms: {
      all: 1000,
      used: 10,
    },
    email: {
      cnt: 1000,
      used: 10,
    },
    store: {
      all: 100,
      used: 10,
      enddt: "2020-01-01",
    },
    flow: {
      all: 1000,
      used: 10,
    },
  };
  componentWillMount() {
    this.getData();
  }
  getData = () => {
    //这个方法通过axios获取后台数据
  };
  render() {
    return (
      <div>
        <Row>
          <Col className="gutter-row" md={6}>
            <div className="col_card gutter-box">
              <Card bordered={false} style={{ height: "140px" }}>
                <div className="clear y-center">
                  <div className="pull-left mr-m sc">
                    <BankOutlined
                      className="text-2x text-danger"
                      style={{ color: "#34a6ea" }}
                    />
                  </div>
                  <div className="card-title">网校版本</div>
                  <div className="clear">
                    <div className="text-muted" style={{ float: "left" }}>
                      版本名称:
                    </div>
                    <div className="card-value">
                      {this.state.schoolinfo.stype}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted" style={{ float: "left" }}>
                      学员数量:
                    </div>
                    <div className="card-value">
                      {this.state.schoolinfo.stucnt}/{this.state.schoolinfo.cnt}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted" style={{ float: "left" }}>
                      网校有效期:
                    </div>
                    <div className="card-value">
                      {this.state.schoolinfo.enddt}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="gutter-box col_card">
              <Card bordered={false} style={{ height: "140px" }}>
                <div className="clear y-center">
                  <div className="pull-left mr-m sc">
                    <MessageOutlined
                      className="text-2x text-danger"
                      style={{ color: "green" }}
                    />
                  </div>
                  <div className="card-title">短信</div>
                  <div className="clear">
                    <div>
                      <div className="text-muted" style={{ float: "left" }}>
                        短信总量:
                      </div>
                      <div className="card-value">{this.state.sms.all}</div>
                    </div>
                    <div>
                      <div className="text-muted" style={{ float: "left" }}>
                        短信使用量:
                      </div>
                      <div className="card-value">{this.state.sms.used}</div>
                    </div>
                    <div>
                      <div className="text-muted" style={{ float: "left" }}>
                        短信剩余量:
                      </div>
                      <div className="card-value">
                        {this.state.sms.all - this.state.sms.used}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={6}>
            <div className=" gutter-box col_card">
              <Card bordered={false} style={{ height: "140px" }}>
                <div className="clear y-center">
                  <div className="pull-left mr-m sc">
                    <MailOutlined
                      className="text-2x text-danger"
                      style={{ color: "#6d6dea" }}
                    />
                  </div>
                  <div className="card-title">邮件</div>
                  <div className="clear">
                    <div className="clear">
                      <div>
                        <div className="text-muted" style={{ float: "left" }}>
                          邮件总量:
                        </div>
                        <div className="card-value">{this.state.email.cnt}</div>
                      </div>
                      <div>
                        <div className="text-muted" style={{ float: "left" }}>
                          邮件使用量:
                        </div>
                        <div className="card-value">
                          {this.state.email.used}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted" style={{ float: "left" }}>
                          邮件剩余量:
                        </div>
                        <div className="card-value">
                          {this.state.email.cnt - this.state.email.used}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="gutter-box col_card">
              <Card bordered={true} style={{ height: "140px" }}>
                <div className="clear y-center">
                  <div className="pull-left mr-m sc">
                    <CloudServerOutlined
                      className="text-2x text-danger"
                      style={{ color: "#545353" }}
                    />
                  </div>
                  <div className="clear">
                    <div className="card-title">存储</div>
                    <div className="clear">
                      <div className="clear">
                        <div>
                          <div className="text-muted" style={{ float: "left" }}>
                            流量信息:
                          </div>
                          <div className="card-value">
                            {this.state.flow.used}GB/{this.state.flow.all}GB
                          </div>
                        </div>
                        <div>
                          <div className="text-muted" style={{ float: "left" }}>
                            存储信息:
                          </div>
                          <div className="card-value">
                            {this.state.store.used}GB/{this.state.store.all}
                            GB
                          </div>
                        </div>
                        <div>
                          <div className="text-muted" style={{ float: "left" }}>
                            存储有效期:
                          </div>
                          <div className="card-value">
                            {this.state.store.enddt}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={12}>
            <Messagelist />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Info;
