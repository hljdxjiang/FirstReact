import React from "react";
import Info from "./Info";
import { Row, Col } from "antd";
import Echarts from "./Echarts";
import Ordertable from "./Ordertable";
import "./index.css";

export default class Dashboard extends React.Component {
  componentWillMount() {}
  render() {
    return (
      <div className="main_content_div">
        {/* <Info />
        <Row>
          <Col md={12}>
            <div style={{ margin: "5px" }}>
              <Echarts etype="2" />
            </div>
          </Col>
          <Col md={12}>
            <div style={{ margin: "5px" }}>
              <Echarts etype="3" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Ordertable etype="1" />
          </Col>
          <Col md={12}>
            <Ordertable etype="2" />
          </Col>
        </Row> */}
      </div>
    );
  }
}
