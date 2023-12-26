// import logo from "../../logo.svg";

import "./App.css";

import Header from "../Header/Header";

import Main from "../Main/Main";

import Footer from "../Footer/Footer";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

import ItemModal from "../ItemModal/ItemModal";

import { getForecastWeather, parseWeatherData } from "../../utils/WeatherApi";

import { useEffect, useState } from "react";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  const [temp, setTemp] = useState(0);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");

    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);

        setTemp(temperature);
      })

      .catch(console.error);
  }, []);

  const handleClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      setActiveModal("");
    }
  };

  // const handleKeydown = (evt) => {

  //   if (evt.key === "Escape" && activeModal !== "") {

  //     setActiveModal("");

  //   }

  // };

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.key === "Escape" && activeModal !== "") {
        setActiveModal("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />

      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />

      <Footer />

      {activeModal === "create" && (
        <ModalWithForm
          title="New Garment"
          onClose={handleCloseModal}
          handleClick={handleClick}
        >
          <label className="modal__name-input">
            Name
            <input
              type="text"
              name="name"
              minlenth="1"
              maxLength="30"
              placeholder="Name"
              className="modal__name-submit"
            />
          </label>

          <label className="modal__image-input">
            Image
            <input
              type="url"
              name="link"
              minlenth="1"
              placeholder="Image URL"
              className="modal__image-submit"
            />
          </label>

          <p className="weather__text">Select the weather type:</p>

          <div>
            <div className="radio__input">
              <input
                type="radio"
                id="hot"
                value="hot"
                className="radio__button"
                name="weather-radio-button"
              />

              <label htmlFor="hot">Hot</label>
            </div>

            <div className="radio__input">
              <input
                type="radio"
                id="warm"
                value="warm"
                name="weather-radio-button"
                className="radio__button"
              />

              <label htmlFor="warm">Warm</label>
            </div>

            <div className="radio__input">
              <input
                type="radio"
                id="cold"
                value="cold"
                name="weather-radio-button"
                className="radio__button"
              />

              <label htmlFor="cold">Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}

      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default App;
