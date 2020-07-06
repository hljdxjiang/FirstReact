import React from "react";
import { Form, Input, Select, Row, Button, message } from "antd";
import { getAllSubject } from "../pagecommjs";
import selectdt from "../../commons/selectdata";
import axios from "../../commons/ajax";

const { Option } = Select;
const { TextArea } = Input;

class EditBase extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      courseid: this.props.id,
      subject: [],
      sub: [],
    };
  }
  getCourseInfo = (val) => {
    return axios
      .get("/api/course/getcourse?courseid=" + val)
      .then(async (response) => {
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              return response.data.result;
            } else {
              message.error(response.data.message);
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
  onCancel = () => {
    window.history.back(-1);
  };
  onOKClick = () => {
    this.formRef.current
      .validateFields()
      .then((values) => {
        if (Number(values.orgprice) < Number(values.newprice)) {
          message.warn("优惠价格比原价高,请修改后再次提交", 2);
          return;
        }
        var obj = values;
        obj.subjectid = values.sub2;
        obj.courseid = this.state.courseid;
        axios({
          url: "/api/course/save",
          method: "post",
          data: JSON.stringify(obj),
        })
          .then((response) => {
            if (response && response.status) {
              if (response.status === 200) {
                if (response.data.code === 0) {
                  message.info("保存成功");
                } else {
                  message.error(response.data.message);
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
    window.history.back(-1);
  };
  onInputChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    this.formRef.current.setFieldsValue({ [name]: value });
  };
  selectChange = (t, v) => {
    if (t === "sub1") {
      this.setState({
        sub1: v,
        sub2: "",
      });
    } else if (t === "sub2") {
      this.setState({ sub2: v });
    }
  };
  handleSubChange = (type, value) => {
    if (type === "sub1") {
      var sub2 = Array.from(this.state.subject).find(
        (dt) => dt.subjectid === value
      );
      if (sub2) {
        if (sub2.sub) {
          this.setState({ sub: sub2.sub });
        }
      }
    } else if (type === "sub2") {
      this.setState({
        sub2: value,
      });
    } else if (type === "cour") {
      this.setState({
        course_type: value,
      });
    }
  };

  async init() {
    var id = this.state.courseid;
    let rs = await getAllSubject();
    if (id === "" || id === undefined) {
      this.setState({
        subject: rs,
      });
    } else {
      let course = await this.getCourseInfo(id);
      var subject = Array.from(rs).find(
        (item) =>
          item.sub &&
          Array.from(item.sub).find(
            (sitem) => sitem.subjectid === course.subjectid
          )
      );
      this.setState({
        subject: rs,
        sub: subject.sub,
      });
      course.sub1 = subject.subjectid;
      course.sub2 = course.subjectid;
      this.formRef.current.setFieldsValue(course);
    }
  }

  componentWillMount() {
    this.init();
  }
  render() {
    return (
      <div>
        <Form ref={this.formRef}>
          <Row>
            <div className="course_edit_base_input">
              <Form.Item
                name="sub1"
                label="科目大类"
                rules={[{ required: true, message: "请输入必填项" }]}
              >
                <Select
                  style={{ width: 120 }}
                  name="sub1"
                  onChange={this.handleSubChange.bind(this, "sub1")}
                  disabled={!!this.state.id}
                >
                  <Option value="">请选择</Option>
                  {this.state.subject &&
                    Array.from(this.state.subject).map((item, idx) => (
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
                rules={[{ required: true, message: "请输入必填项" }]}
              >
                <Select
                  style={{ width: 120 }}
                  disabled={!!this.state.id}
                  name="sub2"
                  onChange={this.handleSubChange.bind(this, "sub2")}
                >
                  {Array.from(this.state.sub).map((item) => (
                    <Option key={item.subjectid} value={item.subjectid}>
                      {item.subjectname}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="course_edit_base_input">
              <Form.Item
                name="ctype"
                label="授课方式"
                rules={[{ required: true, message: "请输入必填项" }]}
              >
                <Select
                  name="ctype"
                  style={{ width: 120 }}
                  onChange={this.handleSubChange.bind(this, "cour")}
                >
                  {Array.from(selectdt.course_type).map((item, key) => {
                    return <Option value={item.id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="course_edit_base_input">
              <Form.Item
                name="title"
                label="课程名称"
                rules={[{ required: true, message: "请输入必填项" }]}
              >
                <Input name="title" onChange={this.onInputChange.bind(this)} />
              </Form.Item>
            </div>
            <div className="course_edit_base_input" style={{ width: "98%" }}>
              <Form.Item
                name="cdesc"
                style={{ height: "76px", "line-height": "76px" }}
                label="课程简介"
                rules={[{ required: true, message: "请输入必填项" }]}
              >
                <TextArea
                  name="cdesc"
                  onChange={this.onInputChange.bind(this)}
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 3, maxRows: 3 }}
                />
              </Form.Item>
            </div>
            <div className="course_edit_base_input">
              <Form.Item
                name="orgprice"
                label="课程售价"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g),
                    message: "请输入数字!",
                  },
                ]}
              >
                <Input
                  name="orgprice"
                  onChange={this.onInputChange.bind(this)}
                />
              </Form.Item>
            </div>
            <div className="course_edit_base_input">
              <Form.Item
                name="newprice"
                label="优惠售价"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g),
                    message: "请输入数字!",
                  },
                ]}
              >
                <Input
                  name="newprice"
                  value={this.state.new_price}
                  onChange={this.onInputChange.bind(this)}
                />
              </Form.Item>
            </div>
            <div className="course_edit_base_input">
              <Form.Item
                name="lcnt"
                label="课时量"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[1-9]\d*$/, "g"),
                    message: "请输入数字!",
                  },
                ]}
              >
                <Input
                  value={this.state.cour_cnt}
                  name="lcnt"
                  onChange={this.onInputChange.bind(this)}
                />
              </Form.Item>
            </div>
          </Row>
          <Row
            style={{ "text-align": "center", display: "block", margin: "20px" }}
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
              onClick={this.onCancel.bind(this)}
            >
              返回
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

export default EditBase;
