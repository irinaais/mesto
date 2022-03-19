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

initialCards.forEach(function (item) {
  const elements = document.querySelector(".elements");
  const template = document.querySelector('#template').content;
  const card = template.cloneNode(true);
  card.querySelector('.element__town').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;
  elements.append(card);
});

// === popup edit profile ===
const popupEdit = document.querySelector(".popup_edit");
const openPopup = document.querySelector(".button_variant_edit");
const closePopup = popupEdit.querySelector(".popup__close-button");

function togglePopup() {
  popupEdit.classList.toggle("popup_opened");
}

popupEdit.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

openPopup.addEventListener("click", togglePopup, true);

closePopup.addEventListener("click", togglePopup, true);

// === inputs edit profile ===
const nameUserLabel = document.querySelector(".profile__title");
const nameUserInput = popupEdit.querySelector(".popup__input_name-user");
const workUserLabel = document.querySelector(".profile__subtitle");
const workUserInput = popupEdit.querySelector(".popup__input_work-user");
const saveButton = popupEdit.querySelector(".popup__save-button");
const formElement = document.querySelector('.popup__edit');

nameUserInput.value = nameUserLabel.innerText;
workUserInput.value = workUserLabel.innerText;

formElement.addEventListener('submit', function () {
  event.preventDefault();
  nameUserLabel.innerText = nameUserInput.value;
  workUserLabel.innerText = workUserInput.value;
  popupEdit.classList.remove("popup_opened");
});










