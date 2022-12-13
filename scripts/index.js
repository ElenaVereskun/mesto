const editButton = document.querySelector('.profile__edit-button');
const openedPopup = document.querySelector('.popup_opened');

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    openedPopup.classList.add('.popup_opened');
})