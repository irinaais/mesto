const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".popup-open");
const closePopup = popup.querySelector(".popup__close");

function togglePopup() {
    popup.classList.toggle("popup__opened");
  }

openPopup.addEventListener("click", togglePopup);

closePopup.addEventListener("click", togglePopup);
