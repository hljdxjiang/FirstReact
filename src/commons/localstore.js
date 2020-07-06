import axios from "./ajax";
import { store } from "../store";
export async function RefreshToken() {
  let rs = await getnewtoken();
  if (rs === undefined || rs === null) {
    clearCookieAndSession();
    window.location.href = "/login";
    return false;
  }
  setCookieAndSession("_token", rs.token);
  setCookieAndSession("_refresh_token", rs.refToken);
  setCookieAndSession("_refresh_time", rs.refreshTime);
  setCookieAndSession("_userid", rs.userid);
  return true;
}
async function getnewtoken() {
  return axios({ url: "/api/auth/refreshtokeb", method: "get" })
    .then(async (res) => {
      if (res && res.status && res.status === 200) {
        if (res.data.code === 0) {
          return res.data.result;
        } else {
          clearCookieAndSession();
          return null;
        }
      }
    })
    .catch((err) => {});
}

export async function isLogin() {
  let res = await getnewtoken();
  if (res === undefined || res === null) {
    clearCookieAndSession();
    window.location.href = "/login";
    return false;
  }
  return !!getToken();
}
export function getUserID() {
  return getCookieOrSession("_userid");
}

export function getToken() {
  return getCookieOrSession("_token");
}

function getRefreshToken() {
  return getCookieOrSession("_refresh_token");
}
export function setCookieAndSession(key, val) {
  setCookie(key, val);
  setSession(key, val);
}
export function clearCookieAndSession() {
  clearCookie();
  clearSession();
}

function clearCookie() {
  var cookies = document.cookie.split(";");
  var domain = "." + window.location.host;
  for (var i = 0; i < cookies.length; i++) {
    var varName = cookies[i].split("=");
    setCookie(varName[0], "", -1);
  }
}

function clearSession() {
  sessionStorage.clear();
}
function getCookieOrSession(name) {
  var ret = getCookie(name);
  if (ret === undefined || ret === "" || ret === null) {
    ret = getSession(name);
  }
  return ret;
}

function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

function getSession(name) {
  var ret = unescape(sessionStorage.getItem(name));
  return ret;
}

function setCookie(key, val, day) {
  var domain = "." + window.location.host;
  var Days = day === undefined || day === null ? 1 : day;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    key +
    "=" +
    escape(val) +
    ";expires=" +
    exp.toGMTString() +
    ";Domain=" +
    domain +
    "; path=/";
}

function setSession(key, val) {
  sessionStorage.setItem(key, unescape(val));
}
