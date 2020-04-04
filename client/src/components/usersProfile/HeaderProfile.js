import React from "react";
import { formatDate } from "../../helpers/formatDate";

const HeaderProfile = ({
  avatar,
  firstName,
  lastName,
  createdAt,
  ads,
  background = ""
}) => {
  return (
    <section
      id="header-show-user-profile"
      className="jumbotron"
      style={{ backgroundColor: background }}
    >
      <div className="container text-center">
        <img
          src={avatar}
          alt={firstName}
          className="img-fluid avatar avatar-medium"
        />
        <p className="firstname mt-3">
          {firstName} {lastName}
        </p>
        <span className="badge badge-danger mb-3">{ads.length} annonces</span>
        <p className="date-member">Membre depuis le {formatDate(createdAt)}</p>
      </div>
    </section>
  );
};

export default HeaderProfile;
