# Dermato.AI Project Cloud Computing - Documentation

# Introduction
This API is designed to support the development of Dermato.AI applications that provide user application management features, AI-based skin analysis, and chatbots. The main purpose of this API is to facilitate communication between the frontend and backend and integration with Machine Learning models, allowing users to access services quickly and efficiently.

# Purpose
* **User Management API:** Manage user features, such as account registration, authentication, personal data management, appointments, and discussion forums.

* **Skin Analysis API:** Analyze skin images uploaded by users to detect skin problems such as acne, chicken pox, or other conditions.

* **Chatbot API:** Provide automated responses to users regarding questions about skin health.

For more technical details, each API has specific documentation that can be accessed through the following links:
1. [User Management](#https://github.com/DermatoAI/Dermato.AI-CC/blob/dikrifzn/api-specification.md)
2. [Skin Analysis](#hhttps://github.com/DermatoAI/Dermato.AI-CC/blob/analyze-skin/README.md)
3. [Chatbot](#https://github.com/DermatoAI/Dermato.AI-CC/blob/chatbot/README.md)

# API Structure
The following documentation describes the various API endpoints available in the Dermato.AI project. Each endpoint includes an explanation of the functionality, the HTTP method used, and the parameters accepted.
## 1. User Management API
**POST /users/auth/google:** Authenticates a user using Google OAuth2.

**POST /users/signup:** Sign up for a new user account.

**POST /users/signin:** Authenticate the user using username and password.

**GET /doctors/all:** Get a list of all available doctors.

**GET /appointments/all:** Get a list of all the user's appointments.

**POST /appointments/create:** Create a new appointment.

**POST /appointments/update/{id}:** Update an appointment by ID.

**DELETE /appointments/delete/{id}:** Delete an appointment by ID.

**POST /api/discussions/all:** Get a list of all discussions.

**POST /api/discussions:** Create a new discussion.

**POST /api/comments:** Add a comment to a discussion.

**DELETE /api/comments/{discussionId}/{commentId}:** Delete a comment from a discussion.

**POST /api/likes:** Like a discussion or comment.

## 2. Skin Analysis API
**POST /analyze-skin:** Sends an image of skin to be analyzed by a machine learning model.

## 3. Chatbot API
**POST /chatbot:** Receives a message from the user, processes it with a chatbot model, and returns a response based on the predicted intent.

# Error Handling
Each API response will include an appropriate HTTP status code and an error message if there is a problem. Here are some of the status codes used in this API:

**200 OK:** The request was successful.

**400 Bad Request:** The request is invalid or there are missing parameters.

**401 Unauthorized:** The user is not authenticated or the token is invalid.

**500 Internal Server Error:** An error occurred on the server.

# Deployment and Infrastructure
This API is deployed using **Google Cloud Platform** using services like Artifact Registry to create container images that are then used in Cloud Run as the API deployment process. All data will be stored in Firestore and Cloud Storage.
