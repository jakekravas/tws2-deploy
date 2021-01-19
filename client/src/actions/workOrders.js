import axios from "axios";
import {
  GET_WORK_ORDERS_OF_LOCATION,
  UPDATE_WORK_ORDER,
  WORK_ORDER_ERROR
} from "./types";

export const getWorkOrdersOfLocation = id => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/api/workorders/${id}`);

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
      locationIdsArr.push(`'${terminals[i].location_id}'`);
    }
    
    const locations = locationIdsArr.join();
    
    const res = await axios.get(`${process.env.REACT_APP_URL}/api/workorders/user/${locations}`);

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    let orders = res.data.workOrders;
    const ordersArr = [];
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        for (let y = 0; y < orders[i].length; y++) {
          // get minute duration of washes
          let it;
          let et;
          let is;
          let es;
            
          if (orders[i][y].int_wash_code !== null) {
            it = (orders[i][y].int_team_hours * 60) + orders[i][y].int_team_minutes;
            is = (orders[i][y].int_solo_hours * 60) + orders[i][y].int_solo_minutes;
          } else {
            it = 0;
            is = 0;
          }
  
          if (orders[i][y].ext_wash_code !== null) {
            et = (orders[i][y].ext_team_hours * 60) + orders[i][y].ext_team_minutes;
            es = (orders[i][y].ext_solo_hours * 60) + orders[i][y].ext_solo_minutes;
          } else {
            et = 0;
            es = 0;
          }        
  
          // // set wash durations to work order object
          orders[i][y].int_duration_mins_team = it;
          orders[i][y].ext_duration_mins_team = et;
          orders[i][y].int_duration_mins_solo = is;
          orders[i][y].ext_duration_mins_solo = es;
  
          orders[i][y].start = orders[i][y].start_time;
          orders[i][y].end = orders[i][y].end_time;
          orders[i][y].id = orders[i][y].order_id;

          let dt = orders[i][y].needed_date.split("T")[0];
          // formatting date so it's in MM-DD-YYYY format instead of YYYY-MM-DD
          let date = `${dt.split("-")[1]}-${dt.split("-")[2]}-${dt.split("-")[0]}`;
          let hour = parseInt(orders[i][y].needed_date.split("T")[1].split(":")[0]);
          let minute = orders[i][y].needed_date.split("T")[1].split(":")[1];
          let neededDateDisplayStr;

          if (hour > 12) {
            // neededDateDisplayStr = `${date} ${hour-12}:${minute} PM`;
            neededDateDisplayStr = `${dt.split("-")[1]}-${dt.split("-")[2]}-${dt.split("-")[0]} ${hour-12}:${minute} PM`;
          } else if (hour === 0) {
            // neededDateDisplayStr = `${date} 12:${minute} AM`;
            neededDateDisplayStr = `${dt.split("-")[1]}-${dt.split("-")[2]}-${dt.split("-")[0]} 12:${minute} AM`;
          } else if (hour === 12) {
            // neededDateDisplayStr = `${date} 12:${minute} PM`;
            neededDateDisplayStr = `${dt.split("-")[1]}-${dt.split("-")[2]}-${dt.split("-")[0]} 12:${minute} PM`;
          } else {
            // neededDateDisplayStr = `${date} ${hour}:${minute} AM`;
            neededDateDisplayStr = `${dt.split("-")[1]}-${dt.split("-")[2]}-${dt.split("-")[0]} ${hour}:${minute} AM`;
          }
  
          // orders[i][y].text =  `Needed by ${orders[i][y].needed_date}`;
          orders[i][y].unscheduled_text =  neededDateDisplayStr;
          // orders[i][y].text =  `Order ${orders[i][y].order_id} - Needed by ${neededDateDisplayStr}`;
          orders[i][y].text =  `Trailer ${orders[i][y].trailer_id.trim()}. Int wash type: ${orders[i][y].int_wash_code}`;
  
          ordersArr.push(orders[i][y]);
        }
      }
    }
    
    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      // payload: orders
      payload: ordersArr
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};

export const updateWorkOrderStatus = (id, resource, start, end, terminals) => async dispatch => {
  try {
    console.log(id);
    console.log(resource);
    console.log(start);
    console.log(end);
    console.log(terminals);

    const locationIdsArr = [];
    
    for (let i = 0; i < terminals.length; i++) {
      locationIdsArr.push(`'${terminals[i].location_id}'`);
    }
    
    const locations = locationIdsArr.join();

    console.log(locations);

    const res = await axios.put(`${process.env.REACT_APP_URL}/api/workorders/${id}`, {resource, start, end, locations});

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    let orders = res.data.workOrders;
    console.log(orders);
    const ordersArr = [];
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        for (let y = 0; y < orders[i].length; y++) {
          // get minute duration of washes
          let it;
          let et;
          let is;
          let es;
            
          if (orders[i][y].int_wash_code !== null) {
            it = (orders[i][y].int_team_hours * 60) + orders[i][y].int_team_minutes;
            is = (orders[i][y].int_solo_hours * 60) + orders[i][y].int_solo_minutes;
          } else {
            it = 0;
            is = 0;
          }
  
          if (orders[i][y].ext_wash_code !== null) {
            et = (orders[i][y].ext_team_hours * 60) + orders[i][y].ext_team_minutes;
            es = (orders[i][y].ext_solo_hours * 60) + orders[i][y].ext_solo_minutes;
          } else {
            et = 0;
            es = 0;
          }        
  
          // // set wash durations to work order object
          orders[i][y].int_duration_mins_team = it;
          orders[i][y].ext_duration_mins_team = et;
          orders[i][y].int_duration_mins_solo = is;
          orders[i][y].ext_duration_mins_solo = es;
  
          orders[i][y].start = orders[i][y].start_time;
          orders[i][y].end = orders[i][y].end_time;
          orders[i][y].id = orders[i][y].order_id;

          let date = orders[i][y].needed_date.split("T")[0];
          let hour = parseInt(orders[i][y].needed_date.split("T")[1].split(":")[0]);
          let minute = orders[i][y].needed_date.split("T")[1].split(":")[1];
          let neededDateDisplayStr;

          if (hour > 12) {
            neededDateDisplayStr = `${date} ${hour-12}:${minute} PM`;
          } else if (hour === 0) {
            neededDateDisplayStr = `${date} 12:${minute} AM`;
          } else if (hour === 12) {
            neededDateDisplayStr = `${date} 12:${minute} PM`;
          } else {
            neededDateDisplayStr = `${date} ${hour}:${minute} AM`;
          }
  
          orders[i][y].unscheduled_text =  neededDateDisplayStr;
          // orders[i][y].text =  `Order ${orders[i][y].order_id} - Needed by ${neededDateDisplayStr}`;
          orders[i][y].text =  `Trailer ${orders[i][y].trailer_id.trim()}. Int wash type: ${orders[i][y].int_wash_code}`;

          // let date = orders[i][y].split("T")[0];
          // let time = orders[i][y].split("T")[1].split(":");
          // console.log(date);
          // console.log(time[0]);
          // console.log(time[1]);
  
          // orders[i][y].text =  `Needed by ${orders[i][y].needed_date}`;
  
          ordersArr.push(orders[i][y]);
        }
      }
    }

    console.log(ordersArr);

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      // payload: orders
      payload: ordersArr
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
    id = id.trim();
    const locationIdsArr = [];
    
    for (let i = 0; i < terminals.length; i++) {
      locationIdsArr.push(`'${terminals[i].location_id}'`);
    }
    
    const locations = locationIdsArr.join();

    const res = await axios.put(`${process.env.REACT_APP_URL}/api/workorders/unschedule/${id}`, {locations});
    console.log(res.data);

    let orders = res.data.workOrders;
    const ordersArr = [];
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        for (let y = 0; y < orders[i].length; y++) {
          // get minute duration of washes
          let it;
          let et;
          let is;
          let es;
            
          if (orders[i][y].int_wash_code !== null) {
            it = (orders[i][y].int_team_hours * 60) + orders[i][y].int_team_minutes;
            is = (orders[i][y].int_solo_hours * 60) + orders[i][y].int_solo_minutes;
          } else {
            it = 0;
            is = 0;
          }
  
          if (orders[i][y].ext_wash_code !== null) {
            et = (orders[i][y].ext_team_hours * 60) + orders[i][y].ext_team_minutes;
            es = (orders[i][y].ext_solo_hours * 60) + orders[i][y].ext_solo_minutes;
          } else {
            et = 0;
            es = 0;
          }        
  
          // // set wash durations to work order object
          orders[i][y].int_duration_mins_team = it;
          orders[i][y].ext_duration_mins_team = et;
          orders[i][y].int_duration_mins_solo = is;
          orders[i][y].ext_duration_mins_solo = es;
  
          orders[i][y].start = orders[i][y].start_time;
          orders[i][y].end = orders[i][y].end_time;
          orders[i][y].id = orders[i][y].order_id;

          let date = orders[i][y].needed_date.split("T")[0];
          let hour = parseInt(orders[i][y].needed_date.split("T")[1].split(":")[0]);
          let minute = orders[i][y].needed_date.split("T")[1].split(":")[1];
          let neededDateDisplayStr;

          if (hour > 12) {
            neededDateDisplayStr = `${date} ${hour-12}:${minute} PM`;
          } else if (hour === 0) {
            neededDateDisplayStr = `${date} 12:${minute} AM`;
          } else if (hour === 12) {
            neededDateDisplayStr = `${date} 12:${minute} PM`;
          } else {
            neededDateDisplayStr = `${date} ${hour}:${minute} AM`;
          }
  
          orders[i][y].unscheduled_text =  neededDateDisplayStr;
          // orders[i][y].text =  `Order ${orders[i][y].order_id} - Needed by ${neededDateDisplayStr}`;
          orders[i][y].text =  `Trailer ${orders[i][y].trailer_id.trim()}. Int wash type: ${orders[i][y].int_wash_code}`;
  
          ordersArr.push(orders[i][y]);
        }
      }
    }

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      // payload: orders
      payload: ordersArr
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};