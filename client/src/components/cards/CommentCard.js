import React from "react";
import StarRating from "react-star-ratings";

const Comment = ({ lastName, content, createdAt, avatar, rating }) => {

    const avatarDefault = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    return (
        <div className="card-comment">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <img
                        src={avatar ? avatar : avatarDefault}
                        alt={"Avatar de " + lastName}
                        className="img-fluid avatar avatar-medium"
                    />
                </div>
                <div className="col-md-8">
                    <p className="lastname-comment">{lastName}</p>
                    <StarRating
                        starDimension="20px"
                        starSpacing="3px"
                        starRatedColor="red"
                        numberOfStars={5}
                        rating={+rating}
                    />
                    <p className="mt-3">{content}</p>
                    <small className="date-comment">Ecrit le {createdAt}</small>
                </div>
            </div>
        </div>
    );
};

export default Comment;