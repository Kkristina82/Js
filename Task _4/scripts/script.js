document.addEventListener("DOMContentLoaded", () => {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const button = document.getElementById('checkBtn');
    const result = document.getElementById('result');

    button.addEventListener('click', () => {
        const words1 = input1.value.toLowerCase().match(/[А-Яа-яІіЇїЄєA-Za-z0-9]+/g) || [];
        const words2 = input2.value.toLowerCase().match(/[А-Яа-яІіЇїЄєA-Za-z0-9]+/g) || [];

        const set1 = new Set(words1); //Set автоматично усуває дублікати та дає швидку перевірку
        const set2 = new Set(words2);

        const common = [...set1].filter(w => set2.has(w)); //залишаємо лише ті слова з set1, які також містяться у set2.

        if (common.length > 0) {
            result.textContent = common.join(', ');
        } else {
            result.textContent = 'Немає спільних слів';
        }

    });
});
