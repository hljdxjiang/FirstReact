import React from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Layout } from "antd";
import MSider from "../side";
import "./index.css";
import MHeader from "../header";
import Routes from "../../router";
import { ISMOBILE, COLLAPSED } from "../../store/system";
const { Content, Footer } = Layout;

const mapStateToProps = (state, ownstate) => {
  return {
    ismobile: state.system.ismobile,
    collapsed: state.system.collapsed,
  };
};
const mapDispatchToProps = (dispatch, state) => {
  return {
    changeismobile: (val) => dispatch({ type: ISMOBILE }),
    changecollpased: (val) => dispatch({ type: COLLAPSED }),
  };
};
class DefaultLayOut extends React.Component {
  componentWillMount() {
    window.onresize = () => {
      this.props.changeismobile();
    };
  }
  componentDidMount() {
    this.props.changeismobile();
  }

  toggle = () => {
    this.props.changecollpased();
    //this.props.changeismobile();
  };

  render() {
    var ih = document.documentElement.clientHeight - 110 + "px";
    const style = {
      minHeight: ih,
      height: ih,
    };
    return (
      <Layout>
        {!this.props.ismobile && (
          <MSider trigger={null} collapsed={this.props.collapsed} />
        )}
        <Layout
          className="site-layout"
          style={{
            height: "100vh",
            flexDirection: "column",
            overflow: "none",
          }}
        >
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle
              }
            )}
          </Header> */}
          <MHeader
            collapsed={this.props.collapsed}
            click={this.toggle}
            ismobile={this.props.ismobile}
          ></MHeader>
          <Content className="content" style={style}>
            <Routes></Routes>
          </Content>
          <Footer className="footer">HLJDXJIANG ©2020 Created by JHC</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayOut);
