import React from "react";
import { Tabs } from "antd";
import EditBase from "./EditBase";

const { TabPane } = Tabs;
class EditMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div className="edit_title">
          <div className="edit_title_value">
            {this.state.id === "" ? "创建课程" : "修改课程"}
          </div>
        </div>
        <div style={{ margin: "5px", background: "#FFF" }}>
          <Tabs tabPosition="left">
            <TabPane tab="基本信息" key="1">
              <EditBase id={this.props.query.courseid} />
            </TabPane>
            <TabPane tab="视频信息" key="2">
              {/* <Test /> */}
            </TabPane>
            <TabPane tab="详细信息" key="3"></TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default EditMain;
