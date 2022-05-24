import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirmDeleteCard = this._popup.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirmDeleteCard.addEventListener('click', function () {
      console.log('delete clicked'); // TODO
    });
  }
}