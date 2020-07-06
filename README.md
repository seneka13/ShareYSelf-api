# Фейковый API для сайта ToMySelf

### Запуск

```sh
npm start
```


Для установки пакетов, перед запуском ипользуйте 

```sh
npm install
```

Запускается на порту 5432


### Роутинг

> `GET` /data

отдает вам текст, если вы авторизованы

для подтверждения авторизации отправляйте в запросе заголовок: `X-Auth:  ${your_token}`


> `POST` /login

вход 

```sh
body: {
  username: string (required),
  password: string (required),
}
```


> `POST` /signin

```sh
body: {
  firstname: string (required),
  lastname: string (required),
  username: string (required),
  password: string (required),
}
```

регистрация


#### По умолчанию есть зарегистрированный пользователь

```sh
username: 'admin'
password: '1234'
```