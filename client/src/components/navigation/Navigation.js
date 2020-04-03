import React, { useState, useContext, useEffect } from "react";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import AuthAPI from "../../services/authAPI";
import AuthContext from "../../contexts/AuthContext";

const Navigation = ({ history }) => {

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const [currentUser, setCurrentUser] = useState({
        id: "",
        firstName: "",
        lastName: ""
    });

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.success("Vous êtes désormais déconnecté(e) !");
    history.push("/connexion");
  };

    const fetchInfo = () => {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            const { id, firstName, lastName } = jwtDecode(token);
            setCurrentUser({ id, firstName, lastName });
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

  return (
    <nav className="navbar navbar-expand-lg mainNav fixed-top">
      <Link className="navbar-brand" to="/">
        CloneRbnb Node<span className="single-brand">&</span>React
      </Link>
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

          {
            !isAuthenticated ?
              <>
          <li className="nav-item">
            <Link className="nav-link" to="/connexion">
              Se connecter
            </Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-danger btn-circle" to="/inscription">
              Inscription
            </Link>
          </li>
          </> :
              <>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                Avatar
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={"/mon-profil/" + currentUser.id}>Mon profil</Link>
                  <Link className="dropdown-item" to={"/mon-compte/" + currentUser.id}>Mon compte</Link>
                  <Link className="dropdown-item" to="/annonces/ajouter">Créer une annonce</Link>
                <div className="dropdown-divider"></div>
                <button
                    className="dropdown-item"
                    type="button"
                    onClick={ handleLogout }
                >
                  Déconnexion
                </button>
              </div>
            </li>
          </>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
