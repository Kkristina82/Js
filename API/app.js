// URL API з Dog CEO (без авторизації)
const API_URL = "https://dog.ceo/api/breeds/image/random";

const fetchBtn = document.getElementById("fetchBtn");// ініціює запит.
const dogImage = document.getElementById("dogImage"); // куди підставляємо
const errorText = document.getElementById("error");

async function fetchData() {
  try { //куди підставляємо
    errorText.textContent = ""; 

    // Виклик API з await
    const response = await fetch(API_URL);

    // Перевірка відповіді
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Чекаємо парсинг JSON
    // Встановлюємо отриману картинку
    dogImage.src = data.message;
    dogImage.alt = "Випадкове зображення собаки з API";
  } catch (error) {
    // Обробка помилок
    console.error("Помилка отримання даних:", error);
    errorText.textContent = "Не вдалося отримати зображення собаки. Спробуйте пізніше.";
  }
}
// Додаємо обробник кліку на кнопку
fetchBtn.addEventListener("click", fetchData);

// Опціонально: показати зображення при завантаженні сторінки
window.addEventListener("load", fetchData);
