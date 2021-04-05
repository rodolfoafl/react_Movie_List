import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import ListContext from "../../context/list/listContext";

const ListMovieItem = ({ listId, movie }) => {
  const listContext = useContext(ListContext);
  const { updateMovieStatus, deleteMovie } = listContext;

  const { name, image, year, imdbID, status } = movie;

  const [refStatus, setRefStatus] = useState(status);

  const updateStatus = () => {
    setRefStatus(!refStatus);
    updateMovieStatus(listId, name);
  };

  const removeMovie = () => {
    deleteMovie(listId, name);
  };

  return (
    <div className="modal-content text-dark my-2">
      <div className="modal-content-title">
        {name + " " + (year !== undefined ? `(${year})` : "")}
      </div>
      {imdbID !== undefined ? (
        <a
          href={`https://www.imdb.com/title/${imdbID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={image} alt="" className="movie-image sm bordered"></img>
        </a>
      ) : (
        <img src={image} alt="" className="movie-image sm bordered"></img>
      )}
      <div className="movie-actions">
        <button
          onClick={(e) => updateStatus()}
          className={"status " + (refStatus ? "active" : "inactive")}
        >
          {refStatus ? (
            <i className="fas fa-eye fa-2x"></i>
          ) : (
            <i className="fas fa-eye-slash fa-2x"></i>
          )}
        </button>
        <button onClick={(e) => removeMovie()} className="remove-movie">
          <i className="fas fa-trash-alt fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

ListMovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default ListMovieItem;
