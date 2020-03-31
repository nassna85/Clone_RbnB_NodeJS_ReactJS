import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/homepage/Header";
import Ad from "../components/cards/Ad";

const HomePage = props => {
  return (
    <>
        <Header />
        <section id="last-ads">
            <div className="container">
                <h2>Les annonces récentes</h2>
                <div className="row">
                    <Ad />
                    <Ad />
                    <Ad />
                </div>
            </div>
        </section>
        <section id="cta-registration" className="jumbotron">
            <div className="container text-center">
                <p>
                    Vous souhaitez mettre votre bien en location ? C'est gratuit. Il vous suffit de vous inscrire et de créer une annonce.
                </p>
                <Link to="#" className="btn btn-success btn-circle">
                    Je m'inscris
                </Link>
            </div>
        </section>
        <section id="best-ads">
            <div className="container">
                <h2>Les meilleures annonces</h2>
                <div className="row">
                    <Ad/>
                    <Ad/>
                    <Ad/>
                </div>
            </div>
        </section>
    </>
  );
};

export default HomePage;
