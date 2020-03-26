import {
  ADD_LIST,
  DELETE_LIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LIST,
  FILTER_LIST,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from "../types";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, payload]
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(l => l.id !== payload)
      };
    case SET_CURRENT:
      return {
        ...state,
        current: payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map(l => (l.id === payload.id ? payload : l))
      };
    case FILTER_LIST:
      return {
        ...state,
        filtered: state.lists.filter(l => {
          const regex = new RegExp(`${payload}`, "gi");
          return l.name.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};
