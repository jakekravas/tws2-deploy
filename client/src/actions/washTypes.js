import axios from "axios";
import {
  GET_ALL_WASH_TYPES,
  ADD_WASH_TYPE,
  UPDATE_WASH_TYPE,
  DELETE_WASH_TYPE,
  WASH_TYPE_ERROR
} from "./types";

export const getAllWashTypes = () => async dispatch => {
  try {
    const res = await axios.get("/api/washtypes");

    dispatch({
      type: GET_ALL_WASH_TYPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WASH_TYPE_ERROR
    });
  }
};

export const addWashType = formData => async dispatch => {
  try {
    const res = await axios.post("/api/washtypes", formData);

    dispatch({
      type: ADD_WASH_TYPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WASH_TYPE_ERROR
    });
  }
};

export const updateWashType = (id, formData) => async dispatch => {
  try {
    const res = await axios.put(`/api/washtypes/${id}`, formData);

    dispatch({
      type: UPDATE_WASH_TYPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WASH_TYPE_ERROR
    });
  }
};

export const deleteWashType = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/washtypes/${id}`);
    
    dispatch({
      type: DELETE_WASH_TYPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WASH_TYPE_ERROR
    });
  }
};