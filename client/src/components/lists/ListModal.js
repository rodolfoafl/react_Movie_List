import React, { Fragment, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import ListContext from "../../context/list/listContext";
// import AlertContext from "../../context/alert/alertContext";

const ListModal = ({ show, onClose, list }) => {
  const listContext = useContext(ListContext);
  const { loading } = listContext;

  const { name, movies } = list;

  useEffect(() => {
    if (show) {
      console.log("show modal");
      if (list !== null) {
        console.log(name);
      }
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
              <h3>{name}</h3>
              {movies.length === 0 ? (
                <h3>Nenhuma Filme adicionado.</h3>
              ) : (
                movies.map((movie) => (
                  <div className="modal-content text-dark" key={movie._id}>
                    <label htmlFor={movie.name}>{movie.name}</label>
                  </div>
                ))
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ListModal.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListModal;
