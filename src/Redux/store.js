// store.js
import { createStore } from "redux";
import taskReducer from "./reducer";

//Redux Store
const store = createStore(taskReducer);

export default store;