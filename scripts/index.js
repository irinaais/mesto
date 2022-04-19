import Card from './Card.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupViewCard = document.querySelector(".popup_view-card");
const popupImg = document.querySelector('.popup__img');
const popupImgInfo = document.querySelector(".popup__img-info");
const popupCloseButton = popupViewCard.querySelector('.popup__close-button');
// const elements = document.querySelector(".elements");

export {popupCloseButton};

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#template', openCardClick, closeCardClick);
  const cardElement = card.generateCard();
  const elements = document.querySelector(".elements");

  elements.prepend(cardElement);
});

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

// // ========================== popup edit profile =========================================
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
  nameUserLabel.innerText = nameUserInput.value;
  workUserLabel.innerText = workUserInput.value;
  closePopup(popupEdit);
});



