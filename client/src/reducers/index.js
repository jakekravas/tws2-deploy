import { combineReducers } from "redux";
import location from "./location";
import washTypes from "./washTypes";
import workOrders from "./workOrders";

export default combineReducers({
  location,
  washTypes,
  workOrders
});