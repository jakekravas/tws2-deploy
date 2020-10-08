import {
  GET_WORK_ORDERS_OF_LOCATION,
  UPDATE_WORK_ORDER,
  WORK_ORDER_ERROR
} from "../actions/types";

const initialState = {
  workOrders: null,
  loading: true,
  error: null
}

export default (state = initialState, dispatch) => {
  const { type, payload } = dispatch;

  switch (type) {
    case GET_WORK_ORDERS_OF_LOCATION:
      return {
        ...state,
        workOrders: payload.workOrders,
        loading: false
      }

    case WORK_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload
      }
    }

    default:
      return state;
  }
}