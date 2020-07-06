import React from "react";
import { Tree, Layout, Table, Modal, Input, message } from "antd";
import MneuData from "../../../router/allMenus";
import AuthData from "../../../router/allAuth";
import axios from "../../../commons/ajax";
import "./index.css";

const { DirectoryTree } = Tree;

const { Sider, Content } = Layout;
class RoleManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      roleid: "",
      rolename: "",
      menuselected: [],
      authselected: [],
      modalshow: false,
    };
  }
  componentWillMount() {
    //从这里去获取信息
    this.getroles();
  }
  //新建或修改role基本信息
  processrole = (obj, url, msg) => {
    axios({
      url: url,
      method: "post",
      data: JSON.stringify(obj),
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            setTimeout(() => {
              this.getroles();
            });
            message.info(msg);
          }
        } else {
          message.warning("操作异常，请于管理员联系");
        }
      })
      .catch((err) => {
        message.warning(err);
      });
  };

  processgetdetail = (key) => {
    var obj = {};
    obj.roleid = key;
    axios({
      url: "/api/role/getauthbyid",
      method: "post",
      data: JSON.stringify(obj),
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            var obj = JSON.parse(response.data.result);
            this.setState({
              roleid: key,
              menuselected: obj.menus === undefined ? [] : obj.menus,
              authselected: obj.auths === undefined ? [] : obj.auths,
            });
          } else {
            message.error(response.data.message);
          }
        } else {
          message.warning("操作异常，请于管理员联系");
        }
      })
      .catch((err) => {
        message.warning(err);
      });
  };

  getroles = () => {
    axios({
      url: "/api/role/getroles",
      method: "get",
    })
      .then((response) => {
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              var code = response.data.code;
              if (code == 0) {
                this.setState({
                  date: response.data.result,
                  modalshow: false,
                  roleid: "",
                  rolename: "",
                  menuselected: [],
                  authselected: [],
                });
              } else {
                message.error(response.data.message);
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
      .catch((err) => {
        console.log("err  ", err);
        message.warning(err);
      });
  };
  onRoleCheck = (keys, event) => {
    this.setState({ authselected: keys });
  };
  onMenuCheck = (keys, event) => {
    this.setState({ menuselected: keys });
  };
  delRole = () => {
    var obj = {};
    obj.roleid = this.state.roleid;
    obj.rolename = "";
    this.processrole(obj, "/api/role/delrole", "删除成功");
  };
  onCancel = () => {
    this.setState({
      modalshow: false,
      roleid: "",
      rolename: "",
    });
  };
  onSave = () => {
    var obj = {};
    obj.roleid = this.state.roleid;
    obj.rolename = this.state.rolename;
    this.processrole(obj, "/api/role/saverole", "保存成功");
  };
  addRoleOrEdit = (val, e) => {
    if (!val) {
      this.setState({
        modalshow: true,
        roleid: "",
        rolename: "",
      });
    } else {
      this.setState({
        modalshow: true,
        roleid: val.roleid,
        rolename: val.rolename,
      });
    }
  };

  saveAuthDetail = () => {
    var obj = {};
    obj.roleid = this.state.roleid;
    obj.menus = this.state.menuselected;
    obj.auths = this.state.authselected;
    axios({
      url: "/api/role/saveauth",
      method: "post",
      data: JSON.stringify(obj),
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            message.success("保存成功", 3);
          } else {
            message.error(response.data.message);
          }
        } else {
          message.warning("操作异常，请于管理员联系");
        }
      })
      .catch((err) => {
        message.warning(err);
      });
  };
  onRoleNameChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const style = {
      height: document.documentElement.clientHeight - 120 + "px",
    };
    const style_part = {
      height: document.documentElement.clientHeight - 145 + "px",
    };
    const columns = [
      {
        title: "角色名称",
        dataIndex: "rolename",
      },
      {
        title: "操作",
        dataIndex: "",
        key: "x",
        render: (text, record) => (
          <div>
            <a onClick={this.addRoleOrEdit.bind(this, record)}>编辑</a>
          </div>
        ),
      },
    ];
    const rowSelection = {
      onChange: (keys, rows) => {
        //看来只能在这里获取权限列表了
        this.processgetdetail(keys[0]);
      },
    };

    return (
      <div className="title_form" style={{ background: "#FFF" }}>
        <Layout>
          <Sider className="user_side" style={style}>
            <div className="role_group_title">
              <div className="role_group_font">用户分组</div>
              <div className="role_group_font" style={{ float: "right" }}>
                <a
                  className="role_group_title_link"
                  onClick={this.addRoleOrEdit.bind(this, null)}
                >
                  添加
                </a>
                {this.state.roleid != "" ? (
                  <a
                    className="role_group_title_link"
                    onClick={this.delRole.bind(this)}
                  >
                    删除
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Table
              rowKey={(record) => record.roleid}
              columns={columns}
              pagination={false}
              rowSelection={{
                type: "radio",
                ...rowSelection,
              }}
              dataSource={this.state.date}
            />
          </Sider>
          <Content className="role_list" style={style}>
            <div className="role_main_content" style={style}>
              <div className="role_group_title">
                <div className="role_group_font">权限信息</div>
                <div className="role_group_font" style={{ float: "right" }}>
                  {this.state.roleid != "" ? (
                    <a
                      className="role_group_title_link"
                      onClick={this.saveAuthDetail.bind(this)}
                    >
                      保存
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="role_menus_div" style={style_part}>
                <div className="role_group_title">
                  <div className="role_group_font">菜单权限</div>
                </div>
                <div className="role_menu">
                  <DirectoryTree
                    checkable
                    defaultExpandAll
                    checkedKeys={this.state.menuselected}
                    onCheck={this.onMenuCheck.bind(this)}
                    treeData={MneuData.menus}
                  />
                </div>
              </div>
              <div className="role_menus_div" style={style_part}>
                <div className="role_group_title">
                  <div className="role_group_font">角色权限</div>
                </div>
                <div className="role_menu">
                  <DirectoryTree
                    checkable
                    defaultExpandAll
                    checkedKeys={this.state.authselected}
                    onCheck={this.onRoleCheck.bind(this)}
                    treeData={AuthData.authdata}
                  />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
        <Modal
          title={this.state.roleid ? "编辑角色" : "添加角色"}
          visible={this.state.modalshow}
          onOk={this.onSave.bind(this)}
          onCancel={this.onCancel.bind(this)}
        >
          <div className="model_div">
            <label className="model_lable model_title_lable">角色名称：</label>
            <Input
              placeholder="输入角色名称"
              name="rolename"
              onChange={this.onRoleNameChange.bind(this)}
              value={this.state.rolename}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default RoleManager;
