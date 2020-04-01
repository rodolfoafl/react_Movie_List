import React, { Fragment, useEffect } from "react";
import axios from "axios";

const Movies = () => {
  let listMovies = null;

  useEffect(() => {
    listMovies = document.querySelector("#movies");
    //eslist-disable-next-line
  }, []);

  const movieSelected = id => {
    let movieId = sessionStorage.getItem("movieId");

    let selectedMovie = document.querySelector("#movie");

    axios
      .get(`http://www.omdbapi.com/?i=${movieId}&apikey=3f85b66e`)
      .then(res => {
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
      .catch(err => {
        console.log(err);
      });
  };

  const getMovies = text => {
    console.log(text);
    axios
      .get(`http://www.omdbapi.com/?s=${text}&apikey=3f85b66e`)
      .then(res => {
        // console.log(res);
        let movies = res.data.Search;
        let output = "";

        movies.forEach(movie => {
          let poster = "./img/default-movie.png";
          if (movie.Poster !== "N/A") {
            poster = movie.Poster;
          }

          output += `<div classNameName="movies-container">
            <div classNameName="well text-center">
                <img src="${poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" classNameName="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>`;
        });

        listMovies.innerHTML = output;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmit = e => {
    e.preventDefault();
    let inputValue = document.querySelector("#searchText").value;
    getMovies(inputValue);
  };

  return (
    <Fragment>
      <div classNameName="container">
        <h3 classNameName="text-center">Procurar Filmes</h3>
        <form id="searchForm" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            classNameName="form-control"
            id="searchText"
            placeholder="Filme..."
          ></input>
        </form>
      </div>

      <div classNameName="container my-1">
        <div id="movies" classNameName="grid-4"></div>
      </div>
    </Fragment>
  );
};

export default Movies;
