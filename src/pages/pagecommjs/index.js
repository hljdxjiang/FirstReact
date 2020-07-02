import axios from "../../commons/ajax";
import { message } from "antd";

function findSub(id, obj) {
  var s = Array.from(obj).filter((item) => item.subjectpid === id);
  Array.from(s).map((item) => {
    var rs = findSub(item.subjectid, obj);
    if (rs.length > 0) {
      //item.isLeaf = true;
      item.sub = rs;
    }
  });
  return s;
}
export function getAllSubject() {
  return axios
    .get("/api/subject/getsubjects")
    .then(async (response) => {
      if (response && response.status) {
        console.log(response);
        if (response.status === 200) {
          if (response.data.code === 0) {
            console.log();
            var robj = response.data.result;
            var rs = findSub("root", robj);
            return rs;
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
      console.log(err);
    });
}

export function getAllCourse() {
  return axios
    .get("/api/course/getall")
    .then(async (response) => {
      if (response && response.status) {
        console.log(response);
        if (response.status === 200) {
          if (response.data.code === 0) {
            console.log();
            var rs = response.data.result;
            return rs;
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
      console.log(err);
    });
}

export function getUserByVal(val) {
  return axios
    .get("/api/user/getuserbyvalues?val=" + val)
    .then(async (res) => {
      if (res && res.status) {
        console.log(res);
        if (res.status === 200) {
          if (res.data.code === 0) {
            var robj = res.data.result;
            if (robj) {
              return robj.userid + "-" + robj.uname;
            } else {
              message.warning("坐席不存在,请确认", 3);
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
      console.log(err);
    });
}
