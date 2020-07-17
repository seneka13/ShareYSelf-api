# Фейковый API для веб приложения ShareYSelf

### Запуск

```sh
npm start
```


Для установки пакетов, перед запуском ипользуйте 

```sh
npm install
```

### API запускается на порту 8220


## Роутинг пользователя


### Получение данных

> `GET` /get-user

Получает данные пользователя при регистрации или входе.
Для подтверждения авторизации отправляйте в запросе заголовок: `X-Auth:  ${your_token}`


### Вход 

> `POST` /login

```sh
body: {
  username: string (required),
  password: string (required),
}
```


### Регистрация

> `POST` /signup

```sh
body: {
  firstname: string (required),
  lastname: string (required),
  username: string (required),
  password: string (required),
}
```


### Изменение пароля

`PUT` /edit-password/:id

```sh
 body: {
  id: string (required)
  password: string (required),
}
```


#### По умолчанию есть зарегистрированный пользователь

```sh
username: 'admin'
password: '1234'
```




## Роутинг событий

### Получение данных

> `GET` /get-events

Получает данные всех созданных событий


### Создание события

> `POST` /create-event

```sh
body: {
      id: string (required),
      eventname: string (required),
      place: string (required),
      date: string (required),
      time: string (required),
      desc: string (required),
      author: string (required),
}
```


### Удаление события

> `DELETE` /delete-event/:id

```sh
body: {
      id: string (required),
}
```


### Изменение события

> `PUT` /edit-event/:id

```sh
body: {
      id: string (required),
      eventname: string (required),
      place: string (required),
      date: string (required),
      time: string (required),
      desc: string (required),
      author: string (required),
}
```

