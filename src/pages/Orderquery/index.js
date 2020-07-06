import React from "react";
import { connect } from "react-redux";
import {
  Form,
  Row,
  Col,
  DatePicker,
  Input,
  Select,
  Button,
  message,
  Radio,
} from "antd";
import moment from "moment";
import { telMask, exportExcel, hasPermission } from "../../commons";
import { getAllSubject, getAllCourse, getUserByVal } from "../pagecommjs";
import { transPayType, transPayMent } from "../../commons/transdata";
import {
  UserOutlined,
  MobileOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import "./index.css";
import DataTable from "./DataTable";
import axios from "../../commons/ajax";

const columns = Array.from([
  {
    title: "手机号",
    dataIndex: "mobile",
    render: (mobile) =>
      hasPermission("order_showmobile") ? mobile : telMask(mobile),
  },
  {
    title: "客户姓名",
    dataIndex: "uname",
  },
  {
    title: "出单坐席",
    dataIndex: "userid",
  },
  {
    title: "课程大类",
    dataIndex: "sub1",
  },
  {
    title: "课程类别",
    dataIndex: "subjectid",
  },
  {
    title: "出单课程",
    dataIndex: "courseid",
  },
  {
    title: "出单时间",
    dataIndex: "crdt",
  },
  {
    title: "缴费时间",
    dataIndex: "paydt",
  },
  {
    title: "交易金额",
    dataIndex: "paycnt",
  },
  {
    title: "支付类型",
    dataIndex: "paytype",
    render(payment) {
      return transPayType(payment);
    },
  },
  {
    title: "支付方式",
    dataIndex: "payment",
    render(payment) {
      return transPayMent(payment);
    },
  },
]);
const { Option } = Select;

const mapStateToProps = (state, ownstate) => {
  return {
    span: state.system.span,
  };
};
const mapDispatchToProps = (dispatch, state) => {
  return {};
};

class OrderQuery extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      subject: [],
      sub1: "",
      sub2: "",
      course: [],
      data: [],
      showexp: false,
    };
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

  getsubject = (v) => {
    var sub = Array.from(this.state.subject).find((item) =>
      item.sub
        ? Array.from(item.sub).find((sitem) => sitem.subjectid === v)
        : null
    );
    return v;
  };

  userOnBlur = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;
    if (value !== "" && value !== undefined) {
      this.setUserID(value, name);
    }
  };
  async setUserID(val, t) {
    let user = await getUserByVal(val);
    if (user !== null && user !== undefined) {
      this.formRef.current.setFieldsValue({ [t]: user });
    } else {
      this.formRef.current.setFieldsValue({ [t]: "" });
    }
  }

  onSbu1Change(e) {
    this.formRef.current.setFieldsValue({
      sub2: "",
      courseid: "",
    });
    this.setState({
      sub1: e,
      sub2: "",
    });
  }

  onSbu2Change(e) {
    this.formRef.current.setFieldsValue({
      courseid: "",
    });
    //先获取子课程
    this.setState({
      sub2: e,
    });
  }
  export = () => {
    exportExcel(
      columns,
      this.state.data,
      "订单导出-" + moment().format("YYYYMMDDHH24MISS") + ".xlsx"
    );
  };

  onSearch = () => {
    this.formRef.current
      .validateFields()
      .then((values) => {
        if (values.enddt.isBefore(values.bgdt.format("YYYY-MM-DD"))) {
          alert("开始时间早于结束时间,不允许查询");
          return;
        }
        var obj = values;
        obj.bgdt = values.bgdt.format("YYYY-MM-DD");
        obj.enddt = values.enddt.format("YYYY-MM-DD");
        obj.userid = values.userid ? values.userid.split("-")[0] : "";
        axios({
          url: "/api/order/query",
          method: "post",
          data: JSON.stringify(obj),
        })
          .then((res) => {
            if (res && res.status) {
              if (res.status === 200) {
                if (res.data.code === 0) {
                  if (res.data.result && res.data.result.length > 0) {
                    this.setState({ data: res.data.result, showexp: true });
                  } else {
                    message.info("没有符合条件的数据");
                    this.setState({ data: res.data.result, showexp: false });
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
      })
      .catch((err) => {});
  };
  reset = () => {
    this.formRef.current.resetFields();
    this.setState({ data: [], showexp: false });
  };
  render() {
    var sub = [];
    if (this.state.sub1 !== "") {
      var s = this.state.subject.find(
        (item) => item.subjectid === this.state.sub1
      );
      if (s && s.sub) {
        sub = s.sub;
      }
    }
    return (
      <div className="title_form">
        <Form
          ref={this.formRef}
          name="advanced_search"
          className="ant-advanced-search-form"
          initialValues={{
            bgdt: moment(new Date()).add(-3, "days"),
            enddt: moment(),
            sub1: "",
            subjectid: "",
            courseid: "",
            scope: "1",
          }}
        >
          <Row style={{ margin: "5px" }}>
            <div className="course_edit_base_input">
              <Form.Item
                name="bgdt"
                label="开始时间"
                rules={[{ required: true, message: "请输入开始时间" }]}
              >
                <DatePicker format="YYYY-MM-DD" allowClear={false} />
              </Form.Item>
            </div>

            <div className="course_edit_base_input">
              <Form.Item
                name="enddt"
                label="结束时间"
                rules={[{ required: true, message: "请输入结束时间" }]}
              >
                <DatePicker format="YYYY-MM-DD" allowClear="false" />
              </Form.Item>
            </div>

            <div className="course_edit_base_input">
              <Form.Item
                name="userid"
                label="出单坐席"
                rules={[{ required: false }]}
              >
                <Input
                  prefix={<UserOutlined style={{ fontSize: 13 }} />}
                  placeholder="出单坐席"
                  name="userid"
                  onBlur={this.userOnBlur.bind(this)}
                />
              </Form.Item>
            </div>

            <div className="course_edit_base_input">
              <Form.Item
                name="uname"
                label="客户姓名"
                rules={[{ required: false }]}
              >
                <Input
                  prefix={<UsergroupAddOutlined style={{ fontSize: 13 }} />}
                  placeholder="客户姓名"
                  name="uname"
                />
              </Form.Item>
            </div>

            <div className="course_edit_base_input">
              <Form.Item
                name="mobile"
                label="客户手机号"
                rules={[{ required: false }]}
              >
                <Input
                  name="mobile"
                  prefix={<MobileOutlined style={{ fontSize: 13 }} />}
                  placeholder="客户手机号"
                />
              </Form.Item>
            </div>

            <div className="course_edit_base_input">
              <Form.Item
                name="sub1"
                label="科目大类"
                rules={[{ required: false }]}
              >
                <Select
                  style={{ width: 120 }}
                  name="sub1"
                  onChange={this.onSbu1Change.bind(this)}
                >
                  return <Option value="">请选择</Option>;
                  {this.state.subject.map((item) => {
                    return (
                      <Option value={item.subjectid} key={item.subjectid}>
                        {item.subjectname}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="course_edit_base_input">
              <Form.Item
                name="subjectid"
                label="科目子类"
                rules={[{ required: false }]}
              >
                <Select
                  name="subjectid"
                  style={{ width: 120 }}
                  onChange={this.onSbu2Change.bind(this)}
                >
                  <Option value="">请选择</Option>;
                  {Array.from(sub).map((item) => {
                    return (
                      <Option value={item.subjectid} key={item.subjectid}>
                        {item.subjectname}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="course_edit_base_input">
              <Form.Item
                name="courseid"
                label="课程名称"
                rules={[{ required: false }]}
              >
                <Select key="courseid" style={{ width: 120 }}>
                  return <Option value="">请选择</Option>;
                  {Array.from(this.state.course).map((item) => {
                    return item.subjectid === this.state.sub2 ? (
                      <Option value={item.courseid} key={item.courseid}>
                        {item.title}
                      </Option>
                    ) : (
                      ""
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="course_edit_base_input">
              <Form.Item
                name="scope"
                label="查询范围"
                rules={[{ required: false }]}
              >
                <Radio.Group name="scope">
                  <Radio value="1">本人</Radio>
                  <Radio
                    value="2"
                    disabled={
                      !(
                        hasPermission("order_query_groups") ||
                        hasPermission("order_query_all")
                      )
                    }
                  >
                    本组
                  </Radio>
                  <Radio value="3" disabled={!hasPermission("order_query_all")}>
                    全部
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </Row>
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "right",
                right: "50px",
              }}
            >
              <Button
                type="primary"
                style={{
                  margin: "0 8px",
                }}
                onClick={this.onSearch.bind(this)}
              >
                查询
              </Button>
              <Button
                type="primary"
                style={{
                  margin: "0 8px",
                }}
                onClick={this.reset.bind(this)}
              >
                清除
              </Button>
              {this.state.showexp && hasPermission("order_export") ? (
                <Button
                  type="primary"
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={this.export.bind(this)}
                >
                  导出
                </Button>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Form>
        <DataTable
          key={""}
          columns={columns}
          data={this.state.data}
        ></DataTable>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderQuery);
