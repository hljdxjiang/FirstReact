export const CHANGELIST = "CHANGELIST";
export const CHANGEUSER = "CHANGEUSER";
const defaultState = {
  selecttype: "group",
  selectuserid: "",
  edittype: true,
  groupid: "",
};

const usermanager = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGELIST: {
      return {
        selecttype: "group",
        user: action.value.user,
        selectuserid: action.value.userid,
        edittype: action.value.edittype,
        groupid: action.value.groupid,
      };
    }
    case CHANGEUSER: {
      return {
        selecttype: "user",
        user: action.value.user,
        selectuserid: action.value.userid,
        edittype: action.value.edittype,
        groupid: action.value.groupid,
      };
    }
    default:
      return state;
  }
};
export { usermanager };
