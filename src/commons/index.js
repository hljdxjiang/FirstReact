import XLSX from "xlsx";
import { store } from "../store";
import { getUserID, clearCookieAndSession } from "./localstore";
export const adminuser = "admin";

export function gologin() {
  clearCookieAndSession();
  window.location.href = "/login";
}
export function hasPermission(key) {
  if (getUserID() === adminuser) {
    return true;
  }
  var b = false;
  var s = store.getState();
  if (s && s.userinfo) {
    var roles = s.userinfo.roles;
    if (roles && roles.length > 0) {
      var arr = Array.from(JSON.parse(roles)).find(
        (item) => item.funcid === key && item.ftype === 1
      );
      if (arr) {
        b = true;
      }
    }
  }
  return b;
}
export function hasMenu(key) {
  if (getUserID() === adminuser) {
    return true;
  }
  var b = false;
  var s = store.getState();
  if (s && s.userinfo) {
    var roles = s.userinfo.roles;
    if (roles && roles.length > 0) {
      var arr = Array.from(JSON.parse(roles)).find(
        (item) => item.funcid === key && item.ftype === 0
      );
      if (arr) {
        b = true;
      }
    }
  }
  return b;
}

export function hasAnyMenus() {
  if (getUserID() === adminuser) {
    return true;
  }
  var b = false;
  var s = store.getState();
  if (s && s.userinfo) {
    var roles = s.userinfo.roles;
    if (roles && roles.length > 0) {
      var arr = Array.from(JSON.parse(roles)).find((item) => item.ftype === 0);
      if (arr) {
        b = true;
      }
    }
  }
  return b;
}

export function telMask(val) {
  var reg = /^(\d{3})\d{4}(\d{4})$/;
  return val.replace(reg, "$1****$2");
}

export function exportExcel(headers, data, fileName) {
  const _headers = headers
    .map((item, i) =>
      Object.assign(
        {},
        {
          key: item.dataIndex,
          title: item.title,
          position: String.fromCharCode(65 + i) + 1,
        }
      )
    )
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, {
          [next.position]: { key: next.key, v: next.title },
        }),
      {}
    );
  const _data = data
    .map((item, i) =>
      headers.map((key, j) =>
        Object.assign(
          {},
          {
            content: item[key.dataIndex],
            position: String.fromCharCode(65 + j) + (i + 2),
          }
        )
      )
    )
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next))
    // 转换成 worksheet 需要的结构
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, {
          [next.position]: { v: next.content },
        }),
      {}
    );

  // 合并 headers 和 data
  const output = Object.assign({}, _headers, _data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  // 构建 workbook 对象
  const wb = {
    SheetNames: ["mySheet"],
    Sheets: {
      mySheet: Object.assign({}, output, {
        "!ref": ref,
        "!cols": [
          { wpx: 45 },
          { wpx: 100 },
          { wpx: 200 },
          { wpx: 80 },
          { wpx: 150 },
          { wpx: 100 },
          { wpx: 300 },
          { wpx: 300 },
        ],
      }),
    },
  };

  // 导出 Excel
  XLSX.writeFile(wb, fileName);
}

export function ismobile(mobile) {
  var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (!reg.test(mobile)) {
    return false;
  }
  return true;
}
