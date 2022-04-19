import * as actionTypes from "./actionTypes";

export const userInfo = (action) => {
  return {
    type: "USER_INFO",
    name: action.email,
    password: action.password,
  };
};
