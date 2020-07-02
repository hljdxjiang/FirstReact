import React from "react";
import { Table } from "antd";
import "./Ordertable.css";

class Ordertable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    this.getData();
  }
  getData = () => {
    //获取信息
    const data = [
      {
        name: "John Brown",
        coursename: "一建精英班",
        paymethod: "支付宝支付",
        cost: 1099,
      },
      {
        name: "John Brown",
        coursename: "一建精英班",
        paymethod: "支付宝支付",
        cost: 1099,
      },
      {
        name: "John Brown",
        coursename: "一建精英班",
        paymethod: "支付宝支付",
        cost: 1099,
      },
      {
        name: "John Brown",
        coursename: "一建精英班",
        paymethod: "支付宝支付",
        cost: 1099,
      },
    ];
    this.setState({ data: data });
  };
  redirect = (e) => {
    e.preventdefault();
    const url =
      this.props.etype === 1 ? "/index/orderlist" : "/index/orderrank";
    window.location.href = url;
  };
  render() {
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "科目名称",
        dataIndex: "coursename",
        key: "coursename",
      },
      {
        title: "交易方式",
        dataIndex: "paymethod",
        key: "paymethod",
      },
      {
        title: "交易金额",
        dataIndex: "cost",
        key: "cost",
      },
    ];
    const columns2 = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "订单数量",
        dataIndex: "cnt",
        key: "cnt",
      },
      {
        title: "交易总金额",
        dataIndex: "cost",
        key: "cost",
      },
    ];
    return (
      <div style={{ padding: "5px" }}>
        <div className="table_title">
          <div style={{ float: "left", "margin-left": "5px" }}>
            {this.props.etype === 1 ? "最新订单" : "业绩排名"}
          </div>
          <div
            style={{ float: "right", "margin-right": "5px" }}
            onClick={this.redirect.bind(this)}
          >
            <a href="">更多</a>
          </div>
        </div>
        <div>
          <Table
            columns={this.props.etype === 1 ? columns : columns2}
            dataSource={this.state.data}
            scroll={{ y: 200 }}
          />
        </div>
      </div>
    );
  }
}

export default Ordertable;
