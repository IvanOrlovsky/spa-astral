# Используем официальный образ Node.js для сборки приложения
FROM node:22 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Сборка приложения
RUN npm run build

# Используем nginx для сервировки статических файлов
FROM nginx:alpine

# Копируем сборку приложения в папку nginx
COPY --from=build /app/build /usr/share/nginx/html

# Переменные окружения
ARG REACT_APP_LOGIN
ARG REACT_APP_PASSWORD
ARG REACT_APP_LOGIN_API
ARG REACT_APP_ACCESS_TOKEN
ARG REACT_APP_CARDS_API
ARG REACT_APP_GET_USER_API
ARG REACT_APP_SET_USER_API

ENV REACT_APP_LOGIN=$REACT_APP_LOGIN
ENV REACT_APP_PASSWORD=$REACT_APP_PASSWORD
ENV REACT_APP_LOGIN_API=$REACT_APP_LOGIN_API
ENV REACT_APP_ACCESS_TOKEN=$REACT_APP_ACCESS_TOKEN
ENV REACT_APP_CARDS_API=$REACT_APP_CARDS_API
ENV REACT_APP_GET_USER_API=$REACT_APP_SET_USER_API
ENV REACT_APP_SET_USER_API=$REACT_APP_SET_USER_API

# Экспонируем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
