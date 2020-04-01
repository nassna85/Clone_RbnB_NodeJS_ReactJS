import React, { useState, useEffect } from 'react';
import StarRatings from "react-star-ratings";
import {Link, Redirect} from "react-router-dom";
import AdsAPI from "../services/adsAPI";
import CommentsAPI from "../services/commentsAPI";
import OwnerCard from "../components/cards/OwnerCard";
import CommentCard from "../components/cards/CommentCard";
import Loader from "../components/loaders/Loader";
import {formatDate} from "../helpers/formatDate";

const ShowAd = ({ match }) => {
    const { id } = match.params;

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
    const [redirection, setRedirection] = useState(false);
    const [adLoading, setAdLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(true);



    const fetchAd = async id => {
        try{
            const data = await AdsAPI.findById(id);
            setAdLoading(false);
            const { title, coverImage, price, introduction, description, location, avgRatings, rooms, user } = data;
            setAd({ title, coverImage, price, introduction, description, location, avgRatings, rooms, user });
        }catch(error){
            setAdLoading(false);
            if(error.response.status === 404){
                setRedirection(true);
            }
            console.log(error.response);
        }
    };

    const fetchCommentsAd = async id => {
        try{
            const data = await CommentsAPI.findCommentsByAd(id);
            setCommentLoading(false);
            setCommentsAd(data);
        }catch(error) {
            setCommentLoading(false);
            if(error.response.status === 404){
                console.log("Redirect to page 404");
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

    if(redirection) {
        return <Redirect to="/404"/>
    }

    return (
        <>
            <section id="show-ad-information">
                <div className="container">
                    {!adLoading && <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img src={ ad.coverImage } alt={ ad.title } className="img-fluid"/>
                        </div>
                        <div className="col-lg-6">
                            <h1 className="h3">{ ad.title }</h1>
                            <StarRatings
                                starDimension="20px"
                                starSpacing="3px"
                                starRatedColor="red"
                                numberOfStars={5}
                                rating={+ad.avgRatings}
                            />
                            <p className="my-3">{ ad.introduction }</p>
                            <span className="badge badge-primary mb-3">{ ad.location }</span>
                            <span className="d-block price">{ parseFloat(ad.price).toFixed(2) } €</span>
                        </div>
                    </div>}
                    {adLoading && <Loader marginTop="100px" size="60px" color="danger" align="mx-auto" />}
                </div>
            </section>

            <div className="divider-section"></div>

            <section id="show-ad-description">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>Description</h2>
                            { ad.description }
                        </div>
                        <div className="col-lg-6">
                            <h2>Propriétaire</h2>
                            <OwnerCard
                                avatar={ ad.user.avatar }
                                lastName={ ad.user.lastName }
                                firstName={ ad.user.firstName }
                                introduction={ ad.user.introduction }
                                id={ ad.user.id }
                            />
                            <Link to={"/proprietaires/" + ad.user.id+ "/information"} className="btn btn-primary mt-3">
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

                    {
                        commentsAd.length ?<div className="row">
                            <div className="col-md-8">
                                {commentsAd.map(comment => (
                                    <CommentCard
                                        key={ comment.id }
                                        lastName={ comment.user.lastName }
                                        content={ comment.message }
                                        createdAt={ formatDate(comment.createdAt) }
                                        avatar={ comment.user.avatar }
                                        rating={ comment.rating }
                                    />
                                ))}
                            </div>
                        </div> :
                        <h4 className="h5 text-primary">Pas de commentaires pour cette annonce</h4>
                    }

                    {commentLoading && <Loader color="danger" size="60px" align="mr-auto" />}
                </div>
            </section>

            <div className="container">
                <p className="">Une pagination ici</p>
            </div>

            <div className="divider-section"></div>

            <section id="show-ad-send-comment">
                <div className="container">
                    <h2>Envoyer un commentaire</h2>
                </div>
            </section>
        </>
    );
};

export default ShowAd;
