import { combineReducers } from "redux";
import location from "./location";
import washTypes from "./washTypes";
import workOrders from "./workOrders";
import user from "./user";

export default combineReducers({
  location,
  washTypes,
  workOrders,
  user
});