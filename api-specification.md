# APPLICATION SPECIFICATION

# Endpoint Google OAuth2
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
# Endpoint Signin/Signup (Opsional)
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

## Endpoint doctors
- /doctors
    - /all

## [GET] /doctors/all
```json
{
    "message": "get all doctors success",
    "data": [
        {
            "id": "doc001",
            "name": " dr. Adi Satriyo, Sp.KK",
            "address": "Jakarta Selatan"
        }
    ]
}
```
## Structure Request and Response body

## Endpoint Apointments
- /appointments
    - /all
    - /create
    - /update/:id
    - /delete/:id 

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
    "user_id": "user123",
    "doctor_id": "doc001",
    "appointment_date": "01-01-2024 10.00",
    "status": ["upcoming", "completed", "canceled"]
}
```
### response
```json
{
    "message": "create new appointments success",
    "data": {
        "user_id": "user123",
        "doctor_id": "doc001",
        "appointment_date": "01-01-2024 10.00",
        "status": "upcoming"
    }
}
```

## [POST] /appointments/update/:id

### request
```json
{
    "user_id": "user123",
    "doctor_id": "doc001",
    "appointment_date": "01-01-2024 10.00",
    "status": "upcoming"
}
```
### response
```json
{
    "message": "update appointments success",
    "data": {
        "id": "meet828300",
        "user_id": "user123",
        "doctor_id": "doc001",
        "appointment_date": "01-01-2024 10.00",
        "status": "upcoming"
    }
}
```

## [DELETE] /appointments/delete/:id
### response
```json
{
    "message": "delete appointments success",
    "data": {}
}
```

## Endpoint Dicussion Forum
- /api/discussions
    - /
    - /all
    - /user/:id
    - /:id
- /api/comments
    - /
    - /:discussionId/:commentId
- /api/likes
    - /

## Structure Request and Response body

## [POST] /api/discussions/

### request
```json
{
    "user_id": "user123",
    "doctor_id": "doc001",
    "appointment_date": "01-01-2024 10.00",
    "status": "upcoming"
}
```
### response
```json
{
    "message": "update appointments success",
    "data": {
        "id": "meet828300",
        "user_id": "user123",
        "doctor_id": "doc001",
        "appointment_date": "01-01-2024 10.00",
        "status": "upcoming"
    }
}
```

## [POST] /api/discussions/

### Request

### Headers

| Name         | Type   | Required | Description                   |
| ------------ | ------ | -------- | ----------------------------- |
| Content-Type | string | Yes      | Must be `multipart/form-data` |

### Body Parameters (Form-Data)

| Name     | Type   | Required | Description                                           |
| -------- | ------ | -------- | ----------------------------------------------------- |
| title    | string | Yes      | The title of the discussion.                          |
| content  | string | Yes      | The content of the discussion.                        |
| category | string | Yes      | The category of the discussion. Example: `lifestyle`. |
| userId   | string | Yes      | The user ID creating the discussion.                  |
| file     | file   | Yes      | The file to be uploaded.                              |

### Example Request (Postman)
```
Key         | Value
------------|----------------------------------
title       | Diskusi Baru
content     | Ini adalah konten
category    | lifestyle
userId      | user123
file        | (Select a file to upload)
```

### response
```json
{
    "id": "80ZvMJFFe1ZrcEjbRrD3",
    "title": "Diskusi Baru",
    "content": "Ini adalah konten",
    "category": "lifestyle",
    "image": "https://storage.googleapis.com/bucket.firebasestorage.app/discussions.png",
    "authorId": "user123",
    "createdAt": "2024-12-11T08:36:30.696Z"
}
```
## [GET] /api/discussions/all
### response

```json
{
"status": "success",
    "message": "Get all discussions success",
    "data": [
        {
            "id": "71U3rcDHB8bebMjkZGnz",
            "title": "Diskusi Baru",
            "content": "Ini adalah konten",
            "category": "Teknologi",
            "image": "https://storage.googleapis.com/bucket.firebasestorage.app/discussions.png",
            "authorId": "user123",
            "createdAt": "2024-12-11T08:36:30.696Z"
        },
    ]
}
```
## [GET] /api/discussions/:id

### response

```json
{
    "id": "wHjqbpy9OYyJaita0F6u",
    "title": "Diskusi Baru",
    "content": "Ini adalah konten",
    "category": "Teknologi",
    "image": "https://storage.googleapis.com/bucket.firebasestorage.app/discussions.png",
    "authorId": "user123",
    "createdAt": {
        "_seconds": 1733886994,
        "_nanoseconds": 949000000
    }
}
```

## [GET] /api/discussions/user/:id

### response

```json
[
    {
        "id": "71U3rcDHB8bebMjkZGnz",
        "title": "Diskusi Baru",
        "content": "Ini adalah konten",
        "category": "Teknologi",
        "image": "https://storage.googleapis.com/dermato-ai-441813.firebasestorage.app/discussions%2Fca8351ad-5229-47b8-b46b-a5927114c5e9-Virtual%20Background%20Bangkit%202024.png",
        "authorId": "user123",
        "createdAt": "2024-12-11T08:36:30.696Z"
    },
]
```

## [POST] /api/comments/
### request
```json
{
    "discussionId": "71U3rcDHB8bebMjkZGnz",
    "userId": "user123",
    "content": "sangat membantu!"
}
```

### response
```json
{
    "message": "Comment added successfully"
}
```
## [POST] /:discussionId/:commentId
### response
```json
{
    "message": "Comment deleted successfully"
}
```
## [POST] /api/likes
### request
```json
{
    "discussionId": "71U3rcDHB8bebMjkZGnz",
    "userId": "user123"
}
```

### response
If the comment has not been liked, it will add likes
```json
{
    "message": "Discussion liked"
}
```
If a comment has been liked, the like will be deleted
```json
{
    "message": "Like removed"
}
```