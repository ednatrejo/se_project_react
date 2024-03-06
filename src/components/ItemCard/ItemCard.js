import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  //Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes.some((id) => id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = `...`;

  return (
    <div className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onSelectCard(item)}
      />
      <div className="card__name"> {item.name} </div>

      <button
        onClick={() => onCardLike(item._id, isLiked)}
        className="card__like"
      >
        {" "}
      </button>
    </div>
  );
};

export default ItemCard;
