# API Specification for Skin Analysis

## Base URL
```
http://localhost:3000
```

## Endpoint: Analyze Skin
**URL:** /analyze-skin

**Method:** POST

**Description:** Mengirim gambar kulit untuk dianalisis oleh model ML dan menerima diagnosis, tingkat keyakinan, serta saran perawatan.

### Request
**Header**
```
{
  "Authorization": "Bearer <token>"
}
```
**Payload:** (multipart/form-data)
| Key    | Type  | Required | Description                   |
|--------|-------|----------|-------------------------------|
| image  | File  | Yes      | Gambar yang akan dianalisis   |

**Validation Rules:**
* Format gambar: JPEG, PNG
* Ukuran maksimum: 2 MB

### Response
**Success Response (Confidence Score > 99):**

**Status Code:** 201 Created
```
{
  "message": "Image successfully analyzed.",
  "result": {
    "imageId": "<UUID>",
    "diagnosis": "<Diagnosis result>",
    "confidence": 99.8,
    "treatmentSuggestions": "<Treatment suggestions>",
    "timestamp": "<time>",
    "user_id": "<User ID>"
  }
}
```
**Partial Success Response (Confidence Score ≤ 99):**

**Status Code:** 201 Created
```
{
  "message": "Image successfully analyzed but under threshold. Please use the correct picture.",
  "result": {
    "imageId": "<UUID>",
    "diagnosis": "<Diagnosis result>",
    "confidence": 85.2,
    "treatmentSuggestions": "<Treatment suggestions>",
    "timestamp": "<time>",
    "user_id": "<User ID>"
  }
}
```

**Error Responses**
| Status Code   | Message                                    |
|---------------|--------------------------------------------|
| 400           | "Validation error: Invalid image format."  |
| 401           | "Authentication required."                 |
| 500           | "Internal Server Error."                   |
