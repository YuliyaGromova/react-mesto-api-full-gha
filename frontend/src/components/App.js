import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import { Navigate } from "react-router-dom";
import * as auth from "../Auth.js";
import { useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [page, setPage] = React.useState("");
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
    React.useState(false);
  const [answerReg, setAnswerReg] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [login, setLogin] = React.useState("");
  const [isOpenInfoUser, setIsOpenInfoUser] = React.useState(false);
  
  React.useEffect(()=>{
    checkToken();
  }, [])
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([
      //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then(([dataUserInfo, dataCards]) => {
        
        setCurrentUser(dataUserInfo);
        setCards(dataCards);
        setLogin(dataUserInfo.email);
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      });
    } 
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateCards(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(loggedIn)  {
    setLoggedIn(loggedIn);
  };

  // проверяем токен
  const navigate = useNavigate();

  const checkToken = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        auth.getContent(token).then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setLogin(res.data.email);
          }
        });
      }
    }
  };

  function openInfoUser(state) {
    setIsOpenInfoUser(state);
  }

  return (
    <div className="page">
      <Header page={page} login={login} onLogin={handleLogin} isOpenInfoUser={isOpenInfoUser} handleOpenInfo={openInfoUser}/>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          

          <Route path="/sign-up" element={<Register isOpenPage={setPage} onLogin={handleLogin} setAnswerReg={setAnswerReg} isOpenMessage={setInfoTooltipPopupOpen} handleOpenInfo={openInfoUser}/>} />
          <Route
            path="/sign-in"
            element={<Login isOpenPage={setPage} onLogin={handleLogin} setAnswerReg={setAnswerReg} isOpenMessage={setInfoTooltipPopupOpen} handleOpenInfo={openInfoUser} loginToHeader={setLogin}/>}
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                isOpenPage={setPage}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/mesto" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
      {page==="main" && <Footer />}
      {/* редактировать профиль */}
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* новое место */}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleUpdateCards}
        />

        {/* Обновить аватар */}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </CurrentUserContext.Provider>
      {/*Вы уверены? */}
      <PopupWithForm
        title="Вы уверены?"
        name="popupDeleteCard"
        nameButton="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>
      {/* большая картинка */}
      {selectedCard && (
        <ImagePopup isClose={closeAllPopups} card={selectedCard}></ImagePopup>
      )}
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        answerReg={answerReg}
      ></InfoTooltip>
    </div>
  );
}

export default App;
