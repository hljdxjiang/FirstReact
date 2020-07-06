import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { isLogin } from "../commons/localstore";
import AllComponents from "./components";
import DocumentTitle from "react-document-title";
import queryString from "query-string";
import allRouter from "./allRouter";

const mapStateToProps = (state, ownProps) => {
  // state 是 {userList: [{id: 0, name: '王二'}]}
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
class Routers extends React.Component {
  requireAuth = (auth, component) => {
    // const permissions = this.props.permissions;
    // if (!permissions || !permissions.includes(auth))
    //   return <Redirect to="/403" push />;
    return component;
  };
  requireLogin = (auth, component) => {
    return isLogin() ? (
      component
    ) : (
      //this.requireAuth(auth, component)
      <Redirect to={"/login"} />
    );
  };
  render() {
    return (
      <Switch>
        {Array.from(allRouter.routers).map((r) => {
          const route = (r) => {
            const Component = AllComponents[r.component];
            return (
              <Route
                key={r.route || r.key}
                exact
                path={r.route || r.key}
                render={(props) => {
                  const reg = /\?\S*/g;
                  // 匹配?及其以后字符串
                  const queryParams = window.location.search.match(reg);
                  // 去除?的参数
                  const { params } = props.match;
                  Object.keys(params).forEach((key) => {
                    params[key] = params[key] && params[key].replace(reg, "");
                  });
                  props.match.params = { ...params };
                  const merge = {
                    ...props,
                    query: queryParams ? queryString.parse(queryParams[0]) : {},
                  };
                  // 重新包装组件
                  const wrappedComponent = (
                    <DocumentTitle title={r.name}>
                      <Component {...merge} />
                    </DocumentTitle>
                  );
                  return isLogin() ? (
                    wrappedComponent
                  ) : (
                    <Redirect to={"/login"} />
                  );
                }}
              />
            );
          };
          return r.component ? route(r) : r.children.map((r) => route(r));
        })}

        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Routers);
