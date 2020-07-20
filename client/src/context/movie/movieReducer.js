import { SEARCH_MOVIES, SET_LOADING, MOVIE_ERROR } from "../types";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MOVIE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
