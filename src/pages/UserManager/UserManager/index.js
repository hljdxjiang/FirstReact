import React from "react";
import { connect } from "react-redux";
import Userinfo from "./userinfo";
import Usermanager from "./usermanager";
import "./index.css";
const mapStateToProps = (state, ownstate) => {
  return {
    selecttype: state.usermanager.selecttype,
    selectuserid: state.usermanager.selectuserid,
    selectgroupid: state.usermanager.groupid,
  };
};
const mapDispatchToProps = (dispatch, state) => {
  return {};
};
class UserManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.selecttype === "group" ? (
      <Usermanager key="usermanager" />
    ) : (
      <Userinfo
        key="usermanager"
        userid={this.props.selectuserid}
        groupid={this.props.selectgroupid}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);
