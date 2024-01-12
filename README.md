## Lab11 ##

## Как запусить ##


Установить зависимости для клиента

```

npm i
```

Дальше в папке сервера изменить файл bd.js

```
module.exports = new Sequelize(
    'Isaksystem',
    'postgres',
    'свой пароль',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: '5432'
    }

)
```

***Нужно заранее забекапить БД в postgres *** 

Запусить сервер

```
cd ..\server

npm node server.js
```

Запустить клиент

```

npm start
```