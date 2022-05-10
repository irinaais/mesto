import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value;
    });
    return formValues;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    const formInputs = this._popup.querySelector('.popup__form');
    super.close();
    formInputs.reset();
  }
}