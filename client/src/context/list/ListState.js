import React, { useReducer } from "react";

import { v4 as uuidv4 } from "uuid";

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
  SET_ALERT,
  REMOVE_ALERT
} from "../types";

const ListState = props => {
  const initialState = {
    lists: [
      {
        id: 1,
        name: "Lista 1",
        movies: [
          { id: 999, name: "Filme 999" },
          { id: 998, name: "Filme 998" }
        ]
      },
      { id: 2, name: "Lista 2", movies: [] }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(listReducer, initialState);

  //Add List
  const addList = list => {
    list.id = uuidv4();
    dispatch({
      type: ADD_LIST,
      payload: list
    });
  };

  //Delete List
  const deleteList = id => {
    dispatch({
      type: DELETE_LIST,
      payload: id
    });
  };

  //Set current List
  const setCurrent = list => {
    dispatch({
      type: SET_CURRENT,
      payload: list
    });
  };
  //Clear current List
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  //Update List
  const updateList = list => {
    dispatch({
      type: UPDATE_LIST,
      payload: list
    });
  };

  //Filter Lists
  const filterLists = text => {
    dispatch({
      type: FILTER_LIST,
      payload: text
    });
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        current: state.current,
        filtered: state.filtered,
        addList,
        deleteList,
        setCurrent,
        clearCurrent,
        updateList,
        filterLists,
        clearFilter
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
