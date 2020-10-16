import axios from "axios";
import {
  GET_ALL_LOCATIONS,
  GET_LOCATION_INFO,
  UPDATE_LOCATION_HOURS,
  UPDATE_BAY_QUANTITY,
  LOCATION_ERROR
} from "./types";

export const getAllLocations = () => async dispatch => {
  try {
    const res = await axios.get("/api/locations");

    dispatch({
      type: GET_ALL_LOCATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR
    });
  }
};

export const getLocationInfo = id => async dispatch => {
  try {
    const res = await axios.get(`/api/locations/${id}`);

    let locationInfo = res.data.location;

    locationInfo.bayOneHours = res.data.bayOneHours;
    locationInfo.bayTwoHours = res.data.bayTwoHours;

    dispatch({
      type: GET_LOCATION_INFO,
      payload: locationInfo
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR
    });
  }
};

export const updateLocationHrs = (id, formData) => async dispatch => {
  try {
    const res = await axios.put(`api/locations/hours/${id}`, formData);
    let locationInfo = res.data.location;

    locationInfo.bayOneHours = res.data.bayOneHours;
    locationInfo.bayTwoHours = res.data.bayTwoHours;

    dispatch({
      type: UPDATE_LOCATION_HOURS,
      payload: locationInfo
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR
    });
  }
};

export const updateWashBayQuantity = (id, formData) => async dispatch => {
  try {
    const res = await axios.put(`api/locations/washbays/${id}`, formData);
    let locationInfo = res.data.location;

    locationInfo.bayOneHours = res.data.bayOneHours;
    locationInfo.bayTwoHours = res.data.bayTwoHours;

    dispatch({
      type: UPDATE_BAY_QUANTITY,
      payload: locationInfo
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR
    });
  }
};