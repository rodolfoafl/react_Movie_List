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
  REMOVE_MOVIE,
  SET_CURRENT_UPDATED,
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
        lists: state.lists.filter((list) => list._id !== payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: payload,
      };
    case SET_CURRENT_UPDATED:
      return {
        ...state,
        currentUpdated: payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        currentUpdated: null,
      };
    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === payload._id ? payload : list
        ),
        loading: false,
      };
    case REMOVE_MOVIE:
      return {
        ...state,
        currentUpdated: payload,
      };
    case FILTER_LIST:
      return {
        ...state,
        filtered: state.lists.filter((list) => {
          const regex = new RegExp(`${payload}`, "gi");
          return list.name.match(regex);
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
