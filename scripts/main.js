const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".popup-open");
const closePopup = popup.querySelector(".popup__close");

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
const nameUser = document.querySelector(".profile__title");
const nameUserPopup = popup.querySelector(".name-user");
const workUser = document.querySelector(".profile__subtitle");
const workUserPopup = popup.querySelector(".work-user");

nameUserPopup.value = nameUser.innerText;
workUserPopup.value = workUser.innerText;
