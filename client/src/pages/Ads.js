import React, { useState, useEffect } from 'react';
import AdsAPI from "../services/adsAPI";
import Ad from "../components/cards/Ad";

const Ads = (props) => {
    const [ads, setAds] = useState([]);

    const fetchAds = async () => {
        try{
            const data = await AdsAPI.findAll();
            setAds(data);
        }catch(error){
            console.log(error.response);
        }
    };

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <>
            <section id="ads">
                <div className="container">
                    <h2>Trouvez le bien idéal</h2>
                    <div className="row">
                        {
                            ads.map(ad => <Ad key={ ad.id } ad={ ad }  />)
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default Ads;
