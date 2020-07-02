import React from "react";
import { Redirect } from "react-router-dom";

import DefaultLayout from "../layout/defaultLayout";
import { isLogin } from "../commons/localstore";
import Error401 from "../pages/error/Error401";
export default class AuthRoute extends React.Component {
  render() {
    return isLogin() ? <DefaultLayout /> : <Error401 />;
  }
}
