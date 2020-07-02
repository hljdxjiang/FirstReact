import React from "react";
import { Tree, Layout, Table, Modal, Input, message, Popconfirm } from "antd";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import axios from "../../../commons/ajax";
import { transGender } from "../../../commons/transdata";

const { DirectoryTree } = Tree;

const { Sider, Content } = Layout;

const mapStateToProps = (state, ownstate) => {
  return {};
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    create_or_edit_user: (val) => dispatch({ type: "CHANGEUSER", value: val }),
  };
};
class usermanager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      groupname: "",
      grouppid: "root",
      modalshow: false,
      userid: this.props.selectuserid,
      treeData: {
        title: "根节点",
        key: "root",
        //isLeaf: true,
        children: [],
      },
      showform: "table",
      groupid: "root",
      groupname: "",
      selectNodeHaveSub: true,
    };
  }
  componentWillMount() {
    this.getAllGroup();
  }
  findSub = (id, obj) => {
    var s = Array.from(obj).filter((item) => item.grouppid === id);
    Array.from(s).map((item) => {
      var rs = this.findSub(item.key, obj);
      if (rs.length > 0) {
        //item.isLeaf = true;
        item.children = rs;
      }
    });
    return s;
  };
  getAllGroup = () => {
    console.log("begin getAllgroup ", this.state);
    axios({
      url: "/api/group/getgroups",
      method: "get",
    })
      .then((response) => {
        console.log("response", response);
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              var robj = response.data.result;
              var rs = this.findSub("root", robj);
              this.setState({
                modalshow: false,
                groupid: "root",
                grouppid: "root",
                groupname: "",
                treeData: {
                  ...this.state.treeData,
                  children: rs,
                },
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
      });
  };
  onCancel = () => {
    this.setState({
      modalshow: false,
      groupid: "root",
      grouppid: "root",
      groupname: "",
    });
  };
  onGroupNameChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    this.setState({
      [name]: value,
    });
  };
  onSave = () => {
    console.log(this.state);
    var obj = {};
    obj.key = this.state.groupid;
    obj.title = this.state.groupname;
    obj.grouppid = this.state.grouppid;
    axios({
      url: "/api/group/savegroup",
      method: "post",
      data: JSON.stringify(obj),
    })
      .then((response) => {
        console.log("response", response);
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              setTimeout(() => {
                this.getAllGroup();
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
      });
  };
  onNewGroup = () => {};
  onEditOrViewUser = (t) => {
    var obj = {
      user: t,
      userid: t.userid,
      editable: true,
      groupid: this.state.groupid,
    };
    this.props.create_or_edit_user(obj);
  };
  onDisabledUser = (userid, state) => {};
  onDeleteUser = (v, e) => {
    axios({
      url: "/api/user/deluserbyid?userid=" + v,
      method: "get",
    })
      .then((response) => {
        console.log("response", response);
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              message.info("删除成功");
              setTimeout(() => {
                this.setState({
                  date: this.state.date.filter((item) => item.userid != v),
                });
              });
            } else {
              message.warning("删除失败，请于管理员联系", 3);
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
      });
  };
  onSelect = (keys, event) => {
    var selectNodeHaveSub = false;
    var skey = event.node.key;
    if (this.state.treeData.children) {
      var sub = Array.from(this.state.treeData.children).find(
        (item) => item.key === skey
      );
      if (sub && sub.children && sub.children.length > 0) {
        selectNodeHaveSub = true;
      }
    }
    if ((skey != undefined) & (skey != "root") && skey != "") {
      axios({
        url: "/api/user/getuserbyid?groupid=" + skey,
        method: "get",
      })
        .then((response) => {
          console.log("response", response);
          if (response && response.status) {
            if (response.status === 200) {
              if (response.data.code === 0) {
                this.setState({
                  date: response.data.result,
                  groupid: skey,
                  grouppid:
                    skey === "root"
                      ? "root"
                      : event.node.grouppid === undefined
                      ? "root"
                      : event.node.grouppid,
                  groupname:
                    skey === "root" || event.node.title === undefined
                      ? ""
                      : event.node.title,
                  selectNodeHaveSub: selectNodeHaveSub,
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
        });
    }
  };

  onAddGroup = () => {
    this.setState({
      modalshow: true,
      groupid: "",
      groupname: "",
      grouppid: this.state.groupid,
    });
  };

  onEidtGroup = () => {
    this.setState({
      modalshow: true,
      groupid: this.state.groupid,
      groupname: this.state.groupname,
    });
  };
  onDelGroup = () => {
    var obj = {};
    obj.key = this.state.groupid;
    if (this.state.date.length > 0) {
      message.error("分组下有用户，暂不支持删除");
      return;
    }
    axios({
      url: "/api/group/delgroup",
      method: "post",
      data: JSON.stringify(obj),
    })
      .then((response) => {
        console.log("response", response);
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              message.info("删除成功");
              setTimeout(() => {
                this.getAllGroup();
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
      });
  };

  onExpand = () => {
    console.log("Trigger Expand");
  };
  render() {
    const style = {
      height: document.documentElement.clientHeight - 120 + "px",
    };
    const columns = [
      {
        title: "姓名",
        dataIndex: "uname",
      },
      {
        title: "工号",
        dataIndex: "userid",
      },
      {
        title: "性别",
        dataIndex: "gender",
        render(gender) {
          return transGender(gender);
        },
      },
      {
        title: "手机号",
        dataIndex: "mobile",
      },
      {
        title: "账户状态",
        dataIndex: "status",
        render(status) {
          return status === 0 ? "有效" : "锁定";
        },
      },
      {
        title: "角色名称",
        dataIndex: "skillid",
      },
      {
        title: "操作",
        dataIndex: "",
        key: "x",
        render: (text, record) => (
          <div>
            <a onClick={this.onEditOrViewUser.bind(this, record)}>编辑</a>{" "}
            <a
              onClick={this.onDisabledUser.bind(
                this,
                record.userid,
                record.lockflag
              )}
            >
              {record.status === "0" ? "禁用" : "启用"}
            </a>{" "}
            <Popconfirm
              placement="left"
              title={"确认是否删除用户：用户删除后将永不可恢复！"}
              onConfirm={this.onDeleteUser.bind(this, record.userid)}
              okText="Yes"
              cancelText="No"
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ];
    var td = [];
    td.push(this.state.treeData);
    return (
      <div className="title_form" style={{ background: "#FFF" }}>
        <DocumentTitle title="用户列表" />
        <Layout>
          <Sider className="user_side" style={style}>
            <div className="user_group_title">
              <div className="user_group_font">用户分组</div>
              <div className="user_group_font" style={{ float: "right" }}>
                <a
                  className="user_group_title_link"
                  onClick={this.onAddGroup.bind(this)}
                >
                  添加
                </a>
                {this.state.groupid != "root" &&
                !this.state.selectNodeHaveSub ? (
                  <Popconfirm
                    placement="right"
                    title="删除后将不可恢复，请确认是否删除"
                    onConfirm={this.onDelGroup.bind(this)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a className="user_group_title_link">删除</a>
                  </Popconfirm>
                ) : (
                  ""
                )}

                {this.state.groupid != "root" && this.state.groupid != "" ? (
                  <a
                    className="user_group_title_link"
                    onClick={this.onEidtGroup.bind(this)}
                  >
                    编辑
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Tree
              defaultExpandAll
              onSelect={this.onSelect.bind(this)}
              treeData={td}
            />
          </Sider>
          <Content className="user_list" style={style}>
            <div className="user_content" style={style}>
              <div>
                <div className="user_group_title">
                  <div className="user_group_font">用户列表</div>
                  <div className="user_group_font" style={{ float: "right" }}>
                    {this.state.groupid != "root" &&
                    this.state.groupid != "" ? (
                      <a
                        className="user_group_title_link"
                        onClick={this.onEditOrViewUser.bind(this, "")}
                      >
                        添加用户
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Table columns={columns} dataSource={this.state.date} />
              </div>
            </div>
          </Content>
        </Layout>
        <Modal
          title={this.state.roleid ? "编辑分组" : "添加分组"}
          visible={this.state.modalshow}
          onOk={this.onSave.bind(this)}
          onCancel={this.onCancel.bind(this)}
        >
          <div className="model_div">
            <label className="model_lable model_title_lable">角色名称：</label>
            <Input
              placeholder="输入小组名称"
              name="groupname"
              onChange={this.onGroupNameChange.bind(this)}
              value={this.state.groupname}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(usermanager);
