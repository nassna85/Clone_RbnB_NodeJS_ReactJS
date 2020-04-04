import React, { useState, useEffect, useContext } from "react";
import StarRatings from "react-star-ratings";
import { Link, Redirect } from "react-router-dom";
import AdsAPI from "../services/adsAPI";
import CommentsAPI from "../services/commentsAPI";
import AuthContext from "../contexts/AuthContext";
import OwnerCard from "../components/cards/OwnerCard";
import CommentCard from "../components/cards/CommentCard";
import Loader from "../components/loaders/Loader";
import { formatDate } from "../helpers/formatDate";
import TextArea from "../components/forms/TextArea";
import { toast } from "react-toastify";

const ShowAd = ({ match, history }) => {
  const { id } = match.params;

  const { isAuthenticated } = useContext(AuthContext);

  const [ad, setAd] = useState({
    title: "",
    coverImage: "",
    price: "",
    introduction: "",
    description: "",
    location: "",
    avgRatings: "",
    rooms: "",
    user: {}
  });
  const [commentsAd, setCommentsAd] = useState([]);
  const [sendComment, setSendComment] = useState({
    rating: 0,
    message: ""
  });
  const [errors, setErrors] = useState({
    rating: "",
    message: ""
  });
  const [redirection, setRedirection] = useState(false);
  const [adLoading, setAdLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [sendCommentLoading, setSendCommentLoading] = useState(false);

  const fetchAd = async id => {
    try {
      const data = await AdsAPI.findById(id);
      setAdLoading(false);
      const {
        title,
        coverImage,
        price,
        introduction,
        description,
        location,
        avgRatings,
        rooms,
        user
      } = data;
      setAd({
        title,
        coverImage,
        price,
        introduction,
        description,
        location,
        avgRatings,
        rooms,
        user
      });
    } catch (error) {
      setAdLoading(false);
      if (error.response.status === 404) {
        setRedirection(true);
      }
      console.log(error.response);
    }
  };

  const fetchCommentsAd = async id => {
    try {
      const data = await CommentsAPI.findCommentsByAd(id);
      setCommentLoading(false);
      setCommentsAd(data);
    } catch (error) {
      setCommentLoading(false);
      if (error.response.status === 404) {
        console.log("Redirect to page 404");
      }
      console.log(error.response);
    }
  };

  const handleChangeRating = newRating => {
    setSendComment({ ...sendComment, rating: newRating });
  };

  const handleChangeComment = event => {
    setSendComment({ ...sendComment, message: event.target.value });
  };

  const handleCommentSubmit = async event => {
    event.preventDefault();
    setSendCommentLoading(true);
    try {
      await CommentsAPI.create(sendComment, id);
      setErrors({});
      setSendCommentLoading(false);
      toast.success("Votre commentaire a bien été publié");
      fetchCommentsAd(id);
    } catch (error) {
      setSendCommentLoading(false);
      if (error.response.status === 401) {
        toast.error("Vous devez être connecté pour accéder à ce service");
        history.push("/connexion");
      } else if (error.response.status === 403) {
        toast.error("Vous n'êtes pas autorisé à accéder à ce service");
        history.push("/");
      } else {
        const { errors } = error.response.data;
        if (errors) {
          const apiErrors = {};
          errors.forEach(error => {
            apiErrors[error.param] = error.msg;
          });
          setErrors(apiErrors);
        }
      }
      console.log(error.response);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAd(id);
  }, [id]);

  useEffect(() => {
    fetchCommentsAd(id);
  }, [id]);

  if (redirection) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <section id="show-ad-information">
        <div className="container">
          {!adLoading && (
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img src={ad.coverImage} alt={ad.title} className="img-fluid" />
              </div>
              <div className="col-lg-6">
                <h1 className="h3">{ad.title}</h1>
                <StarRatings
                  starDimension="20px"
                  starSpacing="3px"
                  starRatedColor="red"
                  numberOfStars={5}
                  rating={+ad.avgRatings}
                />
                <p className="rating-desc">
                  (Note basée sur {commentsAd.length} commentaire(s))
                </p>
                <p className="my-3">{ad.introduction}</p>
                <span className="badge badge-primary mb-3">{ad.location}</span>
                <span className="d-block price">
                  {parseFloat(ad.price).toFixed(2)} €
                </span>
                <Link to="/" className="btn btn-danger mt-3">
                  Réserver
                </Link>
              </div>
            </div>
          )}
          {adLoading && (
            <Loader
              marginTop="100px"
              size="60px"
              color="danger"
              align="mx-auto"
            />
          )}
        </div>
      </section>

      <div className="divider-section"></div>

      <section id="show-ad-description">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>Description</h2>
              {ad.description}
            </div>
            <div className="col-lg-6">
              <h2>Propriétaire</h2>
              <OwnerCard
                avatar={ad.user.avatar}
                lastName={ad.user.lastName}
                firstName={ad.user.firstName}
                introduction={ad.user.introduction}
                id={ad.user.id}
              />
              <Link
                to={"/proprietaires/" + ad.user.id + "/information"}
                className="btn btn-primary mt-3"
              >
                Contactez moi
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-section"></div>

      <section id="show-ad-comments">
        <div className="container">
          <h2>Les commentaires</h2>

          {commentsAd.length ? (
            <div className="row">
              <div className="col-md-8">
                {commentsAd.map(comment => (
                  <CommentCard
                    key={comment.id}
                    lastName={comment.user.lastName}
                    content={comment.message}
                    createdAt={formatDate(comment.createdAt)}
                    avatar={comment.user.avatar}
                    rating={comment.rating}
                  />
                ))}
              </div>
            </div>
          ) : (
            <h4 className="h5 text-primary">
              Pas de commentaires pour cette annonce
            </h4>
          )}

          {commentLoading && (
            <Loader color="danger" size="60px" align="mr-auto" />
          )}
        </div>
      </section>

      <div className="container">
        <p className="">Une pagination ici</p>
      </div>

      <div className="divider-section"></div>

      <section id="show-ad-send-comment">
        <div className="container">
          <h2>Envoyer un commentaire</h2>
          {isAuthenticated ? (
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleCommentSubmit}>
                  <StarRatings
                    starDimension="25px"
                    starSpacing="3px"
                    starRatedColor="red"
                    changeRating={handleChangeRating}
                    numberOfStars={5}
                    name="rating"
                    rating={sendComment.rating}
                  />
                  <TextArea
                    marginTop="30px"
                    name="message"
                    placeholder="Votre commentaire..."
                    value={sendComment.message}
                    onChange={handleChangeComment}
                    error={errors.message}
                  />
                  <button
                    className={
                      "btn btn-danger" +
                      (sendCommentLoading ? " py-2 px-5" : "")
                    }
                  >
                    {sendCommentLoading ? (
                      <i className="fas fa-spinner fa-pulse"></i>
                    ) : (
                      "Envoyer"
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <h3>Vous devez être connecté pour envoyer un message</h3>
          )}
        </div>
      </section>
    </>
  );
};

export default ShowAd;
