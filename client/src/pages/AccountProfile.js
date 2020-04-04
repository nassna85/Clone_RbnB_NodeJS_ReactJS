import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HeaderProfile from "../components/usersProfile/HeaderProfile";
import Field from "../components/forms/Field";
import UsersAPI from "../services/usersAPI";
import AdsAPI from "../services/adsAPI";
import TextArea from "../components/forms/TextArea";

const AccountProfile = ({ match, history }) => {
  const { id } = match.params;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    introduction: "",
    description: "",
    avatar: "",
    createdAt: ""
  });
  const [adsByUser, setAdsByuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    introduction: "",
    description: "",
    avatar: ""
  });
  const fetchUser = async id => {
    try {
      const data = await UsersAPI.find(id);
      const {
        firstName,
        lastName,
        email,
        introduction,
        description,
        avatar,
        createdAt
      } = data;
      setUser({
        firstName,
        lastName,
        email,
        introduction,
        description,
        avatar,
        createdAt
      });
    } catch (error) {
      if (error.response.status === 403) {
        toast.error("Vous n'avez pas accès à cette ressource !");
        return history.push("/403");
      } else if (error.response.status === 404) {
        toast.error("Aucun utilisateur n'a été trouvé !");
        return history.push("/404");
      } else {
        console.log(error.response);
        toast.error("Une erreur est survenue...");
      }
    }
  };

  const fetchAdsByUser = async id => {
    try {
      const data = await AdsAPI.findAllByUser(id);
      setAdsByuser(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = event => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await UsersAPI.update(user, id);
      setLoading(false);
      toast.success("Votre compte a bien été modifié");
      return history.push("/mon-profil/" + id);
    } catch (error) {
      setLoading(false);
      const { errors } = error.response.data;
      if (errors) {
        const errorsAPI = {};
        errors.forEach(error => {
          errorsAPI[error.param] = error.msg;
        });
        setErrors(errorsAPI);
      }
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchUser(id);
    fetchAdsByUser(id);
  }, [id]);

  return (
    <>
      <HeaderProfile
        avatar={user.avatar}
        firstName={user.firstName}
        lastName={user.lastname}
        createdAt={user.createdAt}
        ads={adsByUser}
        background="#8c468d"
      />

      <div className="divider-section"></div>

      <section id="form-edit-profile">
        <div className="container">
          <form className="bg-light p-4 mx-auto" onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">
              Un changement {user.firstName} ?
            </h3>
            <Field
              name="firstName"
              value={user.firstName}
              placeholder="Votre Prénom"
              error={errors.firstName}
              onChange={handleChange}
            />
            <Field
              name="lastName"
              value={user.lastName}
              placeholder="Votre Nom"
              error={errors.lastName}
              onChange={handleChange}
            />
            <Field
              name="email"
              value={user.email}
              placeholder="Votre Email"
              error={errors.email}
              onChange={handleChange}
            />
            <Field
              name="introduction"
              value={user.introduction}
              placeholder="Votre Introduction"
              error={errors.introduction}
              onChange={handleChange}
            />
            <Field
              name="avatar"
              value={user.avatar}
              placeholder="Votre Avatar"
              error={errors.avatar}
              onChange={handleChange}
            />
            <TextArea
              name="description"
              value={user.description}
              placeholder="Votre Description"
              error={errors.description}
              onChange={handleChange}
            />
            <div className="form-group">
              <button
                className={"btn btn-danger" + (loading ? " py-2 px-5" : "")}
              >
                {loading ? (
                  <i className="fas fa-spinner fa-pulse"></i>
                ) : (
                  "Je m'inscris"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AccountProfile;
