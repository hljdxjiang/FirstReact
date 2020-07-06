import React from "react";
import { clearCookieAndSession } from ".././../commons/localstore";
import { Link } from "react-router-dom";
import "./style.css";

class Error401 extends React.Component {
  state = { stime: 9 };
  gologin = () => {
    clearCookieAndSession();
    window.location.href = "/login";
  };
  componentDidMount() {
    this.si = setInterval(() => {
      const time = this.state.stime - 1;

      if (time === 0) this.gologin();
      this.setState({ stime: time });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.si);
  }
  render() {
    return (
      <div className="root error401">
        <div className="container">
          <div className="header">
            <h3>您尚未登录，请登录系统！</h3>
          </div>
          <p className="intro">
            点击跳转至
            <Link to="/login"> 登录界面 ( {this.state.stime} )</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Error401;
