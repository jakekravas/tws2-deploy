import {
  GET_ALL_WASH_TYPES,
  ADD_WASH_TYPE,
  UPDATE_WASH_TYPE,
  DELETE_WASH_TYPE,
  WASH_TYPE_ERROR
} from "../actions/types";

const initialState = {
  washTypes: null,
  loading: true,
  error: null
}

export default (state = initialState, dispatch) => {
  const { type, payload } = dispatch;

  switch (type) {
    case ADD_WASH_TYPE:
    case GET_ALL_WASH_TYPES:
    case UPDATE_WASH_TYPE:
    case DELETE_WASH_TYPE:
      return {
        ...state,
        washTypes: payload.washTypes,
        loading: false
      }

    case WASH_TYPE_ERROR: {
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