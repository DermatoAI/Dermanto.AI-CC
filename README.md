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
  "image": "image.png",
  "userId": "test1"
}
```

**Validation Rules:**
* Image format: JPEG, PNG
* Maximum size: 10 MB
* Input Shape: 180x180 px


## Response
**Success Response (Confidence Score > 92):**

**Status Code:** 201 Created
```
{
    "status": "success",
    "message": "Image successfully analyzed",
    "data": {
        "imageId": "https://storage.googleapis.com/dermatoai-storage/85177215-47f0-4621-b172-1e3a53bbb0ca.jpg",
        "diagnosis": "Eczema",
        "confidence": 99.96092915534973,
        "timestamp": "2024-12-12T11:49:14.550Z",
        "userId": "test1"
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
        "imageId": "https://storage.googleapis.com/dermatoai-storage/9b8534d0-3f85-4d65-80f3-c0144f5a7fbe.jpg",
        "diagnosis": "Urticaria Hives",
        "confidence": 57.009126676768833,
        "timestamp": "2024-12-12T11:49:14.550Z",
        "userId": "test1"
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
