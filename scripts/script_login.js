document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let login = document.getElementById('login').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Replace зайвих символів
    login = login.replace(/[^a-zA-Z0-9_]/g, '');
    document.getElementById('login').value = login;
    console.log('Login після replace:', login);

    const loginPattern = /^[a-zA-Z0-9_]{3,}$/;
    if (!loginPattern.test(login)) {
      alert('Невірний логін!');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Невірний email!');
      return;
    }

    const phonePattern = /^\+380\d{9}$/;
    if (!phonePattern.test(phone)) {
      alert('Невірний телефон!');
      return;
    }

    console.log('Login:', login);
    console.log('Email:', email);
    console.log('Phone:', phone);
    alert('Всі дані введені правильно!');
  });
});
