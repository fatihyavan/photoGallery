import user_info from "./userInfo";
import { combineReducers } from "redux";

const combine = combineReducers({ user: user_info });
export default combine;
