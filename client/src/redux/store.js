import { createStore } from "redux";
import combine from "./reducers/rootReducers";

const store = createStore(combine);
export default store;
