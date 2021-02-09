import axios from "axios";
import {
  GET_WORK_ORDERS_OF_LOCATION,
  WORK_ORDER_ERROR
} from "./types";

let currentTime = new Date();

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

          if (orders[i][y].in_date !== null && orders[i][y].out_date !== null && orders[i][y].resource !== null) {
            orders[i][y].start = orders[i][y].in_date;
            orders[i][y].end = orders[i][y].out_date;
            orders[i][y].is_scheduled = true;
          } else {
            orders[i][y].start = orders[i][y].start_time;
            orders[i][y].end = orders[i][y].end_time;
          }
  
          orders[i][y].id = orders[i][y].wash_id;

          if (orders[i][y].is_scheduled && currentTime > new Date(orders[i][y].start_time) && orders[i][y].in_date === null) {
            orders[i][y].backColor = "rgb(252, 88, 88)"; //red
          } else {
            orders[i][y].backColor = "#3a9c3a"; //green
          }

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
  
          orders[i][y].unscheduled_text =  neededDateDisplayStr;

          if (orders[i][y].int_wash_code !== null) {
            orders[i][y].text =  `Trailer ${orders[i][y].trailer_id.trim()}. Int wash type: ${orders[i][y].int_wash_code}`;
          } else {
            orders[i][y].text =  `Trailer ${orders[i][y].trailer_id.trim()}`;
          }
  
          ordersArr.push(orders[i][y]);
        }
      }
    }
    
    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: ordersArr
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};

const formatOrder = order => {
  let it;
  let et;
  let is;
  let es;

  if (order.int_wash_code !== null) {
    it = (order.int_team_hours * 60) + order.int_team_minutes;
    is = (order.int_solo_hours * 60) + order.int_solo_minutes;
  } else {
    it = 0;
    is = 0;
  }
  
  if (order.ext_wash_code !== null) {
    et = (order.ext_team_hours * 60) + order.ext_team_minutes;
    es = (order.ext_solo_hours * 60) + order.ext_solo_minutes;
  } else {
    et = 0;
    es = 0;
  }

  // set wash durations to work order object
  order.int_duration_mins_team = it;
  order.ext_duration_mins_team = et;
  order.int_duration_mins_solo = is;
  order.ext_duration_mins_solo = es;

  if (order.in_date !== null && order.out_date !== null) {
    order.start = order.in_date;
    order.end = order.out_date;
  } else {
    order.start = order.start_time;
    order.end = order.end_time;
  }

  order.id = order.wash_id;

  if (order.is_scheduled && currentTime > new Date(order.start_time) && order.in_date === null) {
    order.backColor = "rgb(252, 88, 88)"; //red
  } else {
    order.backColor = "#3a9c3a"; //green
  }

  let date = order.needed_date.split("T")[0];
  let hour = parseInt(order.needed_date.split("T")[1].split(":")[0]);
  let minute = order.needed_date.split("T")[1].split(":")[1];
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
  
  order.unscheduled_text = neededDateDisplayStr;

  if (order.int_wash_code !== null) {
    order.text = `Trailer ${order.trailer_id.trim()}. Int wash type: ${order.int_wash_code}`;
  } else {
    order.text = `Trailer ${order.trailer_id.trim()}`;
  }

  return order;
}

export const updateWorkOrderStatus = (id, resource, start, end, workOrders) => async dispatch => {
  try {
    
    let filteredWorkOrders = workOrders.filter(wo => wo.wash_id !== id);

    const res = await axios.put(`${process.env.REACT_APP_URL}/api/workorders/${id}`, {resource, start, end});

    const order = formatOrder(res.data.workOrder);

    filteredWorkOrders.push(order);

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: filteredWorkOrders
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};

export const unscheduleWorkOrder = (id, workOrders) => async dispatch => {
  try {

    let filteredWorkOrders = workOrders.filter(wo => wo.wash_id !== id);

    const res = await axios.put(`${process.env.REACT_APP_URL}/api/workorders/unschedule/${id}`);

    const order = formatOrder(res.data.workOrder);

    filteredWorkOrders.push(order);

    dispatch({
      type: GET_WORK_ORDERS_OF_LOCATION,
      payload: filteredWorkOrders
    });
  } catch (err) {
    dispatch({
      type: WORK_ORDER_ERROR
    });
  }
};