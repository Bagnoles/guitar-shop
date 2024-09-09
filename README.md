# Проект Guitar-shop

Проект для профессии Fullstack - разработчик


## Запуск проекта
Запуск внешних сервисов осуществляется через Docker, в корне проекта есть файл `docker-compose.yml`  
_Также перед запуском необходимо установить все зависимости из корня проекта и из директории **frontend**._

### 1. Генерация тестовых данных для базы данных:
Приложение предоставляет CLI.

Выполнить команду 
```
npm run cli -- --generate n connection-string
```

Более подробную информацию можно увидеть по команде 
```
npm run cli -- --help
```

### 2. Запуск сервера:

Выполнить команду 
```
npm run start:dev
```

### 3. Запуск фронтенда:

Из корня проекта перейти в директорию `frontend` , например `cd frontend/`

Выполнить команду 
```
npm start
```

**Переменные окружения** (для примера файл .env-example в корне проекта)   
`DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME` — настройки для подключения к MongoDB  
`JWT_SECRET` — секрет для подписи токена  
`SALT` — соль для хэширования паролей  