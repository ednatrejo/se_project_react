import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <img
        src={item.link}
        alt={item.name}
        className="card__image"
        onClick={() => onSelectCard(item)}
      />
      <div className="card__name"> {item.name} </div>
    </div>
  );
};

export default ItemCard;
