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
  selectorPopupViewCard,
  selectorPopupAddCard,
  selectorPopupEditProfile
} from "../utils/constants.js";

const imgPopup = new PopupWithImage(selectorPopupViewCard);
const userInfo = new UserInfo({ selectorNameUserLabel, selectorWorkUserLabel });

function createCard(name, link) {
  const card = new Card(name, link, '#template', () => imgPopup.open({name, link})
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// =========================== открытие и закрытие попапа с карточкой ============================================
imgPopup.setEventListeners();

popupCloseButton.addEventListener('click', function () {
  imgPopup.close();
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

closePopupAddCardButton.addEventListener('click', function () {
  popupWithAddCardForm.close();
});

// ========================== popup edit profile =========================================
const popupEditProfileForm = new PopupWithForm(selectorPopupEditProfile, (formValues) => {
  userInfo.setUserInfo(formValues);
});

popupEditProfileForm.setEventListeners();

openPopupEditProfileButton.addEventListener('click', function () {
  validatorProfileForm.resetValidation();
  popupEditProfileForm.open();
  const userData = userInfo.getUserInfo();
  nameUserInput.value = userData.nameUser;
  workUserInput.value = userData.workUser;
});

closePopupEditProfileButton.addEventListener('click', function () {
  popupEditProfileForm.close();
});

popupEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameUserLabel.textContent = nameUserInput.value;
  workUserLabel.textContent = workUserInput.value;
  popupEditProfileForm.close();
})

// =============== экземпляры класса FormValidator и валидация форм ============
const validatorCardForm = new FormValidator(settings, popupAddCard);
const validatorProfileForm = new FormValidator(settings, popupEdit);

validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();
