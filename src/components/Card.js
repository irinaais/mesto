export default class Card {
  constructor(name, link, cardSelector, handleCardClick, popupDeleteCard) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._popupDeleteCard = popupDeleteCard;
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
    this._cardImage = this._element.querySelector('.element__image');
    this._like = this._element.querySelector('.button_variant_like');
    this._delete = this._element.querySelector('.button_variant_delete');
    this._setEventListeners();

    this._element.querySelector('.element__town').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._likeCard();
    });

    this._delete.addEventListener('click', () => {
      this._popupDeleteCard.open(() => {
        this._deleteCard();
      });
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _likeCard() {
    this._like.classList.toggle('button_variant_active-like');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

