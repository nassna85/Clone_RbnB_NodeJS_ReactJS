import React, { useState, useEffect } from "react";
import UsersAPI from "../services/usersAPI";
import { toast } from "react-toastify";
import HeaderProfile from "../components/usersProfile/HeaderProfile";
import DetailsProfile from "../components/usersProfile/DetailsProfile";
import ListAds from "../components/usersProfile/ListAds";
import TextArea from "../components/forms/TextArea";

const ShowPublicProfileUser = ({ match }) => {
  const { id } = match.params;
  const [owner, setOwner] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    introduction: "",
    description: "",
    ads: []
  });
  const [message, setMessage] = useState("");

  const fetchOwner = async id => {
    try {
      const data = await UsersAPI.findForPublic(id);
      const {
        firstName,
        lastName,
        avatar,
        introduction,
        description,
        ads
      } = data;
      setOwner({ firstName, lastName, avatar, introduction, description, ads });
    } catch (error) {
      console.log(error.response);
      toast.error(
        "Une erreur est survenue lors du chargement des données... :anguished::"
      );
    }
  };

  const handleMessageContactChange = event => {
    setMessage(event.target.value);
  };

  //TODO => Route API for this !!!
  const handleMessageContactSubmit = event => {
    event.preventDefault();
    console.log("Message send !");
  };

  useEffect(() => {
    fetchOwner(id);
  }, [id]);

  return (
    <>
      <HeaderProfile
        avatar={owner.avatar}
        lastName={owner.lastName}
        firstName={owner.firstName}
        createdAt={owner.createdAt}
        ads={owner.ads}
      />
      <DetailsProfile
        introduction={owner.introduction}
        description={owner.description}
      />
      <ListAds adsByUser={owner.ads} />

      <section id="owner-contact-me">
        <div className="container">
          <h2>Une information ?</h2>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleMessageContactSubmit}>
                <TextArea
                  placeholder="Vous pouvez me contacter..."
                  onChange={handleMessageContactChange}
                />
                <div className="form-group">
                  <button className="btn btn-success btn-circle">
                    Contactez-moi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShowPublicProfileUser;
