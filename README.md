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

**Description:** 

Send skin images to be analyzed using machine learning models that can detect certain skin conditions.


## Request

**Headers**
```
Content-Type: multipart/form-data
```

**Request Body (Payload)**

The request body must use the multipart/form-data format and include two main parameters: image and userId.

**Body (JSON):**
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
### Success Response (Confidence Score > 92)

**Status Code:** 201 Created

**Condition:**

The request was successfully processed and the image was successfully analyzed with a confidence level of more than 92%.

**Body (JSON):**
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

### Partial Success Response (Confidence Score ≤ 92)

**Status Code:** 201 Created

**Condition:**

The request was successfully processed, but the analysis result has a confidence level of less than or equal to 92%. It is recommended to send a clearer or more precise image.

**Body (JSON):**
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

### Error Responses
**Status Code:** 413 Payload Too Large

**Condition:**

The payload (image) size is larger than the maximum allowed limit (10 MB).

**Body (JSON):**
```
{
  "status": "fail",
  "message": "Payload content length greater than maximum allowed: 10000000"
}
```

**Status Code:** 400 Input Error

**Condition:**

There was an error in the input provided, such as an invalid image format or a missing parameter.

**Body (JSON):**
```
{
  "status": "fail",
  "message": "<error-message>"
}
```
