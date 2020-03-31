import React, { Fragment } from "react";

const Movies = () => {
  const getMovies = text => {
    console.log(text);
  };

  const onSubmit = e => {
    e.preventDefault();
    let inputValue = document.querySelector("#searchText").value;
    getMovies(inputValue);
  };

  return (
    <Fragment>
      <div className="container">
        <h3 className="text-center">Procurar Filmes</h3>
        <form id="searchForm" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            className="form-control"
            id="searchText"
            placeholder="Filme..."
          ></input>
        </form>
      </div>

      <div className="container">
        <div id="movies" className="row"></div>
      </div>
    </Fragment>
  );
};

export default Movies;
