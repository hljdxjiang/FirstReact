import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Form,
  Input,
  Select,
  Row,
  Button,
  DatePicker,
  Radio,
  message,
} from "antd";

import DocumentTitle from "react-document-title";
import axios from "../../../commons/ajax";
import selectdata from "../../../commons/selectdata";
const { Option } = Select;

const mapStateToProps = (state, ownstate) => {
  var user = {};
  var suser = state.usermanager.user;
  if (user) {
    Object.keys(suser).map((key) => (user[key] = suser[key]));
  }
  return {
    userid: state.usermanager.selectuserid,
    user: user,
  };
};

// export const CHANGELIST = "CHANGELIST";
// export const CHANGEUSER = "CHANGEUSER";
const mapDispatchToProps = (dispatch, state) => {
  return {
    back_to_group: (val) => dispatch({ type: "CHANGELIST", value: val }),
  };
};

class userinfo extends React.Component {
  isNew = true;
  formRef = React.createRef();
  constructor(props) {
    super(props);
    var userinfo = this.props.user;
    userinfo.birthday = userinfo.birthday
      ? moment(userinfo.birthday, "YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    userinfo.hiredate = userinfo.hiredate
      ? moment(userinfo.hiredate, "YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    this.state = {
      inuserid: this.props.userid,
      groupid: this.props.groupid,
      userinfo: this.props.userinfo,
      roles: [],
    };
  }
  componentWillMount() {
    this.init();
    this.init_form();
    // var roledata = this.getallrole();
    // var userinfo = [];
    // if (this.state.inuserid != "" && this.state.inuserid != undefined) {
    //   userinfo = this.getuserinfo();
    // }
    // console.log("componentWillMount ", roledata, userinfo);
  }

  async init_form() {
    if (this.state.inuserid != "" && this.state.inuserid != undefined) {
      let user = await this.getuserinfo(this.state.inuserid);
      user.birthday = user.birthday
        ? moment(user.birthday, "YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
      user.hiredate = user.hiredate
        ? moment(user.hiredate, "YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
      var nuser = {
        userid: user.userid,
      };
      this.formRef.current.setFieldsValue(user);
    } else {
      // this.formRef.current.setFieldsValue({
      //   birthday: moment("1990-01-01", "YYYY-MM-DD"),
      //   hiredate: moment().format("YYYY-MM-DD"),
      // });
    }
  }

  async UserIDBlur(e) {
    console.log(e);
    e.preventDefault();
    const {
      target: { value },
    } = e;
    if (value === "" || value === undefined) {
      return;
    }
    let user = await this.getuserinfo(value);
    if (user != undefined || user != null) {
      message.warning("用户已存在，请核实用户编号");
      this.isNew = false;
    } else {
      this.isNew = true;
    }
  }
  async init() {
    let roles = await this.getallrole();
    await this.setState({ roles: roles });
  }
  getuserinfo(userid) {
    return axios({
      url: "/api/user/getuserinfo?userid=" + userid,
      method: "get",
    })
      .then((response) => {
        console.log("response", response);
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              var code = response.data.code;
              if (code == 0) {
                return response.data.result;
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
  }
  getallrole() {
    return axios
      .get("/api/role/getroles")
      .then(async (response) => {
        console.log("response", response);
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              var code = response.data.code;
              if (code == 0) {
                return response.data.result;
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
  }
  onDateOk = (t, e, v) => {
    console.log(v, t, e);
    this.formRef.current.setFieldsValue({ [t]: moment(v, "YYYY-MM-DD") });
  };
  onInputChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    this.formRef.current.setFieldsValue({ [name]: value });
  };
  onOKClick = (e) => {
    if (!this.isNew) {
      message.warn("工号已重复，请修改工号后保存");
      return;
    }
    this.formRef.current
      .validateFields()
      .then((values) => {
        console.log("Save Values is ", values);
        var obj = values;
        obj.groupid = this.state.groupid;
        obj.birthday = values.birthday.format("YYYY-MM-DD");
        obj.hiredate = values.hiredate.format("YYYY-MM-DD");
        console.log(obj);
        axios({
          url: "/api/user/save",
          method: "post",
          data: JSON.stringify(obj),
        })
          .then((response) => {
            console.log("response", response);
            if (response && response.status) {
              if (response.status === 200) {
                if (response.data.code === 0) {
                  message.info("保存成功");
                  this.onCancelClick();
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
        console.log(obj);
      })
      .catch((errorInfo) => {
        console.log("err value", errorInfo);
      });
  };
  onCancelClick = (e) => {
    var obj = {
      user: "",
      editable: true,
      groupid: "",
    };
    this.props.back_to_group(obj);
  };

  handleSubChange = (e, v) => {
    console.log(e, v);
  };

  render() {
    console.log("render ", this.state, this.state.userinfo);
    const style = {
      height: document.documentElement.clientHeight - 120 + "px",
    };
    return (
      <div className="title_form">
        <DocumentTitle
          title={
            this.state.inuserid === "" || this.state.inuserid === undefined
              ? "新增用户"
              : "用户详情"
          }
        />
        <div className="edit_title">
          <div className="edit_title_value">创建用户</div>
        </div>
        <div className="order_content" style={style}>
          <div>
            <Form
              ref={this.formRef}
              initialValues={{
                birthday: moment("1990-01-01", "YYYY-MM-DD"),
                hiredate: moment(),
              }}
            >
              <Row>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="userid"
                    label="员工工号"
                    rules={[
                      {
                        required: true,
                        message: "请输入员工工号",
                      },
                    ]}
                  >
                    <Input
                      name="userid"
                      onChange={this.onInputChange.bind(this)}
                      onBlur={this.UserIDBlur.bind(this)}
                      disabled={
                        this.state.inuserid != "" &&
                        this.state.inuserid != undefined
                      }
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="mobile"
                    label="手机号"
                    rules={[
                      {
                        required: true,
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                        message: "请输入正确的手机号",
                      },
                    ]}
                  >
                    <Input
                      name="mobile"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="uname"
                    label="姓名"
                    rules={[
                      {
                        required: true,
                        message: "请输入员工姓名!",
                      },
                    ]}
                  >
                    <Input
                      name="uname"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="submobile" label="小号号码">
                    <Input
                      name="submobile"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="hiredate" label="入职日期">
                    <DatePicker
                      name="hiredate"
                      format={"YYYY-MM-DD"}
                      onChange={this.onDateOk.bind(this, "hiredate")}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="birthday" label="出生日期">
                    <DatePicker
                      name="birthday"
                      format={"YYYY-MM-DD"}
                      onChange={this.onDateOk.bind(this, "birthday")}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="idtype" label="证件类型">
                    <Select
                      name="idtype"
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this)}
                    >
                      {Array.from(selectdata.id_type).map((item, idx) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="idno" label="证件号码">
                    <Input
                      name="idno"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="email" label="邮箱地址">
                    <Input
                      name="email"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="gender" label="性别">
                    <Select
                      name="gender"
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this)}
                    >
                      {Array.from(selectdata.gender_type).map((item, idx) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div
                  className="course_edit_base_input"
                  style={{ width: "90%" }}
                >
                  <Form.Item name="addr" label="家庭地址">
                    <Input
                      name="addr"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="emecontact" label="紧急联系人姓名">
                    <Input
                      name="emecontact"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item name="emephone" label="紧急联系人电话">
                    <Input
                      name="emephone"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
              </Row>
              <Row className="user_info_radio_group">
                <Form.Item
                  name="roleid"
                  label="选择角色"
                  rules={[
                    {
                      required: true,
                      message: "请选择角色",
                    },
                  ]}
                >
                  <Radio.Group>
                    {Array.from(this.state.roles).map((item) => (
                      <Radio value={item.roleid} key={item.roleid}>
                        {item.rolename}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Row>
              <Row className="input_table_row_style">
                <Button
                  type="primary"
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={this.onOKClick.bind(this)}
                >
                  保存
                </Button>
                <Button
                  type="primary"
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={this.onCancelClick.bind(this)}
                >
                  返回
                </Button>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(userinfo);
