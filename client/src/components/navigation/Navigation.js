import React from "react";

const Navigation = props => {
  return (
    <nav className="navbar navbar-expand-lg mainNav">
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
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Accueil
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Annonces
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Se connecter
            </a>
          </li>
          <li className="nav-item">
            <a className="btn btn-danger" href="#">
              Inscription
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
