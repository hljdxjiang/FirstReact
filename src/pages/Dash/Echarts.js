import React from "react";
import { Card } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import EchartViews from "./EchartViews";
class Echarts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newday: 7,
      radom: Math.random(),
    };
  }
  setSelectValue = (e) => {
    this.setState({
      newday: e.target.value,
    });
  };
  refresh = () => {
    this.setState({ radom: Math.random() });
  };
  render() {
    const etype = this.props.etype;
    var title = "";
    switch (etype) {
      case "1":
        title = "学员趋势图：近";
        break;
      case "2":
        title = "订单趋势图：近";
        break;
      case "3":
        title = "收入趋势图：近";
        break;
      default:
        title = "";
    }
    return (
      <Card bordered={false} style={{ height: "288px" }}>
        <div className="pb-m">
          <h3 style={{ float: "left" }}>{title}</h3>
          <select
            value={this.state.newday}
            style={{ float: "left", margin: "3px" }}
            onChange={this.setSelectValue.bind(this)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="30">30</option>
          </select>
          <div>
            <h3>天</h3>
          </div>
        </div>
        <span
          style={{ position: "absolute", right: "5vw", top: "20px" }}
          onClick={this.refresh.bind(this)}
        >
          <a>
            <SyncOutlined />
          </a>
        </span>
        <EchartViews
          day={this.state.newday}
          etype={this.props.etype}
          rdm={this.state.radom}
        />
      </Card>
    );
  }
}

export default Echarts;
