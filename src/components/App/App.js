import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { useEffect, useState } from "react";
import {
  getForecastWeather,
  parseWeatherData,
} from "../../utils/WeatherApi.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import {
  getItems,
  addItems,
  deleteItems,
  updateProfile,
} from "../../utils/api";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  //States
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [weatherId, setWeatherId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  //Handling active modals
  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleRegisterModal = () => {
    setActiveModal("registerModal");
  };

  const handleLoginModal = () => {
    setActiveModal("loginModal");
  };

  const handleEditProfileModal = () => {
    setActiveModal("profileModal");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  //universal handle for handling any submit
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const makeRequest = () => {
      return addItems({ name, imageUrl, weather }).then((res) => {
        setClothingItems([res.data, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleOpenConfirmModal = () => {
    setActiveModal("delete");
  };

  //Callback function to delete item
  const handleDeleteItem = () => {
    setIsLoading(true);
    setDeleteCard(true);
    deleteItems(selectedCard._id)
      .then(() => {
        const filteredCards = clothingItems.filter((card) => {
          return card._id !== selectedCard._id;
        });

        setClothingItems(filteredCards);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDeleteCard(false);
        setIsLoading(false);
        // handleSubmit();
      });
  };

  //Callback function to register new user
  function handleRegistration({ email, password, name, avatar }) {
    setIsLoading(true);
    auth
      .registration(email, password, name, avatar)
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        handleCloseModal();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Callback function to log in user
  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .authorization(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          auth.checkToken(res.token).then((data) => {
            setCurrentUser(data.data);
            setIsLoggedIn(true);
          });
        }
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Login failed", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //Callback function to edit profile
  function handleEditProfile({ name, avatar }) {
    function makeRequest() {
      return updateProfile(name, avatar).then(({ data }) => {
        setCurrentUser(data);
        return data;
      });
    }
    handleSubmit(makeRequest);
  }

  // const handleEditProfile = ({ name, avatar }) => {
  //   console.log(name, avatar);
  //   updateProfile(name, avatar);
  //   setIsLoading(true)
  //     .then(({ data }) => {
  //       setCurrentUser(data);
  //       handleCloseModal();
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  //Checking for token

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      setIsLoggedInLoading(true);
      setIsLoading(true);

      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error("Error checking token:", error);
        })
        .finally(() => {
          setIsLoggedInLoading(false);
          setIsLoading(false);
        });
    } else {
      setIsLoggedInLoading(false);
      setIsLoading(false);
    }
  }, []);

  //Set clothing item according to weather type
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        console.log("weatherdata", data);
        const weatherData = parseWeatherData(data);
        console.log("parsedweather", weatherData);
        const currentWeatherId = data.weather[0].id;

        console.log("currentWeatherId", currentWeatherId);
        setTemp(weatherData);
        setWeatherId(currentWeatherId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((cards) => {
        setClothingItems(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") handleCloseModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  //Callback to like a card
  const handleCardLike = (id, isLiked) => {
    !isLiked
      ? api
          .addCardLike(id)
          .then(({ data }) => {
            console.log(clothingItems, data);
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? data : c))
            );
            // setIsLiked(true);
          })

          .catch((error) => {
            console.log(error);
          })
      : api
          .removeCardLike(id)
          .then(({ data }) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? data : c))
            );
            // setIsLiked(false);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  //callback for logging a user out
  const history = useHistory("");
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    history.push("/");
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onCreateModal={handleCreateModal}
            weatherData={temp}
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
            onSelectCard={handleSelectedCard}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                isLoggedIn={isLoggedIn}
                onCardLike={handleCardLike}
                weatherId={weatherId}
              />
            </Route>

            <Profile
              onCreateModal={handleCreateModal}
              clothingItems={clothingItems}
              onSelectCard={handleSelectedCard}
              handleEditProfileModal={handleEditProfileModal}
              isLoggedIn={isLoggedIn}
              onCardLike={handleCardLike}
              handleLogout={handleLogout}
            />
          </Switch>
          <Footer />

          {activeModal === "profileModal" && (
            <EditProfileModal
              isOpen={activeModal === "create"}
              onClose={handleCloseModal}
              onSubmit={handleEditProfile}
            />
          )}

          {activeModal === "registerModal" && (
            <RegisterModal
              isOpen={activeModal === "create"}
              onClose={handleCloseModal}
              handleLoginModal={handleLoginModal}
              handleCreateModal={handleCreateModal}
              onSubmit={handleRegistration}
            />
          )}
          {activeModal === "loginModal" && (
            <LoginModal
              isOpen={activeModal === "create"}
              onClose={handleCloseModal}
              handleRegisterModal={handleRegisterModal}
              onSubmit={handleLogin}
            />
          )}
          {activeModal === "create" && (
            <AddItemModal
              onClose={handleCloseModal}
              isOpen={activeModal === "create"}
              onAddItem={handleAddItemSubmit}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDelete={handleOpenConfirmModal}
              handleOpenConfirmModal={handleOpenConfirmModal}
            />
          )}
          {activeModal === "delete" && (
            <DeleteConfirmModal
              handleDeleteItem={handleDeleteItem}
              handleCloseModal={handleCloseModal}
              selectedCard={selectedCard}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
