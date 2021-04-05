import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Listas</Link>
        </li>
        {/* <li>
          <Link to="/about">About</Link>
        </li> */}
        <li>
          <Link to="/filmes">Filmes</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propType = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  // title: "B&R Filmes",
  title: "B&R Filmes",
  icon: "fas fa-film",
};

export default Navbar;
