import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
// import About from "./components/pages/About";
import Movies from "./components/pages/Movies";
import Alerts from "./components/layout/Alerts";

import ListState from "./context/list/ListState";
import AlertState from "./context/alert/AlertState";
import MovieState from "./context/movie/MovieState";

const App = () => {
  return (
    <MovieState>
      <ListState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  {/* <Route exact path="/about" component={About} /> */}
                  <Route exact path="/filmes" component={Movies} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ListState>
    </MovieState>
  );
};

export default App;
