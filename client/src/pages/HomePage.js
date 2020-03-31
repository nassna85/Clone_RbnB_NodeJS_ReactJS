import React from "react";
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
    </>
  );
};

export default HomePage;
