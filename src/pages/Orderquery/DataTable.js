import React from "react";
import { Table } from "antd";
class DataTable extends React.Component {
  state = {
    permission: "",
    data: [],
    sub: [],
  };
  componentWillReceiveProps(nexProps) {
    this.setState({ data: nexProps.data });
  }
  render() {
    let dt = Array.from(this.state.data);
    return (
      <Table
        columns={this.props.columns}
        dataSource={dt}
        loading={false}
        pagination={{
          current: 2,
          pageSize: 10,
          position: ["top", "bottom"],
        }}
      ></Table>
    );
  }
}

export default DataTable;
