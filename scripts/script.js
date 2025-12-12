// Кількість параграфів <p> на сторінці
const paragraphsCount = document.querySelectorAll('p').length;
console.log("Кількість параграфів <p>: ", paragraphsCount);

// Кількість заголовків <h2> на сторінці
const h2Count = document.querySelectorAll('h2').length;
console.log("Кількість заголовків <h2>: ", h2Count);

// Значення background-color елементу <body>
const bodyBg = window.getComputedStyle(document.body).backgroundColor;
console.log("background-color <body>: ", bodyBg);

// Значення font-size елементу <h1>
const h1 = document.querySelector('h1');
const h1FontSize = window.getComputedStyle(h1).fontSize;
console.log("font-size <h1>: ", h1FontSize);

// Беремо всі елементи на сторінці
const allElements = document.querySelectorAll('*');

allElements.forEach(element => {

    let previousColor = ""; // тут зберігаємо старий фон

    // Подія наведення миші
    element.addEventListener('mouseenter', () => {
        // Зберігаємо попередній background
        previousColor = window.getComputedStyle(element).backgroundColor;

        // Змінюємо фон на червоний
        element.style.backgroundColor = 'red';
    });

    // Подія, коли миша йде з елемента
    element.addEventListener('mouseleave', () => {
        // Повертаємо старий фон
        element.style.backgroundColor = previousColor;
    });
});
// Функція, яка буде виконана через 5 секунд
function addImages() {
    // 1. Масив зображень
    let imagesUrl = [
        "https://static.sweet.tv/images/cache/v3/movie_banner/CIGHAhICdWsYAQ==/19282-164568-iak_1280x720.jpg",
        "https://static.sweet.tv/images/cache/v3/movie_banner/CNvLARICZW4YAQ==/26075-avatar-the-way-of-water_1280x720.jpg",
        "https://static.sweet.tv/images/cache/v3/movie_banner/CJiGAhICZW4YAQ==/23387-164046-lilo_1280x720.jpg",
        "https://static.sweet.tv/images/cache/v3/movie_banner/CIzXARICZW4YAQ==/27532-dovbush_1280x720.jpg"
    ];
    
    const container = document.querySelector('.content');// Батьківський елемент (не body)
    const fragment = document.createDocumentFragment();// Створюємо fragment для більш ефективної вставки
    imagesUrl.forEach((url, index) => {
        // setTimeout для появи кожного елемента через секунду після попереднього
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = `image ${index + 1}`;
            img.style.margin = "10px";
            img.style.width = "200px";   
            img.style.height = "auto";
            fragment.appendChild(img);
            container.appendChild(fragment); // Вставляємо fragment у container
        }, 1000 * index); // множимо на індекс, щоб кожне наступне з’являлося через 1 секунду
    });
}

window.addEventListener('load', () => {
    setTimeout(addImages, 5000);
});
