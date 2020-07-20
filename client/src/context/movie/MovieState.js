import React, { useReducer } from "react";
import axios from "axios";

import MovieContext from "./movieContext";
import movieReducer from "./movieReducer";

import { SEARCH_MOVIES, SET_LOADING, MOVIE_ERROR } from "../types";

const MovieState = (props) => {
  const initialState = {
    movies: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(movieReducer, initialState);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  //Get searched Movies
  const searchMovies = async (text) => {
    console.log(text);

    setLoading();

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${text}&apikey=3f85b66e`
      );

      dispatch({
        type: SEARCH_MOVIES,
        payload: res.data.Search.filter((movie) => movie.Type === "movie"),
      });
    } catch (error) {
      dispatch({
        type: MOVIE_ERROR,
        payload: error.response.msg,
      });
    }
  };
  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        error: state.error,
        loading: state.loading,
        searchMovies,
        setLoading,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
