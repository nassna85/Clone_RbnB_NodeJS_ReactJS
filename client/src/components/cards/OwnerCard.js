import React from "react";
import { Link } from "react-router-dom";

const OwnerCard = ({ avatar, lastName, introduction, id, firstName }) => {

    const avatarDefault = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    return (
        <>
            <div className="card bg-light">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <Link to={"/proprietaires/" + id + "/information"}>
                                <img
                                    src={avatar ? avatar : avatarDefault}
                                    alt={"Avatar de " + lastName}
                                    className="avatar avatar-medium"
                                />
                            </Link>
                        </div>
                        <div className="col-8">
                            <p className="firstname-owner">{lastName} { firstName }</p>
                            <p className="introduction-owner">{introduction}</p>
                        </div>
                    </div>
                </div>
            </div>
         </>
    );
};

export default OwnerCard;