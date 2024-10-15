# Используем официальный образ Node.js для сборки приложения
FROM node:22 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Пробрасываем переменные окружения в build-команду
ARG REACT_APP_LOGIN
ARG REACT_APP_PASSWORD
ARG REACT_APP_LOGIN_API
ARG REACT_APP_ACCESS_TOKEN
ARG REACT_APP_CARDS_API
ARG REACT_APP_UPDATE_USER_API
ARG REACT_APP_SET_USER_API

# Копируем остальные файлы приложения
COPY . .

# Сборка приложения
RUN REACT_APP_LOGIN=$REACT_APP_LOGIN \
    REACT_APP_PASSWORD=$REACT_APP_PASSWORD \
    REACT_APP_LOGIN_API=$REACT_APP_LOGIN_API \
    REACT_APP_ACCESS_TOKEN=$REACT_APP_ACCESS_TOKEN \
    REACT_APP_CARDS_API=$REACT_APP_CARDS_API \
    REACT_APP_UPDATE_USER_API=$REACT_APP_UPDATE_USER_API \
    REACT_APP_SET_USER_API=$REACT_APP_SET_USER_API \
    npm run build

# Используем nginx для сервировки статических файлов
FROM nginx:alpine

# Копируем сборку приложения в папку nginx
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
