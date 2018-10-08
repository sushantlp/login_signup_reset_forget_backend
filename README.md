# login_signup_reset_forget_backend

<h4 align="center">
  Node.js Backend 
</h4>



## Features

* Login
* Signup
* Forget Password
* Reset Password


# Requirements

* node.js
* Sequelize 
* Mysql

# Running

```bash
> npm install
> mysql -u root -p
> create database your database name
> sequelize db:migrate
> node server.js
```

## Configuring API URL

When developing locally the url can be changed by defining the `API_URL` environment variable

```bash
> APP_ENV = local

>DB_HOST=127.0.0.1
>DB_DATABASE=task
>DB_USERNAME=Your database username
>DB_PASSWORD=Your database password
>DB_PORT=3306
>DB_DRIVER=mysql

>PRODUCTION_URL="" 
>DEVELOPMENT_URL=http://localhost::8080/

>MAIL_DRIVER=smtp
>MAIL_HOST=smtp.gmail.com
>MAIL_PORT=587
>MAIL_USERNAME=****@gmail.com
>MAIL_PASSWORD=*******
>MAIL_ENCRYPTION=tls
```

```

