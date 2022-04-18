const popupViewCard = document.querySelector(".popup_view-card");
const popupImg = document.querySelector('.popup__img');
const popupImgInfo = document.querySelector(".popup__img-info");
// const elements = document.querySelector(".elements");

class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return template;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__town').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.button_variant_like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.button_variant_delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup();
    })
  }

  _likeCard() {
    this._element.querySelector('.button_variant_like').classList.toggle('button_variant_active-like');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPopup() {
    popupImg.src = this._link;
    popupImg.alt = this._name;
    popupImgInfo.textContent = this._name;
    popupViewCard.classList.add('popup_opened');
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#template');
  const cardElement = card.generateCard();
  const elements = document.querySelector(".elements");

  elements.prepend(cardElement);
});

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
// // ==========================создание карточек из массива ===================================
// initialCards.forEach(function (item) {
//   const card = createCard(item.name, item.link);
//   renderCard(card, elements);
// });
//
// // ========================== popup edit profile =========================================
// const popupEdit = document.querySelector(".popup_edit");
// const openPopupEditProfileButton = document.querySelector(".button_variant_edit");
// const closePopupEditProfileButton = popupEdit.querySelector(".popup__close-button");
//
// popupEdit.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     closePopup(popupEdit);
//   }
// });
//
// openPopupEditProfileButton.addEventListener('click', function () {
//   nameUserInput.value = nameUserLabel.innerText;
//   workUserInput.value = workUserLabel.innerText;
//   openPopup(popupEdit);
// });
//
// closePopupEditProfileButton.addEventListener('click', function () {
//   closePopup(popupEdit);
// });
//
// // =========================== popup add card ============================================
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
//   openPopup(popupAdd);
// });
//
// closePopupAddCardButton.addEventListener('click', function () {
//   closePopup(popupAdd);
// });
//
// // ============================ inputs edit profile ====================================
// const nameUserLabel = document.querySelector(".profile__title");
// const nameUserInput = popupEdit.querySelector(".popup__input_name-user");
// const workUserLabel = document.querySelector(".profile__subtitle");
// const workUserInput = popupEdit.querySelector(".popup__input_work-user");
// const popupEditProfileForm = document.querySelector('.popup__edit');
//
// popupEditProfileForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   nameUserLabel.innerText = nameUserInput.value;
//   workUserLabel.innerText = workUserInput.value;
//   closePopup(popupEdit);
// });
//
// // ========================= inputs add card ========================================
// const namePlaceInput = popupAdd.querySelector(".popup__input_name-place");
// const linkInput = popupAdd.querySelector(".popup__input_link");
// const popupAddCardForm = document.querySelector('.popup__add');
// const popupAddButton = popupAddCardForm.querySelector('.popup__save-button');
//
// popupAddCardForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   const card = createCard(namePlaceInput.value, linkInput.value);
//
//   renderCard(card, elements);
//
//   popupAddButton.classList.add('button_variant_inactive');
//   popupAddButton.setAttribute("disabled", "disabled");
//   closePopup(popupAdd);
//
//   event.target.reset();
// });

// // ========================= close view img card ========================================
// const closeButton = popupViewCard.querySelector(".popup__close-button");
//
// closeButton.addEventListener('click', function () {
//   closePopup(popupViewCard);
// });
//
// popupViewCard.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     closePopup(popupViewCard);
//   }
// });
