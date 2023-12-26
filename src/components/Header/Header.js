import "./Header.css";
import avatar from "../../images/avatar.svg";
import logo from "../../images/logo.svg";
import { parseWeatherData } from "../../utils/WeatherApi";

const Header = ({ weatherData, onCreateModal }) => {
  console.log("Header");

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src={logo} alt="logo" />
          </div>

          <div>
            {currentDate}, {weatherData?.city}
          </div>
        </div>

        <div className="header__avatar-logo">
          <div>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add clothes
            </button>
          </div>
          <div className="header__name">Terrence Tegegne</div>
          <div>
            <img src={avatar} alt="avatar" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
