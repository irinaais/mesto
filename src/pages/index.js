import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  initialCards,
  settings,
  formPopupAddCard,
  openPopupAddCardButton,
  elements,
  formPopupEdit,
  openPopupEditProfileButton,
  nameUserInput,
  workUserInput,
  selectorPopupViewCard,
  selectorPopupAddCard,
  selectorPopupEditProfile,
  imgUrl,
  imgName,
} from "../utils/constants.js";

// let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'd88185d7-a57f-426c-977a-fbfd58d99413',
    "Content-Type": "application/json"
  }
});

api.getUserInfo()
  .then((res) => {
    const userData = {
      nameUser: res.name,
      workUser: res.about,
      avatar: res.avatar,
      _id: res._id,
      cohort: res.cohort
    }
    userInfo.setUserInfo(userData);
    // userId  = user._id
    // userInfo.setUserAvatar(user.avatar);
  })
// const cards = api.getInitialCards();
// cards.then((data) => {
//   const defaultCardList = new Section({
//     items: initialCards,
//     renderer: (data) => {
//       const card = createCard(data.name, data.link);
//       defaultCardList.addItem(card);
//     }
//   }, elements);
//
//   defaultCardList.renderItems();
// })
//   .catch(err => console.log(err));

const imgPopup = new PopupWithImage(selectorPopupViewCard, imgUrl, imgName);
const userInfo = new UserInfo({nameUserSelector: ".profile__title", workUserSelector: ".profile__subtitle"});

function createCard(name, link) {
  const card = new Card(name, link, '#template', () => imgPopup.open({name, link})
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// =========================== открытие и закрытие попапа с карточкой ============================================
imgPopup.setEventListeners();

// =========================== создание карточек из массива ============================================
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link);
    defaultCardList.addItem(card);
  }
}, elements);

defaultCardList.renderItems();

// =========================== popup add card ============================================
const popupWithAddCardForm = new PopupWithForm(selectorPopupAddCard, (formValues) => {
  const card = createCard(formValues.name, formValues.link);
  defaultCardList.addItem(card);
  popupWithAddCardForm.close();
});

popupWithAddCardForm.setEventListeners();

openPopupAddCardButton.addEventListener('click', function () {
  validatorCardForm.resetValidation();
  popupWithAddCardForm.open();
});

// ========================== popup edit profile =========================================
const popupEditProfileForm = new PopupWithForm(selectorPopupEditProfile, (formValues) => {
  userInfo.setUserInfo(formValues);
  popupEditProfileForm.close();
});

popupEditProfileForm.setEventListeners();

openPopupEditProfileButton.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  nameUserInput.value = userData.nameUser;
  workUserInput.value = userData.workUser;
  validatorProfileForm.resetValidation();
  popupEditProfileForm.open();
});

// =============== экземпляры класса FormValidator и валидация форм ============
const validatorCardForm = new FormValidator(settings, formPopupAddCard);
const validatorProfileForm = new FormValidator(settings, formPopupEdit);

validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();
