const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageElement = formElement.querySelector('#' + inputElement.id + '-error');
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add('modal__input_type_error');
}

const hideInputError = (formElement, inputElement) => {
  const errorMessageElement = formElement.querySelector('#' + inputElement.id + '-error');
  errorMessageElement.textContent = "";
  inputElement.classList.remove('modal__input_type_error');
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__button");

  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      //toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();