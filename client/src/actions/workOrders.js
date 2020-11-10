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
    console.log("AAAAAAAAA");
    const locationIdsArr = [];
    
    for (let i = 0; i < terminals.length; i++) {
      locationIdsArr.push(terminals[i].location_id);
    }
    
    const locations = locationIdsArr.join();
    
    const res = await axios.get(`/api/workorders/user/${locations}`);

    console.log(res.data);

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    let orders = res.data.workOrders;
    const ordersArr = [];
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        // get minute duration of washes
        let it = (orders[i].intWash.team_hours * 60) + orders[i].intWash.team_minutes;
        let et = (orders[i].extWash.team_hours * 60) + orders[i].extWash.team_minutes;
        let is = (orders[i].intWash.solo_hours * 60) + orders[i].intWash.solo_minutes;
        let es = (orders[i].extWash.solo_hours * 60) + orders[i].extWash.solo_minutes;

        // set wash durations to work order object
        orders[i].wo.int_duration_mins_team = it;
        orders[i].wo.ext_duration_mins_team = et;
        orders[i].wo.int_duration_mins_solo = is;
        orders[i].wo.ext_duration_mins_solo = es;

        orders[i].wo.start = orders[i].wo.start_time;
        orders[i].wo.end = orders[i].wo.end_time;
        orders[i].wo.id = orders[i].wo.order_id;

        orders[i].wo.text =  `Needed by ${orders[i].wo.needed_date}`;

        ordersArr.push(orders[i].wo);
      }
      console.log(ordersArr);
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
// export const getWorkOrders = terminals => async dispatch => {
//   try {
//     console.log("AAAAAAAAA");
//     const locationIdsArr = [];
    
//     for (let i = 0; i < terminals.length; i++) {
//       locationIdsArr.push(terminals[i].location_id);
//     }
    
//     const locations = locationIdsArr.join();
    
//     const res = await axios.get(`/api/workorders/user/${locations}`);

//     // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
//     let orders = res.data.workOrders;
//     if (orders.length > 0) {
//       for (let i = 0; i < orders.length; i++) {
//         orders[i].start = orders[i].start_time;
//         orders[i].end = orders[i].end_time;
//       }
//     }
    
//     dispatch({
//       type: GET_WORK_ORDERS_OF_LOCATION,
//       payload: orders
//     });
//   } catch (err) {
//     dispatch({
//       type: WORK_ORDER_ERROR
//     });
//   }
// };

// export const updateWorkOrderStatus = (id, resource, start, end, washLocationId, terminals) => async dispatch => {
export const updateWorkOrderStatus = (id, resource, start, end, terminals) => async dispatch => {
  try {
    console.log(id.length);
    console.log(resource);
    console.log(start);
    console.log(end);
    console.log(terminals);
    const locationIdsArr = [];
    
    for (let i = 0; i < terminals.length; i++) {
      locationIdsArr.push(terminals[i].location_id);
    }
    
    const locations = locationIdsArr.join();

    const res = await axios.put(`/api/workorders/${id}`, {resource, start, end, locations});

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    let orders = res.data.workOrders;
    const ordersArr = [];
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        // get minute duration of washes
        let it = (orders[i].intWash.team_hours * 60) + orders[i].intWash.team_minutes;
        let et = (orders[i].extWash.team_hours * 60) + orders[i].extWash.team_minutes;
        let is = (orders[i].intWash.solo_hours * 60) + orders[i].intWash.solo_minutes;
        let es = (orders[i].extWash.solo_hours * 60) + orders[i].extWash.solo_minutes;

        // set wash durations to work order object
        orders[i].wo.int_duration_mins_team = it;
        orders[i].wo.ext_duration_mins_team = et;
        orders[i].wo.int_duration_mins_solo = is;
        orders[i].wo.ext_duration_mins_solo = es;

        orders[i].wo.start = orders[i].wo.start_time;
        orders[i].wo.end = orders[i].wo.end_time;
        orders[i].wo.id = orders[i].wo.order_id;

        orders[i].wo.text =  `Needed by ${orders[i].wo.needed_date}`;

        ordersArr.push(orders[i].wo);
      }
      console.log(ordersArr);
    }

    // if (orders.length > 0) {
    //   for (let i = 0; i < orders.length; i++) {
    //     orders[i].start = orders[i].start_time;
    //     orders[i].end = orders[i].end_time;
    //   }
    // }

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
    // console.log(id);
    const locationIdsArr = [];
    
    for (let i = 0; i < terminals.length; i++) {
      locationIdsArr.push(terminals[i].location_id);
    }
    
    const locations = locationIdsArr.join();

    const res = await axios.put(`/api/workorders/unschedule/${id}`, {locations});
    console.log(res.data);

    let orders = res.data.workOrders;
    const ordersArr = [];
    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        // get minute duration of washes
        let it = (orders[i].intWash.team_hours * 60) + orders[i].intWash.team_minutes;
        let et = (orders[i].extWash.team_hours * 60) + orders[i].extWash.team_minutes;
        let is = (orders[i].intWash.solo_hours * 60) + orders[i].intWash.solo_minutes;
        let es = (orders[i].extWash.solo_hours * 60) + orders[i].extWash.solo_minutes;

        // set wash durations to work order object
        orders[i].wo.int_duration_mins_team = it;
        orders[i].wo.ext_duration_mins_team = et;
        orders[i].wo.int_duration_mins_solo = is;
        orders[i].wo.ext_duration_mins_solo = es;

        orders[i].wo.start = orders[i].wo.start_time;
        orders[i].wo.end = orders[i].wo.end_time;

        orders[i].wo.text =  `Needed by ${orders[i].wo.needed_date}`;
        
        orders[i].wo.id = orders[i].wo.order_id;

        ordersArr.push(orders[i].wo);
      }
      console.log(ordersArr);
    }

    // Setting a start and end property here because SQL doesn't allow us to have columns with those names, and DayPilot needs those exact names to display the orders
    // let orders = res.data.workOrders;
    // if (orders.length > 0) {
    //   for (let i = 0; i < orders.length; i++) {
    //     orders[i].start = orders[i].start_time;
    //     orders[i].end = orders[i].end_time;
    //   }
    // }

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