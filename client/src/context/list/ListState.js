import React, { useReducer } from "react";
import axios from "axios";

import ListContext from "./listContext";
import listReducer from "./listReducer";

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

const ListState = (props) => {
  const initialState = {
    lists: null,
    current: null,
    currentUpdated: null,
    filtered: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(listReducer, initialState);

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

  //Get Lists
  const getLists = async () => {
    setLoading();
    try {
      const res = await axios.get("/api/lists");
      dispatch({
        type: GET_LISTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LIST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Add List
  const addList = async (list) => {
    setLoading();
    try {
      const res = await axios.post("/api/lists", list, config);
      dispatch({
        type: ADD_LIST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LIST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Add Movie
  const addMovie = async (listId, movie) => {
    console.log(listId, movie.name);

    setLoading();
    try {
      const res = await axios.put(
        `/api/lists/addMovie/${listId}`,
        movie,
        config
      );
      dispatch({
        type: UPDATE_LIST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LIST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Delete List
  const deleteList = async (id) => {
    setLoading();
    try {
      await axios.delete(`/api/lists/${id}`);
      dispatch({
        type: DELETE_LIST,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: LIST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Delete Movie from List
  const deleteMovie = async (listId, movieName) => {
    // setLoading();
    try {
      const res = await axios.delete(`/api/lists/${listId}/${movieName}`);
      dispatch({
        type: REMOVE_MOVIE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LIST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Set current List
  const setCurrent = (list) => {
    dispatch({
      type: SET_CURRENT,
      payload: list,
    });
  };

  //Set current List
  const setCurrentUpdated = (list) => {
    dispatch({
      type: SET_CURRENT_UPDATED,
      payload: list,
    });
  };
  //Clear current List
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  //Update List
  const updateList = async (list) => {
    setLoading();

    try {
      const res = await axios.put(`/api/lists/${list._id}`, list, config);
      dispatch({
        type: UPDATE_LIST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LIST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  const updateMovieStatus = async (listId, movieName) => {
    try {
      await axios.put(`/api/lists/updateMovie/${listId}/${movieName}`);
    } catch (error) {
      dispatch({
        type: LIST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Filter Lists
  const filterLists = (text) => {
    setLoading();

    dispatch({
      type: FILTER_LIST,
      payload: text,
    });
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  //Clear Lists
  const clearLists = () => {
    dispatch({
      type: CLEAR_LISTS,
    });
  };

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        current: state.current,
        currentUpdated: state.currentUpdated,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getLists,
        addList,
        deleteList,
        setCurrent,
        clearCurrent,
        updateList,
        filterLists,
        clearFilter,
        setLoading,
        clearLists,
        addMovie,
        deleteMovie,
        updateMovieStatus,
        setLoading,
        setCurrentUpdated,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
