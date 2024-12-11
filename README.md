# API Specification for Skin Analysis

# Base URL
```
http://localhost:8080
```

# Endpoint
```
/analyze-skin
```

**Method:** POST

**Description:** Send skin images to be analyzed using machine learning models that can detect certain skin conditions.


## Request

**Header**
```
Content-Type: multipart/form-data
```

**Payload**
```
{
  "image": "<file-image>",
  "userId": "<user-id>"
}
```

**Validation Rules:**
* Image format: JPEG, PNG
* Maximum size: 10 MB


## Response
**Success Response (Confidence Score > 92):**

**Status Code:** 201 Created
```
{
  "status": "success",
  "message": "Image successfully analyzed",
  "data": {
    "imageId": "<image-url>",
    "diagnosis": "<label>",
    "confidence": <confidence-score>,
    "timestamp": "<timestamp>",
    "userId": "<user-id>"
  }
}
```

**Partial Success Response (Confidence Score ≤ 92):**

**Status Code:** 201 Created
```
{
  "status": "success",
  "message": "Image successfully analyzed but under threshold. Please use the correct picture.",
  "data": {
    "imageId": "<image-url>",
    "diagnosis": "<label>",
    "confidence": <confidence-score>,
    "timestamp": "<timestamp>",
    "userId": "<user-id>"
  }
}
```

**Error Responses**
* 413 Payload Too Large
```
{
  "status": "fail",
  "message": "Payload content length greater than maximum allowed: 2000000"
}
```

* 400 Input Error
```
{
  "status": "fail",
  "message": "<error-message>"
}
```
