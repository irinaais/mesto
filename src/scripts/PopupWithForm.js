import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formValues = {};
    const inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value;
    });
    return formValues;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  closePopup() {
    const formInputs = this._popupSelector.querySelector('.popup__form');
    formInputs.reset();
    super.closePopup();
  }
}