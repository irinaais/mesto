import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  settings,
  popupViewCard,
  popupAddCard,
  openPopupAddCardButton,
  closePopupAddCardButton,
  popupCloseButton,
  elements,
  selectorNameUserLabel,
  selectorWorkUserLabel,
  popupEdit,
  openPopupEditProfileButton,
  closePopupEditProfileButton,
  nameUserInput,
  nameUserLabel,
  workUserInput,
  workUserLabel,
} from "../utils/constants.js";

const imgPopup = new PopupWithImage(popupViewCard);
const userInfo = new UserInfo({ selectorNameUserLabel, selectorWorkUserLabel });

function createCard(name, link) {
  const card = new Card(name, link, '#template', () => imgPopup.openPopup({name, link})
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// =========================== открытие и закрытие попапа с карточкой ============================================
imgPopup.setEventListeners();

popupCloseButton.addEventListener('click', function () {
  imgPopup.closePopup();
});

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
const popupWithAddCardForm = new PopupWithForm(popupAddCard, (formValues) => {
  const card = createCard(formValues.name, formValues.link);
  defaultCardList.addItem(card);
  popupWithAddCardForm.closePopup();
});

popupWithAddCardForm.setEventListeners();

openPopupAddCardButton.addEventListener('click', function () {
  validatorCardForm.resetValidation();
  popupWithAddCardForm.openPopup();
});

closePopupAddCardButton.addEventListener('click', function () {
  popupWithAddCardForm.closePopup();
});

// ========================== popup edit profile =========================================
const popupEditProfileForm = new PopupWithForm(popupEdit, (formValues) => {
  userInfo.setUserInfo(formValues);
});

popupEditProfileForm.setEventListeners();

openPopupEditProfileButton.addEventListener('click', function () {
  validatorProfileForm.resetValidation();
  popupEditProfileForm.openPopup();
  const userData = userInfo.getUserInfo();
  nameUserInput.value = userData.nameUser;
  workUserInput.value = userData.workUser;
});

closePopupEditProfileButton.addEventListener('click', function () {
  popupEditProfileForm.closePopup();
});

popupEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameUserLabel.textContent = nameUserInput.value;
  workUserLabel.textContent = workUserInput.value;
  popupEditProfileForm.closePopup();
})

// =============== экземпляры класса FormValidator и валидация форм ============
const validatorCardForm = new FormValidator(settings, popupAddCard);
const validatorProfileForm = new FormValidator(settings, popupEdit);

validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();
