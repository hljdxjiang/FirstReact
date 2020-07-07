import React from "react";
import { connect } from "react-redux";
import { Radio, Tooltip, Card, Popconfirm, message } from "antd";
import { getAllSubject, getAllCourse } from "../pagecommjs";
import "./index.css";
import {
  PlusOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import selectdt from "../../commons/selectdata";
import { hasPermission } from "../../commons/";
import axios from "../../commons/ajax";

const { Meta } = Card;
const mapStateToProps = (state, ownstate) => {
  return {};
};
const mapDispatchToProps = (dispatch, state) => {
  return {
    //login: (val) => dispatch({ type: "Login", value: val }),
  };
};
class CourseManager extends React.Component {
  componentWillMount() {
    this.init();
  }
  constructor(props) {
    super(props);
    this.state = {
      subject: [],
      sub: [],
      sub1: "",
      sub2: "",
      course: [],
      course_type: "",
    };
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
  onActionClick = (t, v, e) => {
    var url = "/index/CourseEdit";
    var obj = {};
    if (v === "" || v === undefined) {
    } else {
      url += "?courseid=" + v;
    }
    if (t === "add") {
      if (!hasPermission("add_course")) {
        message.warning("您没有创建课程的权限", 3);
        return;
      }
    } else {
      if (!hasPermission("edit_course")) {
        message.warning("您没有修改课程的权限", 3);
        return;
      }
    }
    if (t === "edit" || t === "add") {
      this.props.history.push(url);
    } else if (t === "disabled" || t === "enable") {
      obj.courseid = v;
      obj.cstatus = t === "disabled" ? "1" : "0";
      this.changeStatus(obj);
    } else if (t === "delete") {
      obj = {
        courseid: v,
      };
      this.deleteCourse(obj);
    }
  };

  changeStatus = (obj) => {
    axios({
      url: "/api/course/change",
      method: "post",
      data: JSON.stringify(obj),
    })
      .then((response) => {
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              message.info("修改成功");
              setTimeout(() => {
                this.init();
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
  deleteCourse = (obj) => {
    axios({
      url: "/api/course/delete",
      method: "post",
      data: JSON.stringify(obj),
    })
      .then((response) => {
        if (response && response.status) {
          if (response.status === 200) {
            if (response.data.code === 0) {
              message.info("课程删除成功");
              setTimeout(() => {
                this.init();
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
  getShowCourse = (citem) => {
    var b = false;
    if (this.state.sub2 !== "") {
      b = citem.subjectid === this.state.sub2;
    } else if (this.state.sub1 !== "") {
      var rs = this.state.sub.filter(
        (item) => item.subjectid === citem.subjectid
      );
      if (rs.length > 0) {
        b = true;
      }
    } else {
      b = true;
    }
    if (b && this.state.course_type !== "") {
      b = citem.ctype === this.state.course_type;
    }
    return b;
  };
  onCourseTypeChange = (e) => {
    this.setState({
      course_type: e.target.value,
    });
  };
  onSub1Change = (e) => {
    var val = e.target.value;
    this.setState({
      sub1: val,
      sub2: "",
      sub:
        val === ""
          ? []
          : this.state.subject.find((date) => date.subjectid === e.target.value)
              .sub,
    });
  };
  onSub2Change = (e) => {
    this.setState({
      sub2: e.target.value,
    });
  };
  render() {
    return (
      <div className="title_form">
        <div>
          <div className="sub_div">
            <label className="sub1_lable">学科大类</label>
            <Radio.Group size="small" onChange={this.onSub1Change.bind(this)}>
              <Radio.Button value="" className="sub1_redio">
                全部
              </Radio.Button>
              {Array.from(this.state.subject).map((item, key) => {
                return (
                  <Radio.Button value={item.subjectid} className="sub1_redio">
                    {item.subjectname}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
          <div className="sub_div">
            <label className="sub1_lable">学科小类</label>
            <Radio.Group size="small" onChange={this.onSub2Change.bind(this)}>
              <Radio.Button value="" className="sub1_redio">
                全部
              </Radio.Button>
              {Array.from(this.state.sub).map((item, key) => {
                return (
                  <Radio.Button value={item.subjectid} className="sub1_redio">
                    {item.subjectname}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
          <div className="sub_div">
            <label className="sub1_lable">授课方式</label>
            <Radio.Group
              size="small"
              onChange={this.onCourseTypeChange.bind(this)}
            >
              <Radio.Button value="" className="sub1_redio">
                全部
              </Radio.Button>
              {Array.from(selectdt.course_type).map((item, key) => {
                return (
                  <Radio.Button value={item.id} className="sub1_redio">
                    {item.name}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
        </div>
        <div className="course_main">
          <div className="site-card-border-less-wrapper">
            <div className="card_add_div">
              <Tooltip color={"gold"} title="添加课程">
                <Card
                  bordered={false}
                  hoverable={true}
                  style={{
                    width: "100%",
                    height: 360,
                    "background-color": "azure",
                  }}
                  onClick={this.onActionClick.bind(this, "add", "")}
                >
                  <div className="add_card">
                    <PlusOutlined />
                  </div>
                </Card>
              </Tooltip>
            </div>
            {Array.from(this.state.course).map((item, key) => {
              if (this.getShowCourse(item)) {
                item.buycnt = item.buycnt
                  ? item.buycnt
                  : 100 + Math.ceil(Math.random() * 10000);
                const actionArray = (React.ReactNode =
                  item.cstatus === "0"
                    ? [
                        <Popconfirm
                          placement="bottomRight"
                          title={"课程下架后相关课程将不可创建订单，请确认"}
                          onConfirm={this.onActionClick.bind(
                            this,
                            "disabled",
                            item.courseid
                          )}
                          okText="下架"
                          cancelText="取消"
                        >
                          <Tooltip
                            color={"gold"}
                            title="下架课程"
                            style={{ "font-size": "16px" }}
                          >
                            <StopOutlined
                              key="disable"
                              className="title-icon-ok"
                            />
                          </Tooltip>
                          ,
                        </Popconfirm>,

                        <Tooltip
                          color={"gold"}
                          title="编辑课程"
                          onClick={this.onActionClick.bind(
                            this,
                            "edit",
                            item.courseid
                          )}
                        >
                          <EditOutlined key="edit" className="title-icon-add" />
                        </Tooltip>,
                        <Popconfirm
                          placement="bottomRight"
                          title={
                            "课程删除后将不可恢复,且相关数据不可查询,请三思"
                          }
                          onConfirm={this.onActionClick.bind(
                            this,
                            "delete",
                            item.courseid
                          )}
                          okText="删除"
                          cancelText="取消"
                        >
                          <Tooltip color={"gold"} title="删除课程">
                            <DeleteOutlined
                              key="delete"
                              className="title-icon-add"
                            />
                          </Tooltip>
                        </Popconfirm>,
                      ]
                    : [
                        <Tooltip
                          color={"gold"}
                          title="上架课程"
                          onClick={this.onActionClick.bind(
                            this,
                            "enable",
                            item.courseid
                          )}
                        >
                          <CheckCircleOutlined
                            key="enable"
                            className="title-icon-stop"
                          />
                        </Tooltip>,
                      ]);
                return (
                  <div className="course_card_div">
                    <Card
                      style={
                        item.valid
                          ? {
                              width: "100%",
                              height: 360,
                              "background-color": "azure",
                            }
                          : { width: "100%", height: 360, background: "#ddd" }
                      }
                      cover={
                        <img
                          alt="example"
                          style={{ height: 200 }}
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={actionArray}
                    >
                      <Meta title={item.title} description={item.cdesc} />
                      <div className="card_cours_price">
                        <div className="card_course_new_price">￥</div>
                        <div className="card_course_new_price">
                          {item.newprice}
                        </div>
                        <div className="card_course_org_price">
                          {item.orgprice}
                        </div>
                        <div className="card_sell_count">
                          累计销售数量{item.buycnt}套
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseManager);
