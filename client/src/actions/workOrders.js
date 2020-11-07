import axios from "axios";
import {
  GET_WORK_ORDERS_OF_LOCATION,
  UPDATE_WORK_ORDER,
  WORK_ORDER_ERROR
} from "./types";

export const getWorkOrdersOfLocation = id => async dispatch => {
  try {
    const res = await axios.get(`/api/workorders/${id}`);

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    let orders = res.data.workOrders;
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        orders[i].start = orders[i].start_time;
        orders[i].end = orders[i].end_time;
      }
    }
    
    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: orders
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};

export const getWorkOrders = terminals => async dispatch => {
  try {
    
    const locationIdsArr = [];
    
    for (let i = 0; i < terminals.length; i++) {
      locationIdsArr.push(terminals[i].location_id);
    }
    
    const locations = locationIdsArr.join();
    
    const res = await axios.get(`/api/workorders/user/${locations}`);

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    let orders = res.data.workOrders;
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        orders[i].start = orders[i].start_time;
        orders[i].end = orders[i].end_time;
      }
    }
    
    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: orders
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};

// export const updateWorkOrderStatus = (id, resource, start, end, washLocationId, terminals) => async dispatch => {
export const updateWorkOrderStatus = (id, resource, start, end, terminals) => async dispatch => {
  try {
    const locationIdsArr = [];
    
    for (let i = 0; i < terminals.length; i++) {
      locationIdsArr.push(terminals[i].location_id);
    }
    
    const locations = locationIdsArr.join();

    // const res = await axios.put(`/api/workorders/${id}`, {resource, start, end, washLocationId, locations});
    const res = await axios.put(`/api/workorders/${id}`, {resource, start, end, locations});

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    let orders = res.data.workOrders;
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        orders[i].start = orders[i].start_time;
        orders[i].end = orders[i].end_time;
      }
    }

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: orders
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};

// export const unscheduleWorkOrder = (id, washLocationId, terminals) => async dispatch => {
export const unscheduleWorkOrder = (id, terminals) => async dispatch => {
  try {
    const locationIdsArr = [];
    
    for (let i = 0; i < terminals.length; i++) {
      locationIdsArr.push(terminals[i].location_id);
    }
    
    const locations = locationIdsArr.join();

    const res = await axios.put(`/api/workorders/unschedule/${id}`, {locations});

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    let orders = res.data.workOrders;
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        orders[i].start = orders[i].start_time;
        orders[i].end = orders[i].end_time;
      }
    }

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: orders
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};