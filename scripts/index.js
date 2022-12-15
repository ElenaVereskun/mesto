const editButton = document.querySelector('.profile__edit-button');
const openedPopup = document.querySelector('.popup');
const closeButton = openedPopup.querySelector('.popup__close-button');

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    openedPopup.classList.add('.popup_opened');
})

closeButton.addEventListener('click', () => {
    openedPopup.classList.remove('.popup_opened');
});

editButton.addEventListener('click', (event) => {
console.log(event.target, event.currentTarget);
/* openedPopup.classList.remove('.popup_opened'); */
})