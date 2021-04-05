import React, { Fragment } from "react";

const MovieItem = ({ movie, showModal }) => {
  console.log(movie);
  const { Poster, Title, Year, imdbID } = movie;

  const defaultPoster =
    "https://screenshotlayer.com/images/assets/placeholder.png";

  return (
    <Fragment>
      <div className="well text-center">
        <div className="image-container">
          <a
            href={`https://www.imdb.com/title/${imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Poster !== "N/A" ? Poster : defaultPoster}
              className="well-image"
              alt={`Poster do filme ${Title}`}
            />
          </a>
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
            onClick={() => showModal(movie)}
            className="btn btn-primary"
            href="#!"
          >
            Adicionar à lista
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default MovieItem;
