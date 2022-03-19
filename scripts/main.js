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

// === popup ===
const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".button_variant_edit");
const closePopup = popup.querySelector(".popup__close-button");

function togglePopup() {
  popup.classList.toggle("popup_opened");
}

popup.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

openPopup.addEventListener("click", togglePopup, true);

closePopup.addEventListener("click", togglePopup, true);

// === inputs ===
const nameUserLabel = document.querySelector(".profile__title");
const nameUserInput = popup.querySelector(".popup__input_name-user");
const workUserLabel = document.querySelector(".profile__subtitle");
const workUserInput = popup.querySelector(".popup__input_work-user");
const saveButton = popup.querySelector(".popup__save-button");
const formElement = document.querySelector('.popup__edit');

nameUserInput.value = nameUserLabel.innerText;
workUserInput.value = workUserLabel.innerText;

formElement.addEventListener('submit', function () {
  event.preventDefault();
  nameUserLabel.innerText = nameUserInput.value;
  workUserLabel.innerText = workUserInput.value;
  popup.classList.remove("popup_opened");
});


//
//
// function getUser(id) {
//   const user = db.readUser(id);
//   return user;
// }
//
// const myUser1 = getUser(1);
// const myUser2 = getUser(2);
// const myUser3 = getUser(3);
// div.innerText = myUser1.name;

// ========================================
// ids = [1, 15, 25, 78];
//const users = ids.map(getUser);

// function getUsers(ids) {
//   const users = ids.map(getUser);
//   return users;
// }

// function getUsers(ids) {
//    const users = ids.map(function getUser(id) {
//      const user = db.readUser(id);
//      return user;
//    });
//    return users;
//  }
//
// const users = getUsers([1, 15, 25, 78]);
// div.innerText = users.name;
//
//
//









