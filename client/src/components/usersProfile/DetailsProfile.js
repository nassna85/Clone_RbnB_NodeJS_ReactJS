import React from 'react';

const DetailsProfile = ({ introduction, description }) => {
    return (
        <section id="details-show-user-profile">
            <div className="container">
                <p className="introduction text-center">
                    { introduction }
                </p>
                <h2>Description</h2>
                <p className="description">
                    { description }
                </p>

            </div>
        </section>
    );
};

export default DetailsProfile;
