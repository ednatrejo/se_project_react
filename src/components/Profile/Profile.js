import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  clothingItems,
  onSelectCard,
  onCreateModal,
  handleEditProfileModal,
  onCardLike,
  isLoggedIn,
  handleLogout,
}) => {
  return (
    <div className="profile">
      <SideBar
        handleEditProfileModal={handleEditProfileModal}
        handleLogout={handleLogout}
      />
      <ClothesSection
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default Profile;
