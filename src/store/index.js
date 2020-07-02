import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { system } from "./system";
import { userinfo } from "./userinfo";
import { usermanager } from "./usermanager";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const config = {
  key: "root",
  storage: storage,
};
const redus = persistReducer(
  config,
  combineReducers({ system, usermanager, userinfo })
);
export const store = createStore(redus, applyMiddleware(thunk));
