import {
  enableValidation,
  config,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../scripts/utils/Api.js";
import logoSrc from "../images/logo.svg";
import avatarSrc from "../images/avatar.jpg";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7ea97be1-ac79-4fc2-bcf3-d29a380283eb",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userInfo) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch(console.error);

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

const headerLogo = document.querySelector(".header__logo");
headerLogo.src = logoSrc;

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");
const profileAvatarButton = document.querySelector(".profile__avatar-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const modals = document.querySelectorAll(".modal");
const editModal = document.querySelector("#edit-modal");
const editModalForm = editModal.querySelector(".modal__form");
const closeProfileModal = editModal.querySelector(".modal__close-btn");
const editModalName = editModal.querySelector("#profile-name-input");
const editModalDescription = editModal.querySelector(
  "#profile-description-input"
);

const cardModal = document.querySelector("#add-card-modal");
const cardModalForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
const renderCard = cardModal.querySelector("#add-card-modal");
const closeCardModal = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardCaptionInput = cardModal.querySelector("#card-name-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteModalClose = deleteModal.querySelector(".modal__close-btn");
const deleteModalSubmit = deleteModal.querySelector(".modal__delete-btn");
const deleteModalCancel = deleteModal.querySelector(".modal__cancel-btn");
let selectedCard;
let selectedCardId;

const avatarModal = document.querySelector("#avatar-modal");
const avatarModalForm = avatarModal.querySelector(".modal__form");
const closeAvatarModal = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_preview"
);

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  if (data.likes?.some((like) => like._id === userId)) {
    cardLikeBtn.classList.add("card__like-button_liked");
  }

  cardLikeBtn.addEventListener("click", () => {
    if (cardLikeBtn.classList.contains("card__like-button_liked")) {
      api
        .dislikeCard(data._id)
        .then(() => {
          cardLikeBtn.classList.remove("card__like-button_liked");
        })
        .catch(console.error);
    } else {
      api
        .likeCard(data._id)
        .then(() => {
          cardLikeBtn.classList.add("card__like-button_liked");
        })
        .catch(console.error);
    }
  });

  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = cardImageEl.src;
    previewModalImageEl.alt = cardImageEl.alt;
    previewModalCaptionEl.textContent = cardNameEl.textContent;
    openModal(previewModal);
  });

  cardDeleteBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalByOverlay);
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalByOverlay);
  document.removeEventListener("keydown", handleEscapeKey);
}

function closeModalByOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    modals.forEach((modal) => closeModal(modal));
  }
}

function handleEditModalFormSubmit(evt) {
  evt.preventDefault();
  const name = editModalName.value;
  const about = editModalDescription.value;
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .editUserInfo({ name, about })
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
}
editModalForm.addEventListener("submit", handleEditModalFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const initialValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .addNewCard(initialValues)
    .then((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
      evt.target.reset();
      disableButton(cardSubmitBtn, config);
      closeModal(cardModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
}
cardModalForm.addEventListener("submit", handleAddCardFormSubmit);

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = deleteModalSubmit;
  submitButton.textContent = "Deleting...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Delete";
    });
}
deleteModalSubmit.addEventListener("click", handleDeleteCardSubmit);

deleteModalClose.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalCancel.addEventListener("click", () => {
  closeModal(deleteModal);
});

profileEditButton.addEventListener("click", () => {
  openModal(editModal);
  editModalName.value = profileName.textContent.trim();
  editModalDescription.value = profileDescription.textContent.trim();
  resetValidation(editModalForm, [editModalName, editModalDescription], {
    inputErrorClass: "modal__input-error",
    errorClass: "modal__error",
  });
});

avatarModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatar = avatarInput.value;
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .updateAvatar(avatar)
    .then((userInfo) => {
      profileAvatar.src = userInfo.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
});

profileAvatarButton.addEventListener("click", () => {
  openModal(avatarModal);
});

closeAvatarModal.addEventListener("click", () => {
  closeModal(avatarModal);
});

closeProfileModal.addEventListener("click", () => {
  closeModal(editModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(cardModal);
});

closeCardModal.addEventListener("click", () => {
  closeModal(cardModal);
});

enableValidation(config);
