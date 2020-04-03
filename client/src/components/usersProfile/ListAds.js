import React from 'react';
import Ad from "../cards/Ad";

const ListAds = ({ adsByUser }) => {
    return (
        <section id="list-ads-show-user-profile">
            <div className="container">
                <h2>Liste des annonces</h2>

                {
                    adsByUser.length > 0 ?
                        <div className="row">
                            {adsByUser.map(adByUser => <Ad ad={ adByUser } key={ adByUser.id } />)}
                        </div>
                        :
                        <h3>Vous n'avez pas encore d'annonces...</h3>
                }
            </div>
        </section>
    );
};

export default ListAds;
