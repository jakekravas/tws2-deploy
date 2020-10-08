import axios from "axios";
import {
  GET_WORK_ORDERS_OF_LOCATION,
  UPDATE_WORK_ORDER,
  WORK_ORDER_ERROR
} from "./types";

export const getWorkOrdersOfLocation = id => async dispatch => {
  try {
    const res = await axios.get(`/api/workorders/${id}`);

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};

export const updateWorkOrderStatus = (id, bay, start, end, isScheduled, washLocationId) => async dispatch => {
  try {
    const res = await axios.put(`/api/workorders/${id}`, {bay, start, end, isScheduled, washLocationId});

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};

export const unscheduleWorkOrder = (id, isScheduled, washLocationId) => async dispatch => {
  try {
    const res = await axios.put(`/api/workorders/unschedule/${id}`, {isScheduled, washLocationId});

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};