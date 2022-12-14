const editButton = document.querySelector('.profile__edit-button');
const openedPopup = document.querySelector('.popup');

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    openedPopup.classList.add('.popup_opened');
});