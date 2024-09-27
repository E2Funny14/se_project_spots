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
const cardModalLink = cardModal.querySelector("#add-card-link-input");
const cardModalName = cardModal.querySelector("#card-name-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn_preview");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");


  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.alt;

  cardLikeBtn.addEventListener("click", () => {
  cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  cardDeleteBtn.addEventListener("click", () => {
  const card = cardDeleteBtn.closest(".card");
  if (card) {
    card.remove()}});

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
})

function openModal(modal) {
  modal.classList.add("modal_opened");
  editModalName.value = profileName.textContent.trim();
  editModalDescription.value = profileDescription.textContent.trim();
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}}

function handleEditModalFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalName.value;
  profileDescription.textContent = editModalDescription.value;
  closeModal(editModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardModalName.value, link: cardModalLink.value};
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(cardModal);
}

profileEditButton.addEventListener("click", () => {
  openModal(editModal)});
  editModalName.value = profileName.textContent.trim();
  editModalDescription.value = profileDescription.textContent.trim();

closeProfileModal.addEventListener("click", () => {
  closeModal(editModal)});

profileAddButton.addEventListener("click", () => {
  openModal(cardModal)});

closeCardModal.addEventListener("click", () => {
  closeModal(cardModal)});

editModalForm.addEventListener("submit", handleEditModalFormSubmit);
cardModalForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(card => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement)});