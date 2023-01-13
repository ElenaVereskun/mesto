const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    popup.classList.remove('popup_opened');
});

let popupForm = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__name');
let popupAbout = document.querySelector('.popup__about');

function handleFormSubmit(evt) {
    evt.preventDefault();

    console.log(popupName.value);
    console.log(popupAbout.value);

    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');

    console.log(profileName.textContent);
    console.log(profileAbout.textContent);
}
popupForm.addEventListener('submit', handleFormSubmit);





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