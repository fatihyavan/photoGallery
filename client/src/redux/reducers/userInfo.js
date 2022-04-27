import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: "name",
  password: "password",
};

const user_info = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_INFO:
      return { ...state, name: action.name, password: action.password };
    default:
      return state;
  }
};

export default user_info;
