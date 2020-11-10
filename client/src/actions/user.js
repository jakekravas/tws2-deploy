import axios from "axios";
import {
  GET_USER,
  USER_ERROR
} from "./types";

export const getTrailerWashWos = () => async dispatch => {
  try {
    const res = await axios.get("/api/trailer_wash_wo");

    console.log(res.data);
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR
    });
  }
}

export const getUser = user => async dispatch => {
  try {
    console.log(user);
    const res = await axios.get(`/api/userid/user/${user}`);

    console.log(res.data);

    const hours = [];

    for (let i = 0; i < res.data.hours.length; i++) {
      for (let y = 0; y < res.data.hours[i].length; y++) {
        hours.push(res.data.hours[i][y]);
      }
    }

    res.data.hours = hours;

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR
    });
  }
};