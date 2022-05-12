import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imgUrl, imgName) {
    super(popupSelector);
    this._imgUrl = imgUrl;
    this._imgName = imgName;
  }

  open({link, name}) {
    this._imgUrl.src = link;
    this._imgUrl.alt = name;
    this._imgName.textContent = name;

    super.open();
  }
}
