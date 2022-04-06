// ========================= validation forms ========================================
//показывает элемент ошибки
const showError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorActive);
};
//скрывает элемент ошибки
const hideError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputError);
  errorElement.classList.remove(settings.inputErrorActive);
  errorElement.textContent = '';
};
//поверяет валидность формы, вызывает показ или скрытие ошибки
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideError(formElement, inputElement, settings);
  }
};
//слушатель на все input
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement)=> {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};
//слушатель для всей формы
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};
//ищем невалидный input
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
//если input не валидный, деактивация button и наоборот
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.buttonInactive);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(settings.buttonInactive);
    buttonElement.removeAttribute("disabled", "disabled");
  }
};

const settings = {
  inputError: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active',
  buttonInactive: 'button_variant_inactive'
}

enableValidation(settings);