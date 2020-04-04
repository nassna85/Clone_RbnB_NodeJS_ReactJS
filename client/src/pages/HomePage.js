import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/homepage/Header";
import AdsAPI from "../services/adsAPI";
import Ad from "../components/cards/Ad";
import Loader from "../components/loaders/Loader";
import { toast } from "react-toastify";

const HomePage = props => {
  const [lastAds, setLastAds] = useState([]);
  const [bestAds, setBestAds] = useState([]);
  const [loadingLastAds, setLoadingLastAds] = useState(true);
  const [loadingBestAds, setLoadingBestAds] = useState(true);

  const fetchLastAds = async () => {
    try {
      const data = await AdsAPI.findLast();
      setLoadingLastAds(false);
      setLastAds(data);
    } catch (error) {
      setLoadingLastAds(false);
      toast.error("Une erreur est survenue lors du chargement des données...");
      console.log(error.response);
    }
  };

  const fetchBestAds = async () => {
    try {
      const data = await AdsAPI.findBest();
      setLoadingBestAds(false);
      setBestAds(data);
    } catch (error) {
      setLoadingBestAds(false);
      toast.error("Une erreur est survenue lors du chargement des données...");
      console.log(error.response);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLastAds();
    fetchBestAds();
  }, []);

  /*
  useEffect(() => {
    fetchBestAds();
  }, []);
  */

  return (
    <>
      <Header />
      <section id="last-ads">
        <div className="container">
          <h2>Les annonces récentes</h2>
          <div className="row">
            {lastAds.map(lastAd => (
              <Ad ad={lastAd} key={lastAd.id} />
            ))}
          </div>
          {loadingLastAds ? (
            <Loader
              color="danger"
              size="50px"
              align="mx-auto"
              marginTop="100px"
            />
          ) : (
            ""
          )}
        </div>
      </section>
      <section id="cta-registration" className="jumbotron">
        <div className="container text-center">
          <p>
            Vous souhaitez mettre votre bien en location ? C'est gratuit. Il
            vous suffit de vous inscrire et de créer une annonce.
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
            {bestAds.map(bestAd => (
              <Ad ad={bestAd} key={bestAd.id} />
            ))}
          </div>
          {loadingBestAds ? (
            <Loader
              color="danger"
              size="50px"
              align="mx-auto"
              marginTop="100px"
            />
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
