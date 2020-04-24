import React, { Fragment, useContext, useState, useEffect } from "react";

// import AlertContext from "../../context/alert/alertContext";
import ListContext from "../../context/list/listContext";

import ListMovieItem from "./ListMovieItem";

const ListModal = ({ show, onClose, list }) => {
  const listContext = useContext(ListContext);
  const { getLists } = listContext;

  // const alertContext = useContext(AlertContext);
  // const { setAlert } = alertContext;

  useEffect(() => {
    if (show) {
      console.log(`show list: ${list.name}`);
    }
  }, [show]);

  const onCloseModal = (e) => {
    onClose && onClose(e);
    getLists();
  };

  return (
    <Fragment>
      {!show ? null : (
        <Fragment>
          <div className="modal-background">
            <div className="modal text-dark" id="modal">
              <div>
                <button
                  // className="toggle-button disabled mx-1"

                  className="toggle-button danger m"
                  onClick={(e) => onCloseModal(e)}
                  style={{
                    float: "right",
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
                <h3>{list.name}</h3>
              </div>
              <div className="grid-3">
                {list.movies === 0 ? (
                  <h3>Nenhuma Filme encontrado.</h3>
                ) : (
                  list.movies.map((movie) => (
                    <ListMovieItem listId={list._id} movie={movie} />
                  ))
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListModal;
