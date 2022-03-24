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
const popupImg = document.querySelector(".popup__img");
const popupImgInfo = document.querySelector(".popup__img-info");

initialCards.forEach(function (item) {
  const elements = document.querySelector(".elements");
  const template = document.querySelector('#template').content;
  const card = template.cloneNode(true);
  card.querySelector('.element__town').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;
  //добавлена возможность ставить лайки
  const likeButton = card.querySelector(".button_variant_like");
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle("button_variant_active-like");
  });
  //добавлена возможность удалять карточку
  const deleteButton = card.querySelector(".button_variant_delete");
  deleteButton.addEventListener('click', function (event) {
    deleteCard(event);
  });
  //открытие попапа с картинкой
  const image = card.querySelector(".element__image");

  image.addEventListener('click', function () {
    popupViewCard.classList.add("popup_opened");
    popupImg.src = item.link;
    popupImg.alt = item.name;
    popupImgInfo.textContent = item.name;
  });

  elements.append(card); //создаем карточку из массива
});

// ========================== popup edit profile =========================================
const popupEdit = document.querySelector(".popup_edit");
const openPopupEditProfileButton = document.querySelector(".button_variant_edit");
const closePopupEditProfileButton = popupEdit.querySelector(".popup__close-button");

function togglePopupEditProfile() {
  popupEdit.classList.toggle("popup_opened");
}

popupEdit.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    togglePopupEditProfile();
  }
});

openPopupEditProfileButton.addEventListener("click", togglePopupEditProfile, true);
closePopupEditProfileButton.addEventListener("click", togglePopupEditProfile, true);

// =========================== popup add card ============================================
const popupAdd = document.querySelector(".popup_add");
const openPopupAddCardButton = document.querySelector(".button_variant_add");
const closePopupAddCardButton = popupAdd.querySelector(".popup__close-button");

function togglePopupAddCard() {
  popupAdd.classList.toggle("popup_opened");
}

popupAdd.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    togglePopupAddCard();
  }
});

openPopupAddCardButton.addEventListener("click", togglePopupAddCard, true);
closePopupAddCardButton.addEventListener("click", togglePopupAddCard, true);

// ============================ inputs edit profile ====================================
const nameUserLabel = document.querySelector(".profile__title");
const nameUserInput = popupEdit.querySelector(".popup__input_name-user");
const workUserLabel = document.querySelector(".profile__subtitle");
const workUserInput = popupEdit.querySelector(".popup__input_work-user");
// const saveEditProfileButton = popupEdit.querySelector(".popup__save-button");
const popupEditProfileForm = document.querySelector('.popup__edit');

nameUserInput.value = nameUserLabel.innerText;
workUserInput.value = workUserLabel.innerText;

popupEditProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  nameUserLabel.innerText = nameUserInput.value;
  workUserLabel.innerText = workUserInput.value;
  popupEdit.classList.remove("popup_opened");
});

// ========================= inputs add card ========================================
const namePlaceInput = popupAdd.querySelector(".popup__input_name-place");
const linkInput = popupAdd.querySelector(".popup__input_link");
// const namePlaceLabel = document.querySelector(".element__town");
const popupAddCardForm = document.querySelector('.popup__add');

popupAddCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const elements = document.querySelector(".elements");
  const templateContent = document.querySelector('#template').content;
  const card = templateContent.cloneNode(true);
  card.querySelector('.element__town').textContent = namePlaceInput.value; //наполняем содержимым
  card.querySelector('.element__image').src = linkInput.value;
  card.querySelector('.element__image').alt = namePlaceInput.value;

  //добавлена возможность ставить лайки
  const newLikeButton = card.querySelector(".button_variant_like");
  newLikeButton.addEventListener('click', function () {
    newLikeButton.classList.toggle("button_variant_active-like");
  });

  //добавлена возможность удалять карточку
  const deleteButton = card.querySelector(".button_variant_delete");
  deleteButton.addEventListener('click', function (event) {
    deleteCard(event);
  });

  //открытие попапа с картинкой
  const image = card.querySelector(".element__image");

  image.addEventListener('click', function () {
    popupViewCard.classList.add("popup_opened");
    popupImg.src = document.querySelector('.element__image').src;
    popupImg.alt = document.querySelector('.element__town').textContent;
    popupImgInfo.textContent = document.querySelector('.element__town').textContent;
  });

  elements.prepend(card); //создаем карточку

  popupAdd.classList.remove("popup_opened");

  namePlaceInput.value = ""; //очищаем форму
  linkInput.value = "";
});

// ========================= delete card ========================================
function deleteCard(event) {
  const card = event.currentTarget.closest(".element");
  card.remove();
}

// ========================= close view img card ========================================
const closeButton = popupViewCard.querySelector(".popup__close-button");

closeButton.addEventListener('click', function () {
    popupViewCard.classList.remove("popup_opened");
});

function toggleViewCard() {
  popupViewCard.classList.toggle("popup_opened");
}

popupViewCard.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    toggleViewCard();
  }
});
