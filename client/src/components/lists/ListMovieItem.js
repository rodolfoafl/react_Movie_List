import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import ListContext from "../../context/list/listContext";

const ListMovieItem = ({ listId, movie }) => {
  const listContext = useContext(ListContext);
  const { updateMovieStatus, deleteMovie } = listContext;

  const { name, image, year, status } = movie;

  const [refStatus, setRefStatus] = useState(status);

  const updateStatus = () => {
    setRefStatus(!refStatus);
    updateMovieStatus(listId, name);
  };

  const removeMovie = () => {
    deleteMovie(listId, name);
  };

  return (
    <div className="modal-content text-dark mb-2">
      <p>{name + " " + (year !== undefined ? `(${year})` : "")}</p>
      <img src={image} alt="" className="movie-image sm bordered"></img>
      <div className="movie-actions">
        <a
          href="#!"
          onClick={(e) => updateStatus()}
          className={"status " + (refStatus ? "active" : "inactive")}
        >
          {refStatus ? (
            <i className="fas fa-eye fa-2x"></i>
          ) : (
            <i className="fas fa-eye-slash fa-2x"></i>
          )}
        </a>
        <a href="#!" onClick={(e) => removeMovie()}>
          <i className="fas fa-trash-alt fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

ListMovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default ListMovieItem;
