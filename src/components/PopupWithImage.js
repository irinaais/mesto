import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ link, name}) {
    this._popup.querySelector('.popup__img-info').textContent = name;
    const imgPopupElement = this._popup.querySelector('.popup__img');

    imgPopupElement.src = link;
    imgPopupElement.alt = '${name}';

    super.open();
  }
}
