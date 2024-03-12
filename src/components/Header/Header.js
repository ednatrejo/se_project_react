import { useState } from "react";
import { parseWeatherData } from "../../utils/WeatherApi";
import "./Header.css";
import headerLogo from "../../images/HeaderLogo.svg";
import avatarImage from "../../images/avatar.svg";
import mobileCloseButton from "../../images/Mobile-Menu-Close-Button.svg";
import mobileNavButton from "../../images/Mobile-Nav-Button.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
  weatherData,
  onCreateModal,
  isLoggedIn,
  handleRegisterModal,
  handleLoginModal,
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  const { currentUser } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <div className="header__logo-container">
        <div>
          <Link to="/">
            <img className="header__logo" src={headerLogo} alt="Header Logo" />
          </Link>
        </div>

        <div>
          {currentDate}, {weatherData.city}
        </div>
      </div>
      <div className="header__nav">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>

            <Link className="header__username" to="/profile">
              {currentUser?.name}
            </Link>

            <img
              className="header__avatar-logo"
              src={currentUser?.avatar}
              alt="Profile Image"
            />
          </>
        ) : (
          <>
            <button className="header__buttons" onClick={handleRegisterModal}>
              Sign Up
            </button>
            <button className="header__buttons" onClick={handleLoginModal}>
              Log In
            </button>
          </>
        )}
      </div>

      <div
        className={`navigation-container ${
          isMobileMenuOpened ? "mobile-menu-opened" : ""
        }`}
      >
        <button onClick={toggleMobileMenu} className="menu-button">
          {isMobileMenuOpened ? (
            <img
              className="mobile__close-button"
              src={mobileCloseButton}
              alt="Close"
            />
          ) : (
            <img
              className="mobile__nav-button"
              src={mobileNavButton}
              alt="Menu"
            />
          )}
        </button>
        {isMobileMenuOpened && (
          <div className="mobile__menu">
            <div>
              <div className="mobile__avatar-container">
                <div>{currentUser?.name}</div>
                <img
                  className="mobile__avatar-logo"
                  src={currentUser?.avatar}
                  alt="Avatar Logo"
                />
              </div>
              <button
                className="mobile__header__button"
                type="text"
                onClick={onCreateModal}
              >
                + Add Clothes
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
