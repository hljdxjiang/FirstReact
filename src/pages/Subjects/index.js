import React from "react";
import { Card, Switch, Modal, Input, message, Tooltip, Popconfirm } from "antd";
import { hasPermission } from "../../commons";
import axios from "../../commons/ajax";
import { getAllSubject } from "../pagecommjs";
import {
  EditOutlined,
  EllipsisOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  StopOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import "./index.css";

const { TextArea } = Input;

class Subjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sub1show: false,
      sub2show: false,
      selectedsub1: {},
      selectedsub2: {},
      subject: [],
    };
  }
  componentWillMount() {
    this.getAllSubject();
  }

  async getAllSubject() {
    let rs = await getAllSubject();
    this.setState({
      sub1show: false,
      sub2show: false,
      selectedsub1: {},
      selectedsub2: {},
      subject: rs,
    });
  }
  onStatusChange = (v, e) => {
    var obj = {};
    obj.subjectid = v;
    obj.substatus = e ? "0" : "1";
    obj.isswitch = true;
    this.changeSubject(obj);
  };

  savesubject = (v) => {
    axios({
      url: "/api/subject/save",
      method: "post",
      data: JSON.stringify(v),
    })
      .then((response) => {
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              setTimeout(() => {
                this.getAllSubject();
              });
            } else {
              message.warning("获取数据失败，请于管理员联系", 3);
            }
          } else {
            message.warning("数据初始化异常，请于管理员联系", 3);
          }
        } else {
          message.warning("服务器连接异常，请与管理员联系", 3);
        }
      })
      .catch((err) => {
        message.warning(err);
      });
  };
  sub1handleOk = (e) => {
    if (
      this.state.selectedsub1.subjectname === "" ||
      this.state.selectedsub1.subjectname === undefined
    ) {
      message.error("科目名称为必输项");
      return;
    }
    if (
      this.state.selectedsub1.subjectdesc === "" ||
      this.state.selectedsub1.subjectdesc === undefined
    ) {
      message.error("请输入科目简介");
      return;
    }
    var obj = this.state.selectedsub1;
    if (obj.subjectpid === undefined || obj.subjectpid === "") {
      obj.subjectpid = "root";
    }
    this.savesubject(obj);
  };
  sub1handleCancel = (e) => {
    this.setState({ sub1show: false, selectedsub1: {} });
  };
  sub1ModelChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    this.setState({
      selectedsub1: {
        ...this.state.selectedsub1,
        [name]: value,
      },
    });
  };

  sub2ModelChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    this.setState({
      selectedsub2: {
        ...this.state.selectedsub2,
        [name]: value,
      },
    });
  };
  onActionClick = (v, t, o) => {
    //v value
    //t type edit “编辑一级菜单” add "添加一个" delete删除 ok 启用 stop 停用
    //o  object
    if (t === "edit") {
      var list = this.state.subject;
      this.setState({
        sub1show: true,
        selectedsub1: list.find((date) => date.subjectid === v),
      });
    } else if (t === "add") {
      if (hasPermission("create_subject")) {
        this.setState({ sub1show: true });
      } else {
        message.warning("您没有权限创建科目");
      }
    } else if (t === "delete") {
      this.deletecontent(v, "sub1");
    } else {
      this.changeSub1(v, t);
    }
  };
  changeSub1 = (v, t) => {
    //stop ok sub1
    var obj = {};
    obj.subjectid = v;
    obj.substatus = t === "stop" ? "1" : "0";
    obj.isswitch = false;
    this.changeSubject(obj);
  };

  changeSubject = (obj) => {
    var subjectid = obj.subjectid;
    var substatus = obj.substatus;
    var isswitch = obj.isswitch;
    axios
      .get(
        "/api/subject/change?subjectid=" + subjectid + "&substatus=" + substatus
      )
      .then((response) => {
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              if (!isswitch) {
                setTimeout(() => {
                  var dat = this.state.subject;
                  dat.find(
                    (date) => date.subjectid === subjectid
                  ).substatus = substatus;
                  this.setState({
                    dat,
                  });
                });
              }
            } else {
              message.warning("获取数据失败，请于管理员联系", 3);
            }
          } else {
            message.warning("数据初始化异常，请于管理员联系", 3);
          }
        } else {
          message.warning("服务器连接异常，请与管理员联系", 3);
        }
      })
      .catch((err) => {});
  };
  onContentClick = (v, sv, t, o) => {
    //v 一级目录id value
    //t type add 添加二级 edit  delete
    // st 二级目录id
    //o  object
    if (t === "edit") {
      var dat = this.state.subject;
      this.setState({
        sub2show: true,
        selectedsub2: dat
          .find((date) => date.subjectid === v)
          .sub.find((date) => date.subjectid === sv),
      });
    } else if (t === "add") {
      this.setState({ sub2show: true, selectedsub2: { subjectpid: v } });
    } else {
      this.deletecontent(sv, "sub2");
    }
  };
  deletecontent = (v, t) => {
    var obj = {};
    obj.subjectid = v;
    axios({
      url: "/api/subject/deletesub",
      method: "post",
      data: JSON.stringify(obj),
    })
      .then((response) => {
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              setTimeout(() => {
                this.getAllSubject();
              });
            } else {
              message.warning("获取数据失败，请于管理员联系", 3);
            }
          } else {
            message.warning("数据初始化异常，请于管理员联系", 3);
          }
        } else {
          message.warning("服务器连接异常，请与管理员联系", 3);
        }
      })
      .catch((err) => {
        console.log("err  ", err);
        message.warning(err);
      });
  };
  sub2handleOk = (e) => {
    var obj = this.state.selectedsub2;
    if (obj.subjectpid === "" || obj.subjectpid === undefined) {
      message.warning("科目信息异常，请刷新页面后重试");
      return;
    }
    this.savesubject(obj);
  };
  sub2handleCancel = (e) => {
    this.setState({ sub2show: false, selectedsub2: {} });
  };
  render() {
    return (
      <div className="title_form">
        <div className="site-card-border-less-wrapper">
          <div className="card_add_div">
            <Tooltip color={"gold"} title="添加科目">
              <Card
                bordered={false}
                hoverable={true}
                style={{
                  width: "100%",
                  height: 333,
                  "background-color": "azure",
                }}
                onClick={this.onActionClick.bind(this, "", "add")}
              >
                <div className="add_card">
                  <PlusOutlined />
                </div>
              </Card>
            </Tooltip>
          </div>
          {this.state.subject &&
            Array.from(this.state.subject).map((item, i) => {
              const div = (React.ReactNode = (
                <div style={{ display: "grid" }}>
                  <div>
                    <h3 style={{ float: "left" }}>{item.subjectname}</h3>
                    {item.substatus === "0" ? (
                      <div style={{ float: "right" }}>
                        {hasPermission("delete_subject") ? (
                          <Tooltip color={"gold"} title="删除科目">
                            <Popconfirm
                              placement="topLeft"
                              title={
                                "科目删除后将不可恢复,所有与科目相关的数据将不可查询,请三思，确认是否删除"
                              }
                              okText="删除"
                              cancelText="取消"
                              onConfirm={this.onActionClick.bind(
                                this,
                                item.subjectid,
                                "delete"
                              )}
                            >
                              <a subjectid={item.subjectid}>
                                <DeleteOutlined className="title_icon" />
                              </a>
                            </Popconfirm>
                          </Tooltip>
                        ) : (
                          <div></div>
                        )}
                        {hasPermission("edit_subject") ? (
                          <Tooltip color={"gold"} title="编辑科目">
                            <a
                              subjectid={item.subjectid}
                              onClick={this.onActionClick.bind(
                                this,
                                item.subjectid,
                                "edit"
                              )}
                            >
                              <EditOutlined
                                className="title_icon"
                                subjectid={item.subjectid}
                              />
                            </a>
                          </Tooltip>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="title_desc">{item.subjectdesc}</div>
                </div>
              ));
              const noedit = (React.ReactNode = [
                <Tooltip color={"gold"} title="没有权限操作">
                  <CloseOutlined key="noedit" className="title-icon-disabled" />
                </Tooltip>,
              ]);
              const actionArray = (React.ReactNode =
                item.substatus === "0"
                  ? [
                      <Tooltip color={"gold"} title="停用科目">
                        <StopOutlined
                          key="disable"
                          className="title-icon-ok"
                          onClick={this.onActionClick.bind(
                            this,
                            item.subjectid,
                            "stop"
                          )}
                        />
                      </Tooltip>,
                      <Tooltip color={"gold"} title="添加二级科目">
                        <PlusCircleOutlined
                          key="add"
                          onClick={this.onContentClick.bind(
                            this,
                            item.subjectid,
                            "",
                            "add"
                          )}
                          className="title-icon-add"
                        />
                      </Tooltip>,
                    ]
                  : [
                      <Tooltip color={"gold"} title="启用科目">
                        <CheckCircleOutlined
                          key="enable"
                          onClick={this.onActionClick.bind(
                            this,
                            item.subjectid,
                            "ok"
                          )}
                          className="title-icon-stop"
                        />
                      </Tooltip>,
                    ]);
              return (
                <div className="card_div">
                  <Card
                    bordered={false}
                    hoverable={true}
                    style={
                      item.substatus === "0"
                        ? { width: "100%", "background-color": "azure" }
                        : { width: "100%", background: "#ddd" }
                    }
                    title={div}
                    actions={
                      hasPermission("edit_subject") ? actionArray : noedit
                    }
                  >
                    {item.sub &&
                      Array.from(item.sub).map((sitem, key) => {
                        return (
                          <div style={{ display: "flow-root" }} key={key}>
                            <p className="antd_card_body_content">
                              {sitem.subjectname}
                            </p>
                            {item.substatus === "0" ? (
                              <div style={{ float: "right" }}>
                                {hasPermission("delete_subject") ? (
                                  <Popconfirm
                                    placement="topLeft"
                                    title={
                                      "科目删除后将不可恢复,所有与科目相关的数据将不可查询,请三思，确认是否删除"
                                    }
                                    onConfirm={this.onContentClick.bind(
                                      this,
                                      item.subjectid,
                                      sitem.subjectid,
                                      "delete"
                                    )}
                                    okText="删除"
                                    cancelText="取消"
                                  >
                                    <a subjectid={sitem.subjectid}>
                                      <DeleteOutlined className="content_icon" />
                                    </a>
                                  </Popconfirm>
                                ) : (
                                  <div></div>
                                )}
                                {hasPermission("delete_subject") ? (
                                  <div style={{ float: "right" }}>
                                    <a
                                      subjectid={sitem.subjectid}
                                      onClick={this.onContentClick.bind(
                                        this,
                                        item.subjectid,
                                        sitem.subjectid,
                                        "edit"
                                      )}
                                    >
                                      <EditOutlined className="content_icon" />
                                    </a>
                                    <Switch
                                      subjectid={sitem.subjectid}
                                      defaultChecked={sitem.substatus === "0"}
                                      onChange={this.onStatusChange.bind(
                                        this,
                                        sitem.subjectid
                                      )}
                                      size="small"
                                      className="content_switch"
                                    ></Switch>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                  </Card>
                </div>
              );
            })}
        </div>
        <Modal
          title={this.state.selectedsub1.subjectid ? "编辑科目" : "添加科目"}
          visible={this.state.sub1show}
          onOk={this.sub1handleOk.bind(this)}
          onCancel={this.sub1handleCancel.bind(this)}
        >
          <div className="model_div">
            <label className="model_lable model_title_lable">科目名称：</label>
            <Input
              placeholder="输入科目名称"
              name="subjectname"
              onChange={this.sub1ModelChange.bind(this)}
              value={this.state.selectedsub1.subjectname}
            />
          </div>
          <div className="model_div">
            <label className="model_lable model_title_lable">科目描述：</label>
            <TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              maxLength={128}
              name="subjectdesc"
              onChange={this.sub1ModelChange.bind(this)}
              value={this.state.selectedsub1.subjectdesc}
            />
          </div>
        </Modal>
        <Modal
          title={
            this.state.selectedsub2.subjectid ? "编辑二级科目" : "添加二级科目"
          }
          visible={this.state.sub2show}
          onOk={this.sub2handleOk.bind(this)}
          onCancel={this.sub2handleCancel.bind(this)}
        >
          <div className="model_div">
            <label className="model_lable model_title_lable">科目名称：</label>
            <Input
              placeholder="输入科目名称"
              name="subjectname"
              onChange={this.sub2ModelChange.bind(this)}
              value={this.state.selectedsub2.subjectname}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Subjects;
