import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import {settings, formPopupAddCard, openPopupAddCardButton, elements, formPopupEdit, openPopupEditProfileButton,
  selectorPopupViewCard, selectorPopupAddCard, selectorPopupEditProfile, imgUrl, imgName, selectorPopupDeleteCard, buttonEditAvatar,
  selectorPopupEditAvatar, formPopupAvatar} from "../utils/constants.js";

let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'd88185d7-a57f-426c-977a-fbfd58d99413',
    "Content-Type": "application/json"
  }
});

function createCard(name, link, likes, ownerId, cardId) {
  const card = new Card(
    name,
    link,
    likes.length,
    '#template',
    () => imgPopup.open({name, link}),
    ownerId,
    () => {
      if (!card.isLiked()) {
        api.likeCard(cardId)
          .then((res) => {
            card.likeCard();
            card.setLikesCount(res.likes.length);
          })
          .catch(err => console.log(err));
      } else {
        api.deleteLikeCard(cardId)
          .then((res) => {
            card.deleteLikeCard();
            card.setLikesCount(res.likes.length);
          })
          .catch(err => console.log(err));
      }
    },
    () => {
      popupDeleteCard.open(() => {
        api.deleteCard(cardId)
          .then(() => {
            card._deleteCard();
            popupDeleteCard.close()
          })
          .catch(err => console.log(err));
      });
    }
  );

  const cardElement = card.generateCard(userId);

  if (card.isLikedByMe(likes)) {
    api.likeCard(cardId)
      .then(() => {
        card.likeCard();
      })
      .catch(err => console.log(err));
  }

  return cardElement;
}

// ================== получаем с сервера данные о пользователе и добавляем их на сайт ============================================
const userInfo = new UserInfo({
  nameUserSelector: ".profile__title",
  workUserSelector: ".profile__subtitle",
  avatarUserSelector: ".profile__avatar"
});

// =================== получаем карточки с сервера и добавляем на стр ============================================
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item.name, item.link, item.likes, item.owner._id, item._id);
    cardList.addItem(card);
  }
}, elements);

api.getUserInfoAndInitialCards()
  .then(([cards, userData]) => {
    const user = {
      nameUser: userData.name,
      workUser: userData.about,
      avatar: userData.avatar,
      _id: userData._id,
      cohort: userData.cohort
    }
    userInfo.setUserInfo(user);
    userId = userData._id;
    userInfo.setUserAvatar(user);


    cardList.renderItems(cards);
  })
  .catch(err => console.log(err));

// =========================== открытие и закрытие попапа с карточкой ============================================
const imgPopup = new PopupWithImage(selectorPopupViewCard, imgUrl, imgName);

imgPopup.setEventListeners();

// =========================== popup add card ============================================
const popupWithAddCardForm = new PopupWithForm(selectorPopupAddCard, (formValues) => {
  popupWithAddCardForm.loading(true);
  api.addCard(formValues)
    .then((res) => {
      const card = createCard(res.name, res.link, res.likes, res.owner._id, res._id);
      cardList.addItem(card);
      popupWithAddCardForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithAddCardForm.loading(false);
    });
});

popupWithAddCardForm.setEventListeners();

openPopupAddCardButton.addEventListener('click', function () {
  validatorCardForm.resetValidation();
  popupWithAddCardForm.open();
});

// ========================== popup delete card =========================================
const popupDeleteCard = new PopupWithConfirm(selectorPopupDeleteCard);
popupDeleteCard.setEventListeners();

// ========================== popup edit profile =========================================
const popupEditProfileForm = new PopupWithForm(selectorPopupEditProfile,
  (formValues) => {
  popupEditProfileForm.loading(true);
  api.saveUserInfo(formValues)
    .then(() => {
      userInfo.setUserInfo(formValues);
      popupEditProfileForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupEditProfileForm.loading(false);
    });
});

popupEditProfileForm.setEventListeners();

openPopupEditProfileButton.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  popupEditProfileForm.setInputValues(userData);
  validatorProfileForm.resetValidation();
  popupEditProfileForm.open();
});

// ========================== popup edit profile avatar =========================================
const popupEditAvatar = new PopupWithForm(selectorPopupEditAvatar, (formValue) => {
  popupEditAvatar.loading(true);
  api.editAvatar(formValue)
    .then(() => {
      userInfo.setUserAvatar(formValue);
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupEditAvatar.loading(false);
    });
});

popupEditAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', function () {
  validatorAvatarForm.resetValidation();
  popupEditAvatar.open();
})

// =============== экземпляры класса FormValidator и валидация форм ===========================
const validatorCardForm = new FormValidator(settings, formPopupAddCard);
const validatorProfileForm = new FormValidator(settings, formPopupEdit);
const validatorAvatarForm = new FormValidator(settings, formPopupAvatar);

validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();
validatorAvatarForm.enableValidation();

