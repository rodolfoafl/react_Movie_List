import React, { Fragment, useContext, useState, useEffect } from "react";

// import ListContext from "../../context/list/listContext";
import AlertContext from "../../context/alert/alertContext";

const ListModal = ({ show, onClose, list }) => {
  //   const listContext = useContext(ListContext);
  //   const { lists, loading } = listContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (show) {
      console.log(`show list: ${list.name}`);
    }
  }, [show]);

  const onCloseModal = (e) => {
    onClose && onClose(e);
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
                  <i class="fas fa-times"></i>
                </button>
                <h3>{list.name}</h3>
              </div>
              <div className="grid-3">
                {list.movies === 0 ? (
                  <h3>Nenhuma Filme encontrado.</h3>
                ) : (
                  list.movies.map((movie) => (
                    <div
                      className="modal-content text-dark mb-2"
                      key={movie._id}
                    >
                      <img
                        src={movie.image}
                        alt=""
                        className="movie-image sm bordered"
                      ></img>
                      <p>{movie.name}</p>
                    </div>
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
