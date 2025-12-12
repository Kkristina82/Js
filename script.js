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
