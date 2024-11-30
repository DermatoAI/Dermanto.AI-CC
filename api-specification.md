# APPLICATION SPECIFICATION

## Endpoint Google OAuth2
- /users
    - /auth/google
        - /callback

## Structure Request and Response body

[GET] /auth/google

### Response

if already exixts

```json
{
    message: 'User already exists in database',
    data: {
        name: xxx,
        email: xxx,
        role: 'user',
        picture: xxx,
    }
}
```

if doesn't exist yet
```json
{
    message: 'New user added to database',
    data: {
        name: xxx,
        email: xxx,
        role: 'user',
        picture: xxx,
    }
}
```

[POST] /users/signup

### Request
```json
{
    name: xxx,
    email: xxx,
    password: xxx,
    role: 'user'
}
```

### Response
if doesn't exist yet
```json
{
    message: 'create new user success',
    data: {
        name: xxx,
        email: xxx,
        role: 'user'
    }
}
```

[POST] /users/signin

### Request
```json
{
    email: xxx,
    password: xxx,
}
```

### Response
if doesn't exist yet
```json
{
    message: 'User not found',
    data: null
}
```

if already exist yet
```json
{
    message: 'Login successfully',
    data: {
        id: xxx,
        email: xxx,
    }
}
```

if already exist but wrong password
```json
{
    message: 'Wrong password',
    data: null
}
```