import React, { Fragment, useContext, useState, useEffect } from "react";

// import AlertContext from "../../context/alert/alertContext";
import ListContext from "../../context/list/listContext";

import ListMovieItem from "./ListMovieItem";

const ListModal = ({ show, onClose /*list*/ }) => {
  const listContext = useContext(ListContext);
  const { getLists, currentUpdated, clearCurrent } = listContext;

  const onCloseModal = (e) => {
    onClose && onClose(e);
    clearCurrent();
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
                <h3>{currentUpdated.name}</h3>
              </div>
              <div className="grid-3">
                {currentUpdated.movies === 0 ? (
                  <h3>Nenhuma Filme encontrado.</h3>
                ) : (
                  currentUpdated.movies.map((movie) => (
                    <ListMovieItem
                      listId={currentUpdated._id}
                      movie={movie}
                      key={movie._id}
                    />
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
