import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({link, name}) {
    this._popup.querySelector('.popup__img-info').textContent = name;
    this._imgPopupElement = this._popup.querySelector('.popup__img');
    this._imgPopupElement.src = link;
    this._imgPopupElement.alt = name;

    super.open();
  }
}
