// script.js - ИСПРАВЛЕННАЯ ВЕРСИЯ

// Конфигурация
const GAMES_JSON = 'games.json';
const USERS_JSON = 'users.json';
const REVIEWS_JSON = 'reviews.json';
const SUGGESTIONS_JSON = 'suggestions.json';

// Ваши данные для входа
const ADMIN_USERNAME = '9nge';
const ADMIN_PASSWORD = '56809gghh123';

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт загружен');
    checkAuth();
    updateUserMenu();
    
    // Загружаем игры на главной
    if (document.getElementById('gamesGrid')) {
        loadGames();
    }
});

// ========== АВТОРИЗАЦИЯ ==========

function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        const userData = JSON.parse(user);
        console.log('Текущий пользователь:', userData);
        return userData;
    }
    return null;
}

function updateUserMenu() {
    const menu = document.getElementById('userMenu');
    if (!menu) return;
    
    const user = checkAuth();
    console.log('Обновление меню, пользователь:', user);
    
    if (user) {
        // Проверяем, админ ли это (строгое сравнение)
        const isAdmin = (user.username === ADMIN_USERNAME && user.password === ADMIN_PASSWORD);
        console.log('Это админ?', isAdmin);
        
        let menuHTML = `<span class="username">${user.username}</span>`;
        
        // Только если реально админ - показываем кнопку admin
        if (isAdmin) {
            menuHTML += `<a href="admin.html" class="admin-link">ADMIN</a>`;
        }
        
        menuHTML += `<span class="logout-btn" onclick="logout()">ВЫЙТИ</span>`;
        menu.innerHTML = menuHTML;
    } else {
        menu.innerHTML = `<a href="login.html" class="login-link">ВОЙТИ</a>`;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ========== ЗАГРУЗКА ИГР ==========

// Добавьте в script.js

async function loadGames() {
    const grid = document.getElementById('gamesGrid');
    if (!grid) return;
    
    try {
        // Пробуем загрузить из GitHub Pages (games.json в репозитории)
        const response = await fetch('games.json?t=' + Date.now());
        
        if (!response.ok) {
            throw new Error('Не удалось загрузить');
        }
        
        const games = await response.json();
        
        if (!games || games.length === 0) {
            grid.innerHTML = '<div class="loading">ИГР ПОКА НЕТ</div>';
            return;
        }
        
        // Сортируем по дате добавления
        games.sort((a, b) => new Date(b.added || 0) - new Date(a.added || 0));
        
        grid.innerHTML = games.map(game => `
            <div class="game-card" onclick="window.location.href='game.html?id=${game.steam_id}'">
                <img src="${game.header_image || 'https://via.placeholder.com/460x215/333/666?text=NO+IMAGE'}" 
                     alt="${game.name}" 
                     class="game-header-img"
                     onerror="this.src='https://via.placeholder.com/460x215/333/666?text=NO+IMAGE'">
                
                <div class="game-info">
                    <h2 class="game-title">${game.name || 'БЕЗ НАЗВАНИЯ'}</h2>
                    <p class="game-description">${(game.description || '').substring(0, 100)}...</p>
                    <div class="game-price">${game.price || 'БЕСПЛАТНО'}</div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        grid.innerHTML = '<div class="error">⚠️ ОШИБКА ЗАГРУЗКИ</div>';
    }
}

