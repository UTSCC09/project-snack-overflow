import React from 'react';
import './card.css';

const Card = ({ img, title, desc }) => {
    return (
        <div className="card-container">
            <div className="card-header">
                <div className="card-image-container">
                    <img className="card-image" src={img} alt={title} />
                </div>
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">{desc}</div>
        </div>
    );
};

export default Card;