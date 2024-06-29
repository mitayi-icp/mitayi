import React from 'react';
import './Card.css';

const Card = ({ title, content, path }) => {
  return (
    <div className="card">
        <img src={path} alt="" />
      <h3 className="card__title">{title}</h3>
      <p className="card__content">{content}</p>
      <h4 className='shine'>click to play !</h4>
    </div>
  );
};

export default Card;
