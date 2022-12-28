const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

let formElement = document.querySelector('form');
let popupName = formElement.querySelector('.popup__name');
let popupAbout = formElement.querySelector('.popup__about');

function handleFormSubmit (evt) {
    evt.preventDefault();

    let popupName = formElement.querySelector('input');
    popupName.getAttribute('value');

    let profileInfo = document.querySelector('.profile__info');
    let profileName = profileInfo.querySelector('.profile__name');

    profileName.textContent = ('.popupName');

    

}

formElement.addEventListener('submit', handleFormSubmit); 

/* // Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = // Воспользуйтесь инструментом .querySelector()
let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); */