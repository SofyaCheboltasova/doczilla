# Проект

Этот репозиторий содержит два независимых приложения: `task1` и `task2`.

## Запуск `task1`:

```bash
cd task1
javac Main.java
java Main
```

## Запуск `task2`

`task2` состоит из клиентской и серверной частей, а также базы данных PostgreSQL. Чтобы запустить все компоненты `task2`, выполните следующие шаги:

```bash
cd task2
docker-compose up --build
```

- **Клиент**: Доступен по адресу `http://localhost:3000`
- **Сервер**: Доступен по адресу `http://localhost:8080`
- **PostgreSQL**: Работает на `localhost:5432`

## Остановка и удаление контейнеров

Чтобы остановить и удалить контейнеры, используйте команду:

```bash
docker-compose down

```
