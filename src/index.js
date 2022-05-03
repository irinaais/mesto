import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import "./pages/index.css";
import Section from "./scripts/Section.js";
import {initialCards, settings, popupViewCard, popupImg, popupImgInfo, popupCloseButton, NodeElements, elements} from "./utils/constants.js"

function createCard(name, link) {
  const card = new Card(name, link, '#template', openCardClick, closeCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function prependCard(cardElement) {
  NodeElements.prepend(cardElement);
}

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

function openCardClick(name, link) {
  popupImg.src = link;
  popupImg.alt = name;
  popupImgInfo.textContent = name;
  openPopup(popupViewCard);
}

function closeCardClick() {
  closePopup(popupViewCard);
}

function openPopup(popup) {
  document.addEventListener('keydown', closeEscPopup);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', closeEscPopup);
  popup.classList.remove('popup_opened');
}

const closeEscPopup = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

popupViewCard.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupViewCard);
  }
});

popupCloseButton.addEventListener('click', function () {
  closePopup(popupViewCard);
});

// =========================== popup add card ============================================
const popupAdd = document.querySelector(".popup_add");
const openPopupAddCardButton = document.querySelector(".button_variant_add");
const closePopupAddCardButton = popupAdd.querySelector(".popup__close-button");

popupAdd.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupAdd);
  }
});

openPopupAddCardButton.addEventListener('click', function () {
  validatorCardForm.resetValidation();
  openPopup(popupAdd);
});

closePopupAddCardButton.addEventListener('click', function () {
  closePopup(popupAdd);
});

 // ========================= inputs add card ========================================
const namePlaceInput = popupAdd.querySelector(".popup__input_name-place");
const linkInput = popupAdd.querySelector(".popup__input_link");
const popupAddCardForm = document.querySelector('.popup__add');
const popupAddButton = popupAddCardForm.querySelector('.popup__save-button');

popupAddCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardElement = createCard(namePlaceInput.value, linkInput.value);
  prependCard(cardElement);

  closePopup(popupAdd);

  event.target.reset();
});

 // ========================== popup edit profile =========================================
const popupEdit = document.querySelector(".popup_edit");
const openPopupEditProfileButton = document.querySelector(".button_variant_edit");
const closePopupEditProfileButton = popupEdit.querySelector(".popup__close-button");

popupEdit.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupEdit);
  }
});

openPopupEditProfileButton.addEventListener('click', function () {
  nameUserInput.value = nameUserLabel.innerText;
  workUserInput.value = workUserLabel.innerText;
  validatorProfileForm.resetValidation();
  openPopup(popupEdit);
});

closePopupEditProfileButton.addEventListener('click', function () {
  closePopup(popupEdit);
});


// ============================ inputs edit profile ====================================
const nameUserLabel = document.querySelector(".profile__title");
const nameUserInput = popupEdit.querySelector(".popup__input_name-user");
const workUserLabel = document.querySelector(".profile__subtitle");
const workUserInput = popupEdit.querySelector(".popup__input_work-user");
const popupEditProfileForm = document.querySelector('.popup__edit');

popupEditProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  nameUserLabel.textContent = nameUserInput.value;
  workUserLabel.textContent = workUserInput.value;
  closePopup(popupEdit);
});

// =============== экземпляры класса FormValidator и валидация форм ============

const validatorProfileForm = new FormValidator(settings, popupEditProfileForm);
const validatorCardForm = new FormValidator(settings, popupAddCardForm);

validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();

export {openPopupAddCardButton, popupAddButton};


