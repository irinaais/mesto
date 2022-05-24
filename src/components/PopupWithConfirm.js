import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirmDeleteCard = this._popup.querySelector('.popup__save-button');
    this._functionDeleteCard = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirmDeleteCard.addEventListener('click', () => {
      this._functionDeleteCard();
      this.close();
    });
  }

  open(functionDeleteCard) {
    super.open();
    this._functionDeleteCard = functionDeleteCard;

  }
}