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
