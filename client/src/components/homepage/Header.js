import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <section id="header-homepage" className="jumbotron">
      <div className="container text-center">
        <h1>Trouver facilement votre logement</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          tempore eum a soluta? Quisquam exercitationem aspernatur dolorum odit
          molestiae beatae.
        </p>

        <Link to="/annonces" className="btn btn-primary">
          Voir les annonces
        </Link>
      </div>
    </section>
  );
};

export default Header;
