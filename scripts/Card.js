export default class Card {
  constructor(name, link, cardSelector, openCardClick, closeCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openCardClick = openCardClick;
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
    this._like = this._element.querySelector('.button_variant_like')
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
    this._element.querySelector('.button_variant_delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._openCardClick(this._name, this._link);
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

