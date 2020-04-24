import {
  ADD_LIST,
  DELETE_LIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LIST,
  FILTER_LIST,
  CLEAR_FILTER,
  LIST_ERROR,
  GET_LISTS,
  CLEAR_LISTS,
  SET_LOADING,
} from "../types";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [payload, ...state.lists],
        loading: false,
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((l) => l._id !== payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map((l) => (l._id === payload._id ? payload : l)),
        loading: false,
      };
    case FILTER_LIST:
      return {
        ...state,
        filtered: state.lists.filter((l) => {
          const regex = new RegExp(`${payload}`, "gi");
          return l.name.match(regex);
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case LIST_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_LISTS:
      return {
        ...state,
        lists: payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_LISTS:
      return {
        ...state,
        lists: null,
        filtered: null,
        error: null,
        current: null,
      };

    default:
      return state;
  }
};
