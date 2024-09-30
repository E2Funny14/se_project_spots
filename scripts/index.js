const initialCards = [
  {name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",},

  {name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",},

  {name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",},

  {name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",},

  {name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",},

  {name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",},

  {name: "Golden Gate Bridge", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"},
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


const modal = document.querySelector("#modal");
const editModal = document.querySelector("#edit-modal");
const editModalForm = editModal.querySelector(".modal__form");
const closeProfileModal = editModal.querySelector(".modal__close-btn");
const editModalName = editModal.querySelector("#profile-name-input");
const editModalDescription = editModal.querySelector("#profile-description-input");

const cardModal = document.querySelector("#add-card-modal");
const cardModalForm = cardModal.querySelector(".modal__form");
const closeCardModal = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardCaptionInput = cardModal.querySelector("#card-name-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn_preview");

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

  cardLikeBtn.addEventListener("click", () => {
  cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = cardImageEl.src;
    previewModalImageEl.alt = cardImageEl.alt;
    previewModalCaptionEl.textContent = cardNameEl.textContent;
    openModal(previewModal);
  });

  cardDeleteBtn.addEventListener("click", () => {
  const card = cardDeleteBtn.closest(".card");
  if (card) {
    card.remove()
  }
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
})

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditModalFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalName.value;
  profileDescription.textContent = editModalDescription.value;
  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardCaptionInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
 cardCaptionInput.value = "";
  cardLinkInput.value = "";
  closeModal(cardModal);
}

profileEditButton.addEventListener("click", () => {
  openModal(editModal)});
  editModalName.value = profileName.textContent.trim();
  editModalDescription.value = profileDescription.textContent.trim();

closeProfileModal.addEventListener("click", () => {
  closeModal(editModal)});

profileAddButton.addEventListener("click", () => {
  openModal(cardModal)
  cardCaptionInput.value = "Golden Gate Bridge"
  cardLinkInput.value = "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
});

closeCardModal.addEventListener("click", () => {
  closeModal(cardModal)});

editModalForm.addEventListener("submit", handleEditModalFormSubmit);
cardModalForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(item => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement)});