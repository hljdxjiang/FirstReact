import React from "react";
class Messagelist extends React.Component {
  state = {
    data: [
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
      {
        title: "这是一条新消息",
        crdt: "2020-01-01",
        id: "adafad",
      },
    ],
  };
  componentDidMount() {}
  getData = () => {
    this.setState({ data: [] });
  };
  redirect = () => {
    window.location.href = "/index/MessageList";
  };
  render() {
    return (
      <div>
        <div className="table_title">
          <div className="table_title_info">消息列表</div>
          <div className="table_title_more" onClick={this.redirect.bind(this)}>
            <a>更多</a>
          </div>
        </div>
        <div
          style={{ background: "#FFF", height: "260px", overflow: "scroll" }}
        >
          {this.state.data.map((item, key) => {
            var url = "/index/Message?Messid=" + item.id;
            return (
              <a href={url}>
                <div className="table_info">
                  <div className="table_title_info">{item.title}</div>
                  <div className="table_title_more">{item.crdt}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Messagelist;
