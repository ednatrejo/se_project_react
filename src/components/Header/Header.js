import { useState } from "react";
import { parseWeatherData } from "../../utils/WeatherApi";
import "./Header.css";
import headerLogo from "../../images/HeaderLogo.svg";
import avatarImage from "../../images/avatar.svg";
import mobileCloseButton from "../../images/Mobile-Menu-Close-Button.svg";
import mobileNavButton from "../../images/Mobile-Nav-Button.svg";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../../images/logo.svg").default} alt="logo" />
        </div>
        <div>December 19, VA</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text" onClick={onCreateModal}>
            +Add New Clothes
          </button>
        </div>
        <div>Terrence Tegegne</div>
        <div>
          <img src={require("../../images/avatar.svg").default} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
