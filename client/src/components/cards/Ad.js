import React from 'react';
import { Link } from "react-router-dom";

const Ad = (props) => {
    return (
        <div className="col-lg-4">
            <div className="card-ad">
                <Link to="#">
                    <img
                        src="https://cdn.pixabay.com/photo/2020/02/07/14/49/glacier-4827387_960_720.jpg"
                        alt="Titre"
                        className="img-fluid"
                    />
                </Link>
                <div className="rating-ad">Note de l'annonce</div>
                <h3>Titre de l'annonce</h3>
                <div className="d-flex justify-content-between my-3">
                    <span className="badge badge-primary">Bulgarie</span>
                    <span className="price">97.99 €</span>
                </div>
            </div>
        </div>
    );
};

export default Ad;
