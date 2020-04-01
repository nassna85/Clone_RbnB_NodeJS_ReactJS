import React from 'react';
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const Ad = ({ ad }) => {
    return (
        <div className="col-sm-12 col-lg-4 col-md-6">
            <div className="card-ad mb-5">
                <Link to={"/annonces/" + ad.slug + "/" + ad.id}>
                    <img
                        src={ ad.coverImage }
                        alt={ ad.title }
                        className="img-fluid ad-coverImage"
                    />
                </Link>
                <div className="rating-ad">
                    <StarRatings
                        starDimension="20px"
                        starSpacing="3px"
                        starRatedColor="red"
                        numberOfStars={5}
                        rating={+ad.avgRatings}
                    />
                </div>
                <h3>{ ad.title }</h3>
                <div className="d-flex justify-content-between my-3">
                    <span className="badge badge-primary">{ ad.location }</span>
                    <span className="price">{ ad.price } €</span>
                </div>
            </div>
        </div>
    );
};

export default Ad;
