// script.js - ТОЛЬКО ДЛЯ ГЛАВНОЙ СТРАНИЦЫ

document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена');
    loadGames();
});

async function loadGames() {
    const grid = document.getElementById('gamesGrid');
    if (!grid) {
        console.error('Нет элемента gamesGrid');
        return;
    }
    
    try {
        console.log('Загружаем games.json...');
        
        // Добавляем параметр чтобы не кэшировалось
        const response = await fetch('games.json?t=' + Date.now());
        
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        
        const games = await response.json();
        console.log('Загружено игр:', games.length);
        
        if (!games || games.length === 0) {
            grid.innerHTML = '<div class="loading">⚠️ ИГР ПОКА НЕТ</div>';
            return;
        }
        
        // Отображаем игры
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
        grid.innerHTML = '<div class="error">⚠️ ОШИБКА ЗАГРУЗКИ: ' + error.message + '</div>';
    }
}
