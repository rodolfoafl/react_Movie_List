import React, { Fragment } from "react";

const MovieItem = ({ movie, showModal }) => {
  const { Poster, Title, Year } = movie;

  // const movieSelected = (e, id) => {
  //   e.preventDefault();
  //   console.log(`selected: ${id}`);
  // };

  const defaultPoster =
    "https://screenshotlayer.com/images/assets/placeholder.png";

  return (
    <Fragment>
      <div className="well text-center">
        <div className="image-container">
          <img
            src={Poster !== "N/A" ? Poster : defaultPoster}
            className="well-image"
          />
        </div>
        <div className="well-title">
          {Title.length > 32 ? (
            <h4>{`${Title} (${Year})`}</h4>
          ) : (
            <h3>{`${Title} (${Year})`}</h3>
          )}
        </div>
        <div className="well-button">
          <a
            // onClick={(e) => movieSelected(e, imdbID)}
            onClick={() => showModal(movie)}
            className="btn btn-primary"
            href="#"
          >
            Adicionar à lista
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default MovieItem;
