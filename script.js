// ожидание полной загрузки перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
    
    // получение ссылки на форму входа по её ID
    const loginForm = document.getElementById('loginForm');
    // на поле ввода имени пользователя
    const usernameInput = document.getElementById('username');
    //  на поле ввода пароля
    const passwordInput = document.getElementById('password');
    //  на кнопку отправки формы
    const submitBtn = document.getElementById('submitBtn');
    //  на div для отображения сообщений пользователю
    const messageDiv = document.getElementById('message');

    /**
     * функция для отображения сообщений
     * @param {string} text - Текст 
     * @param {string} type - Тип (success, error, info)
     */
    function showMessage(text, type) {
        // установка текста сообщения
        messageDiv.textContent = text;
        // установка CSS класса для стилизации сообщения
        messageDiv.className = `message ${type}`;
    }

    // обработчик события отправки формы
    loginForm.addEventListener('submit', async function(e) {
        // Отмена перезагрузки страницы
        e.preventDefault();

        // получение значения имени пользователя без пробелов
        const username = usernameInput.value.trim();
        // получение значения пароля без пробелов
        const password = passwordInput.value.trim();

        // проерка заполненности
        if (!username || !password) {
            // сообщение об ошибке
            showMessage('Пожалуйста, заполните все поля', 'error');
            return; 
        }

        // отмена повторной отправки
        submitBtn.disabled = true;
        // смена на индикатор процесса
        submitBtn.textContent = 'Вход...';
        // сообщение о начале процесса входа
        showMessage('Выполняется вход...', 'info');

        try {
            // POST запрос к API авторизации
            const response = await fetch('https://our_server', { //сервак свой указать
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', //  тип отправляемых данных
                },
                // данные в JSON строку 
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            //  ответ от сервера
            const data = await response.json();

            // успешность запроса 
            if (response.ok) {
                // сообщение об успешном входе
                showMessage('Вход выполнен успешно!', 'success');
                
                // наличие токена в ответе
                if (data.token) {
                    // токен в localStorage для последующих запросов
                    localStorage.setItem('token', data.token);
                }
                
                // очистка поля формы
                loginForm.reset();
                
                // перенаправление
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
                
            } else {
                showMessage(data.message || 'Ошибка входа', 'error');
            }
        } catch (error) {
            showMessage('Ошибка соединения с сервером', 'error');
            // в консоль для отладки
            console.error('Login error:', error);
        } finally {
            // разблокировка кнопки отправки
            submitBtn.disabled = false;
            // исходный текст кнопки
            submitBtn.textContent = 'Войти';
        }
    });
});