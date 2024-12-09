# API Specification: Chatbot API

### Base URL
```
http://localhost:3000
```

**Endpoint:** /chatbot

**Method:** POST

**Description:** Menerima pesan dari pengguna, memprosesnya dengan model chatbot, dan mengembalikan respons berdasarkan intent yang diprediksi.

### Request
**Content-Type:** application/json
**Body (JSON):**
```
{
  "message": "Your message here"
}
```

### Response
**Content-Type:** application/json
**Body (JSON):**
* Sukses (200 OK):
```
{
  "response": "Chatbot's response message"
}
```

* Error (400 Bad Request):
```
{
  "error": "No message provided"
}
```

* Error (500 Internal Server Error):
```
{
  "error": "An error occurred: <error_description>"
}
```
