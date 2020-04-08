import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";

import MovieItem from "../layout/MovieItem";
import Modal from "../layout/Modal";

import ListContext from "../../context/list/listContext";

const Movies = () => {
  const listContext = useContext(ListContext);
  const { getLists } = listContext;

  let listMovies = null;
  useEffect(() => {
    getLists();

    listMovies = document.querySelector("#movies");
    //eslist-disable-next-line
  }, []);

  const [movies, setMovies] = useState(null);

  const [show, setShow] = useState(false);
  const showModal = (movie = null) => {
    setShow(!show);
    setCurrentMovie(movie);
  };

  const [currentMovie, setCurrentMovie] = useState(null);

  const getMovies = (text) => {
    axios
      .get(`http://www.omdbapi.com/?s=${text}&apikey=3f85b66e`)
      .then((res) => {
        setMovies(res.data.Search.filter((m) => m.Type === "movie"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#searchText").value;
    getMovies(inputValue);
  };

  return (
    <Fragment>
      <div className="container">
        <h3 className="text-center">Procurar Filmes</h3>
        <form id="searchForm" onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            className="form-control"
            id="searchText"
            placeholder="Filme..."
          ></input>
        </form>
      </div>
      <Modal show={show} onClose={showModal} movie={currentMovie} />
      <div className="container my-1">
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
      </div>
    </Fragment>
  );
};

export default Movies;
