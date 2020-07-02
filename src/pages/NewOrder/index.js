import React, { Component } from "react";
import moment from "moment";
import {
  Form,
  Input,
  Select,
  Row,
  Button,
  DatePicker,
  Modal,
  message,
} from "antd";
import selectdata from "../../commons/selectdata";
import axios from "../../commons/ajax";
import { getAllSubject, getAllCourse, getUserByVal } from "../pagecommjs";
import "./index.css";

const { Option } = Select;
const defalut = {
  sub1: "",
  sub2: "",
  courseid: "",
  summary: "",
  education: "",
  paydt: moment(),
  region: "",
  paytype: "",
  payment: "",
};
class NewOrder extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      subject: [],
      visible: false,
      course: [],
      sub1: "",
      sub2: "",
      courseid: "",
      sub: [],
    };
  }
  userOnBlur = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    if (value !== "" && value !== undefined) {
      this.getUserByVal(value, name);
    }
  };
  async getUserByVal(val, t) {
    let user = await getUserByVal(val);
    if (user !== null && user !== undefined) {
      this.formRef.current.setFieldsValue({ [t]: user });
    }
  }
  componentWillMount() {
    this.init();
  }
  async init() {
    let rs = await getAllSubject();
    if (rs === null || rs === undefined) {
      rs = [];
    }
    let course = await getAllCourse();
    if (course === null || course === undefined) {
      course = [];
    }
    this.setState({ subject: rs, course: course });
  }
  paydtOk = (e) => {
    console.log(e);
  };
  handleSubChange = (t, e) => {
    if (t === "sub1") {
      this.formRef.current.setFieldsValue({ courseid: "", sub2: "" });
    } else {
      this.formRef.current.setFieldsValue({ courseid: "" });
    }

    this.setState({ [t]: e });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  onInputChange = (e) => {};
  doSave = () => {
    this.formRef.current
      .validateFields()
      .then((values) => {
        var obj = values;
        obj.subjectid = values.sub2;
        obj.paydt = values.paydt.format("YYYY-MM-DD HH:mm:ss");
        obj.userid = values.userid.split("-")[0];
        obj.hteacher = values.hteacher.split("-")[0];
        obj.userpid = values.userpid.split("-")[0];
        axios({
          url: "/api/order/save",
          method: "post",
          data: JSON.stringify(obj),
        })
          .then((res) => {
            if (res && res.status) {
              console.log(res);
              if (res.status === 200) {
                if (res.data.code === 0) {
                  message.info("保存成功", "2");
                  this.formRef.current.setFieldsValue(defalut);
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
      })
      .catch((errorInfo) => {
        console.log("err value", errorInfo);
      });
    this.setState({ visible: false });
  };
  onOKClick = (e) => {
    this.formRef.current
      .validateFields()
      .then((values) => {
        this.setState({ visible: true });
      })
      .catch((errorInfo) => {
        console.log("err value", errorInfo);
      });
  };
  onCancelClick = (e) => {};
  render() {
    var sub = [];
    const s = Array.from(this.state.subject).find(
      (item) => item.subjectid === this.state.sub1
    );
    console.log(s, this.state);
    if (s && s.sub) {
      sub = s.sub;
    }

    const style = {
      height: document.documentElement.clientHeight - 140 + "px",
    };
    return (
      <div className="title_form">
        <div className="edit_title">
          <div className="edit_title_value">创建订单</div>
        </div>
        <div className="order_content" style={style}>
          <div>
            <Form ref={this.formRef} initialValues={defalut}>
              <Row>
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
                        message: "请输入客户姓名!",
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
                  <Form.Item
                    name="sub1"
                    label="科目大类"
                    rules={[{ required: true, message: "请输入必填项" }]}
                  >
                    <Select
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this, "sub1")}
                    >
                      <Option value="">请选择</Option>
                      {Array.from(this.state.subject).map((item, idx) => (
                        <Option key={item.subjectid} value={item.subjectid}>
                          {item.subjectname}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="sub2"
                    label="科目小类"
                    rules={[{ required: false, message: "请输入必填项" }]}
                  >
                    <Select
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this, "sub2")}
                    >
                      <Option value="">请选择</Option>
                      {Array.from(sub).map((item, idx) => (
                        <Option key={item.subjectid} value={item.subjectid}>
                          {item.subjectname}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="courseid"
                    label="课程名称"
                    rules={[{ required: false, message: "请输入必填项" }]}
                  >
                    <Select style={{ width: 120 }}>
                      <Option value="">请选择</Option>
                      {Array.from(this.state.course).map((item, idx) =>
                        item.subjectid === this.state.sub2 ? (
                          <Option key={item.courseid} value={item.courseid}>
                            {item.title}
                          </Option>
                        ) : (
                          ""
                        )
                      )}
                    </Select>
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="summary"
                    label="摘要信息"
                    rules={[{ required: true, message: "请选择摘要信息" }]}
                  >
                    <Select
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this, "summary")}
                    >
                      <Option value="">请选择</Option>
                      {Array.from(selectdata.cour_summary).map((item, idx) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="course_edit_base_input">
                  <Form.Item
                    name="education"
                    label="学历信息"
                    rules={[{ required: true, message: "请选择客户学历" }]}
                  >
                    <Select
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this, "education")}
                    >
                      <Option value="">请选择</Option>
                      {Array.from(selectdata.edu).map((item, idx) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="region"
                    label="客户地区"
                    rules={[{ required: true, message: "请选择客户所在地" }]}
                  >
                    <Select
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this, "summary")}
                    >
                      <Option value="">请选择</Option>
                      {Array.from(selectdata.pprovinces).map((item, idx) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="course_edit_base_input">
                  <Form.Item
                    name="paytype"
                    label="付款类别"
                    rules={[{ required: true, message: "请选择付款类别" }]}
                  >
                    <Select
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this, "paytype")}
                    >
                      <Option value="">请选择</Option>
                      {Array.from(selectdata.pay_type).map((item, idx) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="payment"
                    label="付款方式"
                    rules={[{ required: true, message: "请选择付款方式" }]}
                  >
                    <Select
                      style={{ width: 120 }}
                      onChange={this.handleSubChange.bind(this, "payment")}
                    >
                      <Option value="">请选择</Option>
                      {Array.from(selectdata.pay_method).map((item, idx) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="paydt"
                    label="付款时间"
                    rules={[
                      {
                        required: true,
                        message: "请选择付款时间!",
                      },
                    ]}
                  >
                    <DatePicker
                      showTime
                      name="paydt"
                      onOk={this.paydtOk.bind(this)}
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="paycnt"
                    label="付款金额"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: "请输入正确金额!",
                      },
                    ]}
                  >
                    <Input
                      name="paycnt"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="userid"
                    label="招生老师"
                    rules={[
                      {
                        required: true,
                        message: "请输入必输项!",
                      },
                    ]}
                  >
                    <Input
                      name="userid"
                      onBlur={this.userOnBlur.bind(this)}
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="userpid"
                    label="招生组长"
                    rules={[
                      {
                        required: true,
                        message: "请输入必输项!",
                      },
                    ]}
                  >
                    <Input
                      name="userpid"
                      onBlur={this.userOnBlur.bind(this)}
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div className="course_edit_base_input">
                  <Form.Item
                    name="hteacher"
                    label="招生班主任"
                    rules={[
                      {
                        required: true,
                        message: "请输入必输项!",
                      },
                    ]}
                  >
                    <Input
                      name="hteacher"
                      onBlur={this.userOnBlur.bind(this)}
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div
                  className="course_edit_base_input"
                  style={{ width: "98%" }}
                >
                  <Form.Item
                    name="addr"
                    label="客户地址"
                    rules={[
                      {
                        required: true,
                        message: "请输入必输项!",
                      },
                    ]}
                  >
                    <Input
                      name="addr"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
                <div
                  className="course_edit_base_input"
                  style={{ width: "98%" }}
                >
                  <Form.Item
                    name="remark"
                    label="备注信息"
                    rules={[
                      {
                        required: true,
                        message: "请输入必输项!",
                      },
                    ]}
                  >
                    <Input
                      name="remark"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Item>
                </div>
              </Row>
              <Row
                style={{
                  "text-align": "center",
                  display: "block",
                  margin: "20px",
                }}
              >
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
            <Modal
              title="确认保存"
              visible={this.state.visible}
              onOk={this.doSave.bind(this)}
              onCancel={this.handleCancel.bind(this)}
            >
              <p>订单创建成功将无法修改，是否保存？</p>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default NewOrder;
