import React from "./node_modules/react";
import Echarts from "./Echarts";
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Echarts />
      </div>
    );
  }
}

export default Charts;
