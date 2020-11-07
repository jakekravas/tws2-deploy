import {
  GET_USER
} from "../actions/types";

const initialState = {
  user: null,
  role: null,
  terminals: null,
  hours: null,
  loading: true,
  error: null
}

export default (state = initialState, dispatch) => {
  const { type, payload } = dispatch;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload.user,
        role: payload.role,
        terminals: payload.terminals,
        hours: payload.hours,
        loading: false
      }

    default:
      return state;
  }
}