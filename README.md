
# Assignment

Nodejs, express, typescript mongoosee RESTApi





## Installation

Install with yarn

```bash
  yarn install
```
    
## Dependencies Intal

yarn add @sendgrid/mail bcrypt config cookie-parser dayjs express joi jsonwebtoken lodash mongoose multer nodemailer nodemailer-sendgrid passport  

Dev Dependencies
yarn add -D @types/bcrypt @types/config @types/cookie-parser @types/express @types/jsonwebtoken @types/lodash 
@types/multer @types/node @types/nodemailer @types/nodemailer-sendgrid @types/passport @types/passport-jwt ts-node-dev typescript 


## Run Project

```bash
  yarn run start
```


## API Reference

#### POST signup admin user
```http
  POST http://localhost:8000/auth/signup
```
#### POST signin user
```http
  POST http://localhost:8000/auth/signin
```
#### POST create user
```http
   POST http://localhost:8000/admin/users
```
#### DELETE  user
```http
   DELETE http://localhost:8000/admin/user/{id}  
```   
#### Disable  user
```http
   PATCH http://localhost:8000/admin/user/{id} 
```
#### Get all non admin user list
```http
   GET http://localhost:8000/admin/users
```  
#### Change user password
```http
   POST http://localhost:8000/user/change_pasword
``` 
#### Update user profile
```http
   POST http://localhost:8000/user/me
``` 
