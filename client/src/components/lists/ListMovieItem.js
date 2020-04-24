import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import ListContext from "../../context/list/listContext";

const ListMovieItem = ({ listId, movie }) => {
  const listContext = useContext(ListContext);
  const { updateMovieStatus } = listContext;

  const { name, image, status } = movie;

  const [refStatus, setRefStatus] = useState(status);

  const updateStatus = (movieName) => {
    setRefStatus(!refStatus);
    updateMovieStatus(listId, movieName);
  };

  return (
    <div className="modal-content text-dark mb-2">
      <p>{name}</p>
      <img src={image} alt="" className="movie-image sm bordered"></img>
      <p>
        <a
          onClick={(e) => updateStatus(name)}
          className={"status " + (refStatus ? "active" : "inactive")}
        >
          {refStatus ? (
            <i className="fas fa-eye fa-2x"></i>
          ) : (
            <i className="fas fa-eye-slash fa-2x"></i>
          )}
        </a>
      </p>
    </div>
  );
};

ListMovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default ListMovieItem;
