// auth.js - отдельный файл для авторизации
console.log('auth.js загружен');

// ========== АВТОРИЗАЦИЯ ==========

// ВАЖНО: Твой админский аккаунт
const ADMIN_USERNAME = '9nge';
const ADMIN_PASSWORD = '56809gghh123';

// Проверка авторизации
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        try {
            return JSON.parse(user);
        } catch {
            return null;
        }
    }
    return null;
}

// Выход
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Вход
async function login() {
    console.log('Попытка входа...');
    
    const username = document.getElementById('loginUsername')?.value;
    const password = document.getElementById('loginPassword')?.value;
    
    if (!username || !password) {
        alert('Введите логин и пароль');
        return;
    }
    
    // Для теста - разрешаем вход с любыми данными
    // Но для админа - строгая проверка
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const user = { username: ADMIN_USERNAME, password: ADMIN_PASSWORD, isAdmin: true };
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Вход выполнен!');
        window.location.href = 'admin.html';
        return;
    }
    
    // Для обычных пользователей - просто сохраняем
    const user = { username: username, password: password, isAdmin: false };
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Вход выполнен!');
    window.location.href = 'index.html';
}

// Регистрация
function register() {
    console.log('Попытка регистрации...');
    
    const username = document.getElementById('regUsername')?.value;
    const password = document.getElementById('regPassword')?.value;
    const password2 = document.getElementById('regPassword2')?.value;
    
    if (!username || !password) {
        alert('Заполните все поля');
        return;
    }
    
    if (password !== password2) {
        alert('Пароли не совпадают');
        return;
    }
    
    if (username.length < 3) {
        alert('Никнейм должен быть минимум 3 символа');
        return;
    }
    
    if (password.length < 3) {
        alert('Пароль должен быть минимум 3 символа');
        return;
    }
    
    // Сохраняем в localStorage
    const user = { username: username, password: password, registered: new Date().toISOString() };
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    alert('Регистрация успешна!');
    window.location.href = 'index.html';
}

// Обновление меню пользователя
function updateUserMenu() {
    const menu = document.getElementById('userMenu');
    if (!menu) return;
    
    const user = checkAuth();
    console.log('Текущий пользователь:', user);
    
    if (user) {
        // Проверка на админа
        const isAdmin = (user.username === ADMIN_USERNAME && user.password === ADMIN_PASSWORD);
        
        let menuHTML = `<span class="username">${user.username}</span>`;
        
        if (isAdmin) {
            menuHTML += `<a href="admin.html" class="admin-link">ADMIN</a>`;
        }
        
        menuHTML += `<span class="logout-btn" onclick="logout()">ВЫЙТИ</span>`;
        menu.innerHTML = menuHTML;
    } else {
        menu.innerHTML = `<a href="login.html" class="login-link">ВОЙТИ</a>`;
    }
}

// Функции для переключения форм
function showLogin() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
    if (loginBtn) {
        loginBtn.style.background = '#000';
        loginBtn.style.color = '#fff';
    }
    if (registerBtn) {
        registerBtn.style.background = '#fff';
        registerBtn.style.color = '#000';
    }
}

function showRegister() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'block';
    if (loginBtn) {
        loginBtn.style.background = '#fff';
        loginBtn.style.color = '#000';
    }
    if (registerBtn) {
        registerBtn.style.background = '#000';
        registerBtn.style.color = '#fff';
    }
}
