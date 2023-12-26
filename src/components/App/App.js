import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/WeatherApi";

function App() {
  const weatherTemp = "70° F";
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
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscapeClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [activeModal]);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm
          title="New garment"
          onClose={handleCloseModal}
          setActiveModal={setActiveModal}
          // onKeyDown={handleEscapeClose}
        >
          <label className="modal__label">
            <input
              className="modal__input"
              type="text"
              name="name"
              placeholder="Name"
              minLength="2"
              maxLength="30"
            />
            <p className="modal__text">Name</p>
          </label>
          <label className="modal__label">
            <input
              className="modal__input"
              type="url"
              name="link"
              placeholder="Image URL"
              minLength="1"
              maxLength="30"
            />
            <p className="modal__text">Image</p>
          </label>
          <p className="modal__text">Select the weather type:</p>
          <div>
            <div>
              <label className="modal__temp-label">Hot</label>
              <input
                className="modal__radio-button"
                type="radio"
                id="hot"
                value="hot"
                name="weather"
              />
            </div>
            <div>
              <label className="modal__temp-label">Warm</label>
              <input
                className="modal__radio-button"
                type="radio"
                id="warm"
                value="warm"
                name="weather"
              />
            </div>
            <div>
              <label className="modal__temp-label">Cold</label>
              <input
                className="modal__radio-button"
                type="radio"
                id="cold"
                value="cold"
                name="weather"
              />
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
