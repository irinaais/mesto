const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".button_edit");
const closePopup = popup.querySelector(".popup__close-button");

// === popup ===
function togglePopup() {
  popup.classList.toggle("popup__opened");
}

popup.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

openPopup.addEventListener("click", togglePopup, true);

closePopup.addEventListener("click", togglePopup, true);

// === inputs ===
const nameUserLabel = document.querySelector(".profile__title");
const nameUserInput = popup.querySelector(".name-user");
const workUserLabel = document.querySelector(".profile__subtitle");
const workUserInput = popup.querySelector(".work-user");
const saveButton = popup.querySelector(".popup__save-button");
const formElement = document.querySelector('.popup__edit');

nameUserInput.value = nameUserLabel.innerText;
workUserInput.value = workUserLabel.innerText;

formElement.addEventListener('submit', function(){
  event.preventDefault();
  nameUserLabel.innerText = nameUserInput.value;
  workUserLabel.innerText = workUserInput.value;
  popup.classList.remove("popup__opened");
});
