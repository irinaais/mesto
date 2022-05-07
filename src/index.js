import "./pages/index.css";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";
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
} from "./utils/constants.js";

const imgPopup = new PopupWithImage(popupViewCard);
const userInfo = new UserInfo({ selectorNameUserLabel, selectorWorkUserLabel });

function createCard(name, link) {
  const card = new Card(name, link, '#template', () => imgPopup.openPopup({name, link})
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// function prependCard(cardElement) {
//   nodeElements.prepend(cardElement);
// }

// =========================== открытие и закрытие попапа с карточкой ============================================
// const imgPopup = new PopupWithImage(popupViewCard);
imgPopup.setEventListeners();

popupCloseButton.addEventListener('click', function () {
  imgPopup.closePopup();
});

// =========================== создание карточек из массива ============================================
// initialCards.forEach((item) => {
//   const cardElement = createCard(item.name, item.link);
//   prependCard(cardElement);
// });

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link);
    defaultCardList.addItem(card);
  }
}, elements);

defaultCardList.renderItems();

// =========================== открытие попапа с карточкой старое============================================

// function openCardClick(name, link) {
//   popupImg.src = link;
//   popupImg.alt = name;
//   popupImgInfo.textContent = name;
//   openPopup(popupViewCard);
// }
//
// function closeCardClick() {
//   closePopup(popupViewCard);
// }
//
// function openPopup(popup) {
//   document.addEventListener('keydown', closeEscPopup);
//   popup.classList.add('popup_opened');
// }
//
// function closePopup(popup) {
//   document.removeEventListener('keydown', closeEscPopup);
//   popup.classList.remove('popup_opened');
// }
//
// const closeEscPopup = (evt) => {
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }
//
// popupViewCard.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     closePopup(popupViewCard);
//   }
// });



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

// const popupAdd = document.querySelector(".popup_add");
// const openPopupAddCardButton = document.querySelector(".button_variant_add");
// const closePopupAddCardButton = popupAdd.querySelector(".popup__close-button");
//
// popupAdd.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     closePopup(popupAdd);
//   }
// });
//
// openPopupAddCardButton.addEventListener('click', function () {
//   validatorCardForm.resetValidation();
//   openPopup(popupAdd);
// });
//
// closePopupAddCardButton.addEventListener('click', function () {
//   closePopup(popupAdd);
// });

// ========================= inputs add card ========================================
// const namePlaceInput = popupAdd.querySelector(".popup__input_name-place");
// const linkInput = popupAdd.querySelector(".popup__input_link");
// const popupAddCardForm = document.querySelector('.popup__add');
// const popupAddButton = popupAddCardForm.querySelector('.popup__save-button');
//
// popupAddCardForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   const cardElement = createCard(namePlaceInput.value, linkInput.value);
//   prependCard(cardElement);
//
//   closePopup(popupAdd);
//
//   event.target.reset();
// });

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
// const popupEdit = document.querySelector(".popup_edit");
// const openPopupEditProfileButton = document.querySelector(".button_variant_edit");
// const closePopupEditProfileButton = popupEdit.querySelector(".popup__close-button");

// popupEdit.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     closePopup(popupEdit);
//   }
// });
//
// openPopupEditProfileButton.addEventListener('click', function () {
//   nameUserInput.value = nameUserLabel.innerText;
//   workUserInput.value = workUserLabel.innerText;
//   validatorProfileForm.resetValidation();
//   openPopup(popupEdit);
// });
//
// closePopupEditProfileButton.addEventListener('click', function () {
//   closePopup(popupEdit);
// });


// ============================ inputs edit profile ====================================
// const nameUserLabel = document.querySelector(".profile__title");
// const nameUserInput = popupEdit.querySelector(".popup__input_name-user");
// const workUserLabel = document.querySelector(".profile__subtitle");
// const workUserInput = popupEdit.querySelector(".popup__input_work-user");
// const popupEditProfileForm = document.querySelector('.popup__edit');
//
// popupEditProfileForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   nameUserLabel.textContent = nameUserInput.value;
//   workUserLabel.textContent = workUserInput.value;
//   closePopup(popupEdit);
// });

// =============== экземпляры класса FormValidator и валидация форм ============
// const validatorCardForm = new FormValidator(settings, popupAddCardForm);
const validatorCardForm = new FormValidator(settings, popupAddCard);
const validatorProfileForm = new FormValidator(settings, popupEdit);

validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();

// export {openPopupAddCardButton, popupAddButton};
