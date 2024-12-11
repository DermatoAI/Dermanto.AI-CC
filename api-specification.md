# APPLICATION SPECIFICATION

## Endpoint Google OAuth2
- /users
    - /auth/google
        - /callback

## Structure Request and Response body

## [GET] /auth/google

### Response

if already exixts

```json
{
    "message": "User already exists in database",
    "data": {
        "username": "user123",
        "name": "User Test",
        "email": "user@test.com",
        "picture": "https://lh3.googleusercontent.com/jdkfhsikanf"
    }
}
```

if doesn't exist yet
```json
{
    "message": "New user added to database",
    "data": {
        "username": "user123",
        "name": "User Test",
        "email": "user@test.com",
        "picture": "https://lh3.googleusercontent.com/jdkfhsikanf"
    }
}
```
## Endpoint Signin/Signup (Opsional)
- /users
    - /signup
    - /signin

## Structure Request and Response body

## [POST] /users/signup

### Request
```json
{
    "username": "user123",
    "email": "user@test.com",
    "password": "admin123",
}
```

### Response
if doesn't exist yet
```json
{
    "message": "create new user success",
    "data": {
        "name": "user123",
        "email": "user@test.com",
    }
}
```

## [POST] /users/signin

### Request
```json
{
    "username": "user123",
    "password": "admin123"
}
```

### Response
if doesn't exist yet
```json
{
    "message": "User not found",
    "data": null
}
```

if already exist yet
```json
{
    "message": "Login successfully",
    "data": {
        "username": "user123",
        "email": "user@test.com",
    }
}
```

if already exist but wrong password
```json
{
    "message": "Wrong password",
    "data": null
}
```


## Endpoint Apointments
- /appointments
    - /all
    - /create
    - /update/id
    - /delete/id 

## Structure Request and Response body

## [GET] /appointments/all
### response
```json
{
    "message": "get all appointments success",
    "data": [
        {
            "id": "meet309648",
            "user_id": "user123",
            "doctor_id": "doc001",
            "appointment_date": "01-01-2024 10.00",
            "status": "upcoming",
            "created_at": "December 10, 2024 at 8:28:47 PM UTC+7"
        }
    ]
}
```

## [POST] /appointments/create

### request
```json
{
    "user_id": "x",
    "doctor_id": "x",
    "appointment_date": "xxxx",
    "status": "xxxx"
}
```
### response
```json
{
    "message": "create new appointments success",
    "data": {
        "user_id": "x",
        "doctor_id": "x",
        "appointment_date": "xxxx",
        "status": "xxxx"
    }
}
```

## [PATCH] /appointments/update/id

### request
```json
{
    "user_id": "x",
    "doctor_id": "x",
    "appointment_date": "xxxx",
    "status": "xxxx"
}
```
### response
```json
{
    "message": "update appointments success",
    "data": {
        "id": "x",
        "user_id": "x",
        "doctor_id": "x",
        "appointment_date": "xxxx",
        "status": "xxxx"
    }
}
```

## [DELETE] /appointments/delete/id
### response
```json
{
    "message": "delete appointments success",
    "data": {}
}
```