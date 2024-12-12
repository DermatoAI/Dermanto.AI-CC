# API Specification: Chatbot API

# Base URL
```
http://localhost:8080
```

# Endpoint
```
/chatbot
```

**Method:** POST

**Description:** 

Receives messages from users, processes them with a chatbot model, and returns responses based on predicted intents.

## Request
**Headers**
```
Content-Type: application/json
```

**Request Body:** 

It is mandatory to include the "message" key with a string value.

**Body (JSON):**
```
{
    "message": "Can you explain  what acne is?"
}
```

## Response
**Sukses (200 OK)**

**Condition:** 

The request was successfully processed, and a chatbot response was returned based on the intent.

**Body:**
```
{
    "response": "Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells. It causes whiteheads, blackheads or pimples. Acne is most common among teenagers, though it affects people of all ages.\nEffective acne treatments are available, but acne can be persistent. The pimples and bumps heal slowly, and when one begins to go away, others seem to crop up.\nDepending on its severity, acne can cause emotional distress and scar the skin. The earlier you start treatment, the lower your risk of such problems."
}
```

**Error (400 Bad Request)**

**Condition:** 

No message sent by user (body massage is empty or nonexistent).

**Body:**
```
{
  "error": "No message provided"
}
```

**Error (500 Internal Server Error)**

**Condition:**

An internal error occurred on the server while processing the request.

**Body:**
```
{
  "error": "An error occurred: <error_description>"
}
```
