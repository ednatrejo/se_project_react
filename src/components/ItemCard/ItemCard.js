import React, { useEffect } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useContext } from "react";
import likeButton from "../../images/likeButton.svg";
import likeButtonActive from "../../images/likeButtonActive.svg";

const ItemCard = ({ item, onSelectCard, isLoggedIn, onCardLike }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((user) => user.includes(currentUser?._id));

  return (
    <div className="card">
      <div>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="card__image"
          onClick={() => onSelectCard(item)}
        />
      </div>

      <div className="card__header">
        <div className="card__name"> {item.name} </div>
        <div className="card__like-container">
          {isLoggedIn ? (
            <button
              onClick={() => onCardLike(item._id, isLiked)}
              className="card__like"
            >
              <img
                src={isLiked ? likeButtonActive : likeButton}
                alt="like button"
                className="card__like"
              />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
