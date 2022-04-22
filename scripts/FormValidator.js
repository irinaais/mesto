import {openPopupAddCardButton, popupAddButton} from "./index.js";

export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationSettings.popupSubmit);
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._validationSettings.popupInput}`));
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
    openPopupAddCardButton.addEventListener('click', function (event) {
      popupAddButton.classList.add('button_variant_inactive');
      popupAddButton.setAttribute("disabled", "disabled");
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSettings.inputError);
    errorElement.classList.add(this._validationSettings.inputErrorActive);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.inputError);
    errorElement.classList.remove(this._validationSettings.inputErrorActive);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every((input) => input.checkValidity());
    this._buttonElement.classList.toggle(this._validationSettings.buttonInactive, !isFormValid);
    this._buttonElement.disabled = !isFormValid;
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
