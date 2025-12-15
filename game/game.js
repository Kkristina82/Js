// Отримуємо canvas та 2D-контекст для малювання
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Об'єкт, який зберігає загальний стан гри
let state = {
    score: 0,        // кількість очок
    lives: 3,        // життя гравця
    speed: 1.5,      // швидкість падіння об'єктів
    frame: 0,        // лічильник кадрів
    gameOver: false  // прапорець завершення гри
};

// Об'єкт гравця (космічний корабель)
const ship = {
    x: canvas.width / 2,      // початкова позиція по X
    y: canvas.height - 70,    // позиція по Y (внизу екрана)
    width: 40,                // ширина корабля
    height: 50,               // висота корабля
    dx: 0                     // швидкість руху по X
};

// Масиви ігрових об'єктів
let asteroids = []; // астероїди (перешкоди)
let energy = [];    // енергетичні сфери (бонуси)

// Обробка натискання клавіш
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        ship.dx = -4; // рух вліво
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
        ship.dx = 4; // рух вправо
    }
});

// Обробка відпускання клавіш
document.addEventListener('keyup', () => {
    ship.dx = 0; // зупинка корабля
});

// Малювання корабля (у вигляді трикутника)
function drawShip() {
    ctx.fillStyle = '#4fc3f7';
    ctx.beginPath();
    ctx.moveTo(ship.x, ship.y);
    ctx.lineTo(ship.x - ship.width / 2, ship.y + ship.height);
    ctx.lineTo(ship.x + ship.width / 2, ship.y + ship.height);
    ctx.closePath();
    ctx.fill();
}

// Створення нового астероїда
function createAsteroid() {
    asteroids.push({
        x: Math.random() * canvas.width, // випадкова позиція по X
        y: -40,                          // починає за межами екрану
        r: 20 + Math.random() * 15       // випадковий розмір
    });
}

// Створення енергетичної сфери
function createEnergy() {
    energy.push({
        x: Math.random() * canvas.width,
        y: -20,
        r: 10
    });
}

// Малювання астероїдів
function drawAsteroids() {
    ctx.fillStyle = '#888';
    asteroids.forEach(a => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Малювання енергетичних сфер
function drawEnergy() {
    ctx.fillStyle = '#ffd54f';
    energy.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Оновлення позицій та логіки гри
function updateObjects() {

    // Рух корабля
    ship.x += ship.dx;

    // Обмеження руху в межах canvas
    ship.x = Math.max(ship.width / 2,
             Math.min(canvas.width - ship.width / 2, ship.x));

    // Рух астероїдів
    asteroids.forEach((a, i) => {
        a.y += state.speed;

        // Якщо астероїд вийшов за межі екрану — видаляємо
        if (a.y > canvas.height) {
            asteroids.splice(i, 1);
        }

        // Перевірка зіткнення з кораблем
        if (distance(ship.x, ship.y + ship.height / 2, a.x, a.y) < a.r + 20) {
            asteroids.splice(i, 1);
            state.lives--;
            updateUI();

            // Якщо життя закінчились — кінець гри
            if (state.lives <= 0) finishGame();
        }
    });

    // Рух енергетичних сфер
    energy.forEach((e, i) => {
        e.y += state.speed;

        if (e.y > canvas.height) {
            energy.splice(i, 1);
        }

        // Перевірка збору бонусу
        if (distance(ship.x, ship.y, e.x, e.y) < e.r + 20) {
            energy.splice(i, 1);
            state.score += 100;
            updateUI();
        }
    });

    // Періодичне створення об'єктів
    if (state.frame % 90 === 0) createAsteroid();
    if (state.frame % 200 === 0) createEnergy();

    state.frame++;
}

// Функція для обчислення відстані між двома точками
function distance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
}

// Оновлення HTML-інтерфейсу
function updateUI() {
    document.getElementById('score').textContent = state.score;
    document.getElementById('lives').textContent = state.lives;
}

// Завершення гри
function finishGame() {
    state.gameOver = true;
    document.getElementById('finalScore').textContent = state.score;
    document.getElementById('gameOver').classList.add('show');
}

// Перезапуск гри
function restart() {
    state = {
        score: 0,
        lives: 3,
        speed: 1.5,
        frame: 0,
        gameOver: false
    };

    asteroids = [];
    energy = [];
    document.getElementById('gameOver').classList.remove('show');
    updateUI();
    loop();
}

// Головний ігровий цикл
function loop() {
    // Очищення canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Малювання об'єктів
    drawShip();
    drawAsteroids();
    drawEnergy();

    // Оновлення логіки
    updateObjects();

    // Продовження гри, якщо вона не завершена
    if (!state.gameOver) {
        requestAnimationFrame(loop);
    }
}

// Початковий запуск гри
updateUI();
loop();
