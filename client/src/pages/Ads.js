import React, { useState, useEffect } from "react";
import AdsAPI from "../services/adsAPI";
import Ad from "../components/cards/Ad";
import Loader from "../components/loaders/Loader";

const Ads = props => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    try {
      const data = await AdsAPI.findAll();
      setLoading(false);
      setAds(data);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAds();
  }, []);

  return (
    <>
      <section id="ads">
        <div className="container">
          <h2>Trouvez le bien idéal</h2>
          <div className="row">
            {ads.map(ad => (
              <Ad key={ad.id} ad={ad} />
            ))}
          </div>
          {loading ? (
            <Loader
              marginTop="150px"
              color="danger"
              size="70px"
              align="mx-auto"
              marginBottom="200px"
            />
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default Ads;
