const popupViewCard = document.querySelector(".popup_view-card");
const popupImg = document.querySelector(".popup__img");
const popupImgInfo = document.querySelector(".popup__img-info");
const elements = document.querySelector(".elements");

function createCard(name, link) {
  const template = document.querySelector('#template').content;
  const card = template.cloneNode(true);
  const cardElementImage = card.querySelector('.element__image');

  card.querySelector('.element__town').textContent = name;
  cardElementImage.src = link;
  cardElementImage.alt = name;
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
    popupImg.src = link;
    popupImg.alt = name;
    popupImgInfo.textContent = name;
  });

  return card;
}

function renderCard(card, container) {
  container.prepend(card);
}

function openPopup(popup) {
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

// ==========================создание карточек из массива ===================================
initialCards.forEach(function (item) {
  const card = createCard(item.name, item.link);
  renderCard(card, elements);
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
  document.addEventListener('keydown', closeEscPopup);
  nameUserInput.value = nameUserLabel.innerText;
  workUserInput.value = workUserLabel.innerText;
  openPopup(popupEdit);
});

closePopupEditProfileButton.addEventListener('click', function () {
  closePopup(popupEdit);
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
  openPopup(popupAdd);
  document.addEventListener('keydown', closeEscPopup);
});
closePopupAddCardButton.addEventListener('click', function () {
  closePopup(popupAdd);
});

// ============================ inputs edit profile ====================================
const nameUserLabel = document.querySelector(".profile__title");
const nameUserInput = popupEdit.querySelector(".popup__input_name-user");
const workUserLabel = document.querySelector(".profile__subtitle");
const workUserInput = popupEdit.querySelector(".popup__input_work-user");
// const saveEditProfileButton = popupEdit.querySelector(".popup__save-button");
const popupEditProfileForm = document.querySelector('.popup__edit');

popupEditProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  nameUserLabel.innerText = nameUserInput.value;
  workUserLabel.innerText = workUserInput.value;
  closePopup(popupEdit);
});

// ========================= inputs add card ========================================
const namePlaceInput = popupAdd.querySelector(".popup__input_name-place");
const linkInput = popupAdd.querySelector(".popup__input_link");
// const namePlaceLabel = document.querySelector(".element__town");
const popupAddCardForm = document.querySelector('.popup__add');

popupAddCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const card = createCard(namePlaceInput.value, linkInput.value);

  renderCard(card, elements);

  closePopup(popupAdd);

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
  closePopup(popupViewCard);
});

popupViewCard.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupViewCard);
  }
});
