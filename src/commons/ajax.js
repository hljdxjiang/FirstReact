import Axios from "axios";
import { getToken, isLogin, RefreshToken } from "./localstore";
import { base_url } from "../config";

const errorHandle = (status, other) => {
  switch (status) {
    case 403:
      // 清除token
      // localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      setTimeout(() => {}, 1000);
      break;
    case 404:
      break;
    default:
  }
};

const axios = Axios.create({
  timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "http://127.0.0.1",
    Authorization: "Bearer " + getToken(),
  },
});

axios.interceptors.request.use(
  (config) => {
    if (!!getToken()) {
      config.headers.Authorization = "Bearer " + getToken();
    }
    // 在发送请求之前做些什么(后期在这里加上token)
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    if (process.env.NODE_ENV === "development") {
      config.url = base_url + config.url;
    }

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  // 请求成功
  (res) => {
    if (res.status === 200) {
      if (res.data.code !== "0" && res.data.msg) {
      }
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  // 请求失败
  (err) => {
    const { response } = err;
    if (response) {
      if (response.status === 401) {
        if (!RefreshToken()) {
          return Promise.reject(err);
        }
        var config = err.config;
        config.retry = config.retry || 1;
        if (!config || !config.retry) {
          return Promise.reject(err);
        }

        config.__retryCount = config.__retryCount || 0;

        // 判断是否超过了重试次数
        if (config.__retryCount >= config.retry) {
          return Promise.reject(err);
        }

        //重试次数自增
        config.__retryCount += 1;

        //延时处理
        var backoff = new Promise(function (resolve) {
          setTimeout(function () {
            resolve();
          }, 1000);
        });

        //重新发起axios请求
        return backoff.then(function () {
          return Axios(config);
        });
      } else {
        // 非200且授权成功情况下：请求已发出
        errorHandle(response.status, response.data.msg);
        return Promise.reject(response);
      }
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
      Promise.reject(err);
    }
  }
);
export default axios;
