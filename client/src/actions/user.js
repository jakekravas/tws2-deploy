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
    // const res = await axios.get(`/api/userid/user/${user}`);
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `http://34.198.60.157:5069/api/userid/user/${user}`;
    
    const res = await fetch(proxyUrl + targetUrl);
    const data = await res.json();
    console.log(data);

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