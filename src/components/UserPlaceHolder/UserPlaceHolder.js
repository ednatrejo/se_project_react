import React from "react";
import "./UserPlaceHolder.css";

const UserPlaceHolder = ({ userName }) => {
  const firstLetter = userName ? userName[0].toUpperCase() : "";

  return (
    <div className="user__placeholder">
      <div className="placeholder__circle">{firstLetter}</div>
    </div>
  );
};

export default UserPlaceHolder;
