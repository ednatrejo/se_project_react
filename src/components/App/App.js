import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/WeatherApi";

function App() {
  //const weatherTemp = "100; F";
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
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      setTemp(temperature);
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
            <p className="modal__text">Name</p>
            <input
              className="modal__input"
              type="text"
              name="name"
              placeholder="Name"
              minLength="2"
              maxLength="30"
            />
          </label>
          <label className="modal__label">
            <p className="modal__text">Image</p>
            <input
              className="modal__input"
              type="url"
              name="link"
              placeholder="Image URL"
              minLength="1"
              maxLength="30"
            />
          </label>
          <p className="modal__text">Select the weather type:</p>
          <div>
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="hot"
                value="hot"
              />
              <label className="modal__temp-label">Hot</label>
            </div>
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="warm"
                value="warm"
              />
              <label className="modal__temp-label">Warm</label>
            </div>
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="cold"
                value="cold"
              />
              <label className="modal__temp-label">Cold</label>
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
