export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;//items — это массив данных, которые нужно добавить на страницу при инициализации класса
        this._renderer = renderer; // renderer — это функция, которая отвечает за создание и отрисовку каждого отдельного элемента
        this._container = document.querySelector(selector);//селектор контейнера, в который нужно добавлять созданные элементы.
    }
    renderItems() {//Содержит публичный метод, который отвечает за отрисовку всех элементов.
        this._items.forEach(item => {
            this._renderer(item); // вызываем renderer, передав item
        });
    }
    addItem() {//принимает DOM-элемент и добавляет его в контейнер.
        this._container.append(element);
    }
}
//У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.