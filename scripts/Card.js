import {popupCloseButton} from './index.js';

export default class Card {
  constructor(name, link, cardSelector, openCardClick, closeCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openCardClick = openCardClick;
    this._closeCardClick = closeCardClick;
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
      this._openCardClick(this._name, this._link);
    });
    popupCloseButton.addEventListener('click', () => {
      this._closeCardClick();
    });
  }

  _likeCard() {
    this._element.querySelector('.button_variant_like').classList.toggle('button_variant_active-like');
  }

  _deleteCard() {
    this._element.remove();
  }
}
