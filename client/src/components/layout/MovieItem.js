import React, { Fragment } from "react";

const MovieItem = ({ movie }) => {
  const { Poster, Title, imdbID } = movie;
  console.log(Poster);

  const movieSelected = (e, id) => {
    e.preventDefault();
    console.log(`selected: ${id}`);
  };

  const defaultPoster =
    "https://screenshotlayer.com/images/assets/placeholder.png";
  //   if (movie.Poster !== "N/A") {
  //     poster = movie.Poster;
  //   }

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
          <h3>{Title}</h3>
        </div>
        <div className="well-button">
          <a
            onClick={(e) => movieSelected(e, imdbID)}
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
