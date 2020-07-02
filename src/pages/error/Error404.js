import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Error404 extends React.Component {
  state = { stime: 9 };
  goindex = () => {
    window.location.href = "/";
  };
  componentDidMount() {
    this.si = setInterval(() => {
      const time = this.state.stime - 1;

      if (time === 0) this.goindex();
      this.setState({ stime: time });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.si);
  }
  render() {
    return (
      <div className="root error404">
        <div className="container">
          <div className="header">
            <h3>您访问的页面不存在！</h3>
          </div>
          <p className="intro">
            点击跳转至
            <Link to="/"> 首页 ( {this.state.stime} )</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Error404;
