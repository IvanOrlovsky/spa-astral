# Этап сборки
FROM node:22 AS build
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы приложения
COPY . .

# Устанавливаем переменные окружения
ARG REACT_APP_LOGIN
ARG REACT_APP_PASSWORD
ARG REACT_APP_LOGIN_API
ARG REACT_APP_ACCESS_TOKEN
ARG REACT_APP_CARDS_API
ARG REACT_APP_GET_USER_API
ARG REACT_APP_SET_USER_API

# Сборка приложения
RUN npm run build

# Этап сборки образа на базе Nginx для сервировки приложения
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
