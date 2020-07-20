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
  const { searchMovies, loading, movies } = movieContext;

  let listMovies = null;
  useEffect(() => {
    getLists();

    listMovies = document.querySelector("#movies");
    //eslist-disable-next-line
  }, []);

  const [show, setShow] = useState(false);
  const showModal = (movie = null) => {
    setShow(!show);
    setCurrentMovie(movie);
  };

  const [currentMovie, setCurrentMovie] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#searchText").value;
    // getMovies(inputValue);
    searchMovies(inputValue);
  };

  return (
    <Fragment>
      <div className="container">
        <h3 className="text-center">Procurar Filmes</h3>
        <form
          id="searchForm"
          onSubmit={(e) => onSubmit(e)}
          className="form-search"
        >
          <input
            type="text"
            className="form-control"
            id="searchText"
            placeholder="Filme..."
          ></input>
          <button onSubmit={(e) => onSubmit(e)}>
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
      <Modal show={show} onClose={showModal} movie={currentMovie} />
      <div className="container my-1">
        {/* <div id="movies" className="grid-3"> */}
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
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
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default Movies;
