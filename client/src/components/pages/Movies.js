import React, { Fragment, useEffect, useState, useContext } from "react";

import MovieItem from "../layout/MovieItem";
import Modal from "../layout/Modal";
import Spinner from "../layout/Spinner";

import ListContext from "../../context/list/listContext";
import MovieContext from "../../context/movie/movieContext";

const Movies = () => {
  const listContext = useContext(ListContext);
  const { getLists } = listContext;

  const movieContext = useContext(MovieContext);
  const { searchMovies, loading, movies, error } = movieContext;

  useEffect(() => {
    getLists();

    //eslint-disable-next-line
  }, [error]);

  const [show, setShow] = useState(false);
  const showModal = (movie = null) => {
    setShow(!show);
    setCurrentMovie(movie);
  };

  const [currentMovie, setCurrentMovie] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#searchText").value;
    searchMovies(inputValue);
  };

  return (
    <Fragment>
      <div className="container">
        <h2 className="text-center">Procurar Filmes</h2>
        <form
          id="searchForm"
          onSubmit={(e) => onSubmit(e)}
          className="form-search"
        >
          <input
            type="text"
            className="form-control"
            id="searchText"
            placeholder="Filme (nome em inglês)"
          ></input>
          <button onSubmit={(e) => onSubmit(e)}>
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
      <Modal show={show} onClose={showModal} movie={currentMovie} />
      <div className="container my-1">
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : error !== null ? (
          <h3>Nenhum filme encontrado.</h3>
        ) : (
          <div id="movies" className="grid-3">
            {movies !== null &&
              movies.map((movie) => (
                <MovieItem
                  key={movie.imdbID}
                  movie={movie}
                  showModal={showModal}
                />
              ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Movies;
