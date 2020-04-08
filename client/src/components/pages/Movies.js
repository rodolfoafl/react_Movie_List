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

  const movieSelected = (id) => {
    let movieId = sessionStorage.getItem("movieId");

    let selectedMovie = document.querySelector("#movie");

    axios
      .get(`http://www.omdbapi.com/?i=${movieId}&apikey=3f85b66e`)
      .then((res) => {
        let movie = res.data;

        let output = `
        <div className="row">
          <div className="col-md-4">
            <img src="${movie.Poster}" className="thumbnail">
          </div>
          <div className="col-md-8">
            <h2>${movie.Title}</h2>
            <ul className="list-group">
              <li className="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li className="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li className="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li className="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li className="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li className="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li className="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" className="btn btn-primary">View IMDB</a>
            <a href="index.html" className="btn btn-secondary">Go Back To Search</a>
          </div>
        </div>
      `;

        selectedMovie.innerHTML = output;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [movies, setMovies] = useState(null);

  const [show, setShow] = useState(false);
  const showModal = (modalContent = "") => {
    setShow(!show);
    setModalContent(modalContent);
  };

  const [content, setContent] = useState("");
  const setModalContent = (text) => {
    // console.log(`setting modal content: ${text}`);
    setContent(text);
  };

  const getMovies = (text) => {
    console.log(text);
    axios
      .get(`http://www.omdbapi.com/?s=${text}&apikey=3f85b66e`)
      .then((res) => {
        // console.log(res);
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
      <Modal show={show} onClose={showModal}>
        {content}
      </Modal>
      <div className="container my-1">
        <div id="movies" className="grid-3">
          {movies !== null &&
            movies.map((movie) => (
              <MovieItem
                key={movie.imdbID}
                movie={movie}
                showModal={showModal}
                // setContent={setModalContent}
              />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Movies;
