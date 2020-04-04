import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UsersAPI from "../services/usersAPI";
import AdsAPI from "../services/adsAPI";
import BookingsAPI from "../services/bookingsAPI";
import HeaderProfile from "../components/usersProfile/HeaderProfile";
import BookingCard from "../components/cards/BookingCard";
import DetailsProfile from "../components/usersProfile/DetailsProfile";
import ListAds from "../components/usersProfile/ListAds";

const ShowProfileUser = ({ match, history }) => {
  const { id } = match.params;

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    introduction: "",
    description: "",
    createdAt: ""
  });

  const [adsByUser, setAdsByUser] = useState([]);

  const [bookingsByUser, setBookingsByUser] = useState([]);

  const fetchCurrentUser = async id => {
    try {
      const data = await UsersAPI.find(id);
      const {
        firstName,
        lastName,
        avatar,
        introduction,
        description,
        createdAt
      } = data;
      setUser({
        firstName,
        lastName,
        avatar,
        introduction,
        description,
        createdAt
      });
    } catch (error) {
      if (error.response.status === 403) {
        toast.error("Vous n'avez pas accès à cette ressource !");
        return history.push("/403");
      } else if (error.response.status === 404) {
        toast.error("L'utilisateur n'a pas été trouvé !");
        return history.push("/404");
      } else {
        console.log(error.response);
        toast.error(
          "Une erreur est survenue lors du chargement des données de l'utilisateur !"
        );
        return history.push("/");
      }
    }
  };

  const fetchAdsByUser = async id => {
    try {
      const data = await AdsAPI.findAllByUser(id);
      setAdsByUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchBookingsByUser = async id => {
    try {
      const data = await BookingsAPI.findAllByUser(id);
      setBookingsByUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  /*
    useEffect(() => {
        fetchCurrentUser(id);
    }, [id]);
    */

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCurrentUser(id);
    fetchAdsByUser(id);
    fetchBookingsByUser(id);
  }, [id]);
  /*
    useEffect(() => {
        fetchBookingsByUser(id);
    }, [id]);
    */

  return (
    <>
      <HeaderProfile
        avatar={user.avatar}
        createdAt={user.createdAt}
        lastName={user.lastName}
        firstName={user.firstName}
        ads={adsByUser}
      />

      <div className="divider-section"></div>

      <DetailsProfile
        introduction={user.introduction}
        description={user.description}
      />

      <div className="divider-section"></div>

      <ListAds adsByUser={adsByUser} />

      <div className="divider-section"></div>

      <section id="list-bookings-show-user-profile">
        <div className="container">
          <h2>Liste des réservations</h2>

          {bookingsByUser.length > 0 ? (
            <div className="row">
              {bookingsByUser.map(bookingByUser => (
                <BookingCard booking={bookingByUser} key={bookingByUser.id} />
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <h3 className="alert-heading">
                <i className="fas fa-lightbulb mr-2"></i>
                Vous n'avez pas encore de réservations
              </h3>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShowProfileUser;
