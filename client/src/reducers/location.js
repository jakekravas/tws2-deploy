import {
  GET_ALL_LOCATIONS,
  GET_LOCATION_INFO,
  UPDATE_LOCATION_HOURS,
  UPDATE_BAY_QUANTITY,
  LOCATION_ERROR
} from "../actions/types";

const initialState = {
  locations: null,
  selectedLocation: null,
  loading: true
}

export default (state = initialState, dispatch) => {
  const { type, payload } = dispatch;

  switch (type) {

    case GET_ALL_LOCATIONS:
      return {
        ...state,
        locations: payload.locations,
        loading: false
      }

    case GET_LOCATION_INFO:
      return {
        ...state,
        selectedLocation: payload.location,
        loading: false
      }
      
    case UPDATE_LOCATION_HOURS:
      return {
        ...state,
        selectedLocation: payload.location,
        loading: false
      }

    case UPDATE_BAY_QUANTITY:
      return {
        ...state,
        selectedLocation: payload.location,
        loading: false
      }

    case LOCATION_ERROR:
      console.log("err");
      return {
        ...state,
      }

    default:
      return state;
  }
}