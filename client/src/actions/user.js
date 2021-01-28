import axios from "axios";
import {
  GET_USER,
  USER_ERROR
} from "./types";

export const getTrailerWashWos = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/api/trailer_wash_wo`);

  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR
    });
  }
}

export const checkForUser = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/api/userid/checkuser`);
    const user = res.data.userToSend
    
    const targetUrl = `${process.env.REACT_APP_URL}/api/userid/user/${user}`;
    
    const userInfoRes = await fetch(targetUrl);
    const data = await userInfoRes.json();
    
    const hours = [];
    
    for (let i = 0; i < data.hours.length; i++) {
      for (let y = 0; y < data.hours[i].length; y++) {
        hours.push(data.hours[i][y]);
      }
    }
    
    data.hours = hours;

    dispatch({
      type: GET_USER,
      payload: data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR
    });
  }
}

export const getUser = user => async dispatch => {
  try {
    const targetUrl = `${process.env.REACT_APP_URL}/api/userid/user/${user}`;
    
    const res = await fetch(targetUrl);
    const data = await res.json();

    const hours = [];

    for (let i = 0; i < data.hours.length; i++) {
      for (let y = 0; y < data.hours[i].length; y++) {
        hours.push(data.hours[i][y]);
      }
    }

    data.hours = hours;

    dispatch({
      type: GET_USER,
      payload: data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR
    });
  }
};