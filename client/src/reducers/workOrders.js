import {
  GET_WORK_ORDERS_OF_LOCATION,
  GET_WORK_ORDER_LOGS,
  CLEAR_WORK_ORDER_LOGS,
  WORK_ORDER_ERROR
} from "../actions/types";

const initialState = {
  workOrders: null,
  wo_resources: null,
  workOrderLogs: null,
  workOrderLogss: null,
  loading: true,
  error: null
}

export default (state = initialState, dispatch) => {
  const { type, payload } = dispatch;

  switch (type) {
    case GET_WORK_ORDERS_OF_LOCATION:
      return {
        ...state,
        workOrders: payload,
        loading: false
      }

    case GET_WORK_ORDER_LOGS:
      return {
        ...state,
        workOrderLogs: payload,
        loading: false
      }

    case CLEAR_WORK_ORDER_LOGS:
      return {
        ...state,
        workOrderLogs: null,
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