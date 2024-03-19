import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useState, useEffect, useContext, createContext } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather } from "../../utils/WeatherApi";
import { parseWeatherData } from "../../utils/WeatherApi";
import { parseLocation } from "../../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { checkToken } from "../../utils/auth";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  const history = useHistory();
  const AuthContext = createContext();

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleSignupModal = () => {
    setActiveModal("signup");
  };

  const handleSignUp = (user) => {
    auth
      .registration(user)
      .then((newUser) => {
        setLoggedIn(true);
        setCurrentUser(newUser.data);
        handleCloseModal();
        console.log(newUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleLogIn = (user) => {
    auth
      .authorize(user)
      .then((res) => {
        console.log("Server Response:", res);
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setCurrentUser(res);
        handleCloseModal();
        history.push("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    console.log(localStorage.getItem("jwt"));
    setLoggedIn(false);
    setCurrentUser({});
    history.push("/");
  };

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
            setLoggedIn(true);
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
  }, [loggedIn]);

  const handleEditProfileModal = () => {
    setActiveModal("changeUserProfile");
  };

  const handleUpdateUser = ({ name, avatar }) => {
    return auth
      .updateUser({ name, avatar }, token)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        return updatedUserData;
      })
      .then((updatedUserData) => {
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const city = parseLocation(data);

        setTemp(temperature);
        setLocation(city);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const handleAddItemSubmit = ({ name, link, weatherType }) => {
    const item = {
      _id: null,
      name,
      link,
      weather: weatherType,
      owner: currentUser?._id,
    };

    addItem({ ...item, token })
      .then((res) => {
        const newItem = { ...item, _id: res.data._id };
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (_id) => {
    removeItem(_id, token)
      .then(() => {
        const filteredCards = clothingItems.filter((card) => card._id !== _id);
        setClothingItems(filteredCards);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleCardLike = (id, currentLikeStatus) => {
    if (!currentLikeStatus) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard.data : c))
          );
          setIsLiked(true);
        })
        .catch((err) => {
          console.log("Error liking card:", err);
          setIsLiked(false);
        });
    } else {
      removeCardLike(id.toString(), token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard.data : c))
          );
          setIsLiked(false);
        })
        .catch((error) => {
          console.log("Error unliking card:", error);
          setIsLiked(true);
        });
    }
  };

  const onCardLike = (_id, currentLikeStatus) => {
    handleCardLike(_id, currentLikeStatus);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, currentUser, setCurrentUser }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider
          value={{ currentUser, loggedIn, isLoggedInLoading }}
        >
          <Header
            onCreateModal={handleCreateModal}
            onSubmit={handleSignupModal}
            onLogin={handleLoginModal}
            temp={temp}
            setLocation={location}
            loggedIn={loggedIn}
            currentUser={currentUser}
          />

          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                onCardLike={onCardLike}
              />
            </Route>

            <Route path="/signup">
              <RegisterModal
                onClose={handleCloseModal}
                handleUserSubmit={handleSignUp}
                onSubmit={handleSignupModal}
                isOpen={activeModal === "signup"}
              />
            </Route>
            <Route path="/login"></Route>
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              isLoggedInLoading={isLoggedInLoading}
            >
              <Profile
                onSelectCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                clothingItems={clothingItems}
                onEditProfile={handleEditProfileModal}
                handleUpdateUser={handleUpdateUser}
                loggedIn={loggedIn}
                onCardLike={onCardLike}
                handleSignout={handleSignout}
              />
            </ProtectedRoute>
          </Switch>
          <Footer />
          {activeModal === "login" && (
            <LoginModal
              onClose={handleCloseModal}
              handleUserLogin={handleLogIn}
              isOpen={activeModal === "login"}
              onSubmit={handleSignupModal}
            />
          )}

          {activeModal === "signup" && (
            <RegisterModal
              onClose={handleCloseModal}
              handleUserSubmit={handleSignUp}
              isOpen={activeModal === "signup"}
              onLogin={handleLoginModal}
            />
          )}

          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              handleAddItemSubmit={handleAddItemSubmit}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectCard}
              onClose={handleCloseModal}
              handleDelete={handleDeleteItem}
            />
          )}
          {activeModal === "changeUserProfile" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "changeUserProfile"}
              handleSaveProfile={handleUpdateUser}
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
