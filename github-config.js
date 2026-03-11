// github-config.js - НЕ ВЫКЛАДЫВАЙ В РЕПО С РЕАЛЬНЫМИ ДАННЫМИ!

// НАСТРОЙКИ GITHUB (ЗАМЕНИ НА СВОИ)
const GITHUB_CONFIG = {
    username: 'teledevgram-wq',           // Твой ник на GitHub
    repo: 'redsr43fe3e2rfee3w', // Название репозитория
    token: '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' // Токен (получи выше)
};

// Сохраняем в localStorage для безопасности
localStorage.setItem('github_config', JSON.stringify(GITHUB_CONFIG));
