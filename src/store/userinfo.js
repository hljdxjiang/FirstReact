export const Login = "Login";
export const LogOut = "LogOut";
export const RefreshToken = "RefreshToken";
export const RefreshRTOken = "RefreshRTOken";

const defaultstate = {
  refToken: "",
  refreshTime: "",
  roleID: "",
  roles: [],
  token: "",
  userid: "",
};
const userinfo = (state = defaultstate, action) => {
  switch (action.type) {
    case "Login": {
      const val = action.value;
      return {
        refToken: val.refToken,
        refreshTime: val.refreshTime,
        roleID: val.roleID,
        token: val.token,
        roles: val.roles,
        userid: val.userid,
      };
    }
    case "RefreshToken": {
      const val = action.value;
      return {
        refToken: val.refToken,
        refreshTime: val.refreshTime,
        token: val.token,
      };
    }
    case "LogOff": {
      return {
        userid: "",
        username: "",
        token: "",
        rtoken: "",
        islogin: false,
      };
    }
    default:
      return state;
  }
};
export { userinfo };
