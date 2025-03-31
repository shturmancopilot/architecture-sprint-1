import api from "../../../src/utils/api";
import React from "react";
import {CurrentUserContext} from "../../../src/contexts/CurrentUserContext";
import EditProfilePopup from "../components/EditProfilePopup";
import AddPlacePopup from "../../../posts-microfrontend/src/components/AddPlacePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";

export function ProfileSectionEntrypoint() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);

    const currentUser = React.useContext(CurrentUserContext);
    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
        api
            .getCardList()
            .then((cardData) => {
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }


    return <section className="profile page__section">
        <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
        <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
            <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
        />
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
        />
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
        />
    </section>
}
