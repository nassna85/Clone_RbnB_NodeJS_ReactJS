import React from "react";
import { formatDate } from "../../helpers/formatDate";
import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
    return (
        <div className="col-md-8">
            <div className="card-booking">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <Link
                            to={
                                "/annonces/" + booking.ad.slug + "/" + booking.ad.id
                            }
                        >
                            <img
                                src={booking.ad.coverImage}
                                alt={booking.ad.title}
                                className="img-fluid"
                            />
                        </Link>
                    </div>
                    <div className="col-md-8">
                        <h4>{booking.ad.title}</h4>
                        <p className="text-primary font-weight-bold">
                            {booking.ad.price} € / nuit
                        </p>
                        <p>
                            <i className="fas fa-calendar-alt mr-2"></i> du{" "}
                            {formatDate(booking.startDate)} au {formatDate(booking.endDate)}
                        </p>
                        <p>
                            <i className="fas fa-money-check-alt mr-2"></i>{" "}
                            <span className="text-danger">{booking.amount} €</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;