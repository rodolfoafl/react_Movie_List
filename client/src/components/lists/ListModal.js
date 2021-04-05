import React, { Fragment, useContext, useEffect } from "react";

import ListContext from "../../context/list/listContext";

import ListMovieItem from "./ListMovieItem";

const ListModal = ({ show, onClose }) => {
  const listContext = useContext(ListContext);
  const { getLists, currentUpdated, clearCurrent } = listContext;

  const handleKeyUp = (e) => {
    if (e.key === "Escape") {
      window.removeEventListener("keyup", handleKeyUp);
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    onClose && onClose();
    clearCurrent();
    getLists();
  };

  const handleClickOnOverlay = (className) => {
    if (className === "modal-background") {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp, false);
  }, [handleKeyUp]);

  return (
    <Fragment>
      {!show ? null : (
        <Fragment>
          <div
            className="modal-background"
            onClick={(e) => handleClickOnOverlay(e.target.className)}
          >
            <div className="modal text-dark" id="modal">
              <div>
                <button
                  className="toggle-button danger"
                  onClick={() => onCloseModal()}
                  style={{
                    float: "right",
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
                <h3>
                  {currentUpdated !== undefined &&
                    currentUpdated !== null &&
                    currentUpdated.name}
                </h3>
              </div>
              <div className="grid-3 mx-1">
                {currentUpdated !== undefined &&
                currentUpdated !== null &&
                currentUpdated.movies === 0 ? (
                  <h3>Nenhuma Filme encontrado.</h3>
                ) : (
                  currentUpdated !== undefined &&
                  currentUpdated !== null &&
                  currentUpdated.movies
                    .sort((a, b) => a.year - b.year)
                    .map((movie) => (
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
