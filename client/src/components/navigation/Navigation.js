import React from "react";
import {Link} from "react-router-dom";

const Navigation = props => {
  return (
    <nav className="navbar navbar-expand-lg mainNav fixed-top">
      <a className="navbar-brand" href="#">
        CloneRbnb Node<span className="single-brand">&</span>React
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/annonces">
              Annonces
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Se connecter
            </Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-danger btn-circle" to="#">
              Inscription
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
