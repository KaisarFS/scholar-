# SCHOOLAR API

This API provides endpoints to manage students (`mahasiswa`), courses (`matkul`), and their study plans (`rencana_studi`). The API allows you to perform CRUD operations on these entities and manage the relationships between them.

## Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MySQL** database running.
- **Postman** or another API client for testing the endpoints.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KaisarFS/scholar-api
   cd scholar-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the database connection in `project/database/config.js` with your MySQL credentials.

4. Run database migrations (if needed) to create the necessary tables.

5. Start the application:
   ```bash
   npm run dev
   ```

## API Endpoints

### 1. **Students (`mahasiswa`)**

#### **Create a Student**

- **Endpoint:** `POST /mahasiswa/stores`
- **Description:** Creates a new student.
- **Request Body:**
  ```json
  {
    "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "message": "success"
  }
  ```
- **Errors:**
  - `400 Bad Request`: If the `name` field is missing or invalid.

#### **Get Student Information**

- **Endpoint:** `GET /mahasiswa/info`
- **Description:** Retrieves a student’s information by their ID.
- **Query Parameters:**
  - `id` (required): The student's ID.
- **Response:**
  ```json
  {
    "data": {
      "id": 1,
      "name": "John Doe",
      "createdAt": "2024-09-01T03:33:07.000Z",
      "updatedAt": "2024-09-01T03:33:07.000Z"
    }
  }
  ```
- **Errors:**
  - `400 Bad Request`: If the `id` parameter is missing or invalid.
  - `404 Not Found`: If the student with the given ID does not exist.

#### **List Students with Pagination**

- **Endpoint:** `GET /mahasiswa/lists`
- **Description:** Retrieves a paginated list of students.
- **Query Parameters:**
  - `page` (optional): Page number (default is 1).
  - `limit` (optional): Number of students per page (default is 10).
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "John Doe"
      },
      ...
    ],
    "pagination": {
      "totalItems": 50,
      "totalPages": 5,
      "currentPage": 1,
      "itemsPerPage": 10
    }
  }
  ```
- **Errors:**
  - `400 Bad Request`: If pagination parameters are invalid.

#### **Delete Students (Mahasiswa)**

- **Endpoint:** `DELETE /mahasiswa/:id`
- **Description:** Deletes a mahasiswa by its ID.
- **URL Parameters:**
  - `id` (required): The mahasiswa ID.
- **Response:**
  ```json
  {
    {
      "message": "successfully deleted"
    }
  }
  ```
- **Errors:**
  - `400 Bad Request`: If the `id` parameter is missing or invalid.
  - `404 Not Found`: If the mahasiswa with the given ID does not exist.

### 2. **Courses (`matkul`)**

#### **Create a Course**

- **Endpoint:** `POST /matkul/stores`
- **Description:** Creates a new course.
- **Request Body:**
  ```json
  {
    "name": "Mathematics"
  }
  ```
- **Response:**
  ```json
  {
    "message": "success"
  }
  ```
- **Errors:**
  - `400 Bad Request`: If the `name` field is missing or invalid.

#### **Get Course Information**

- **Endpoint:** `GET /matkul/info`
- **Description:** Retrieves a course’s information by its ID.
- **Query Parameters:**
  - `id` (required): The course ID.
- **Response:**
  ```json
  {
    "data": {
      "id": 1,
      "name": "Mathematics",
      "createdAt": "2024-09-01T03:33:07.000Z",
      "updatedAt": "2024-09-01T03:33:07.000Z"
    }
  }
  ```
- **Errors:**
  - `400 Bad Request`: If the `id` parameter is missing or invalid.
  - `404 Not Found`: If the course with the given ID does not exist.

#### **List Courses with Pagination**

- **Endpoint:** `GET /matkul/lists`
- **Description:** Retrieves a paginated list of courses.
- **Query Parameters:**
  - `page` (optional): Page number (default is 1).
  - `limit` (optional): Number of courses per page (default is 10).
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Mathematics"
      },
      ...
    ],
    "pagination": {
      "totalItems": 50,
      "totalPages": 5,
      "currentPage": 1,
      "itemsPerPage": 10
    }
  }
  ```
- **Errors:**
  - `400 Bad Request`: If pagination parameters are invalid.

#### **Delete Course**

- **Endpoint:** `DELETE /matkul/:id`
- **Description:** Deletes a matkul by its ID.
- **URL Parameters:**
  - `id` (required): The matkul ID.
- **Response:**
  ```json
  {
    {
      "message": "successfully deleted"
    }
  }
  ```
- **Errors:**
  - `400 Bad Request`: If the `id` parameter is missing or invalid.
  - `404 Not Found`: If the matkul with the given ID does not exist.

### 3. **Study Plans (`rencana_studi`)**

#### **Create a Study Plan**

- **Endpoint:** `POST /rencana_studi/stores`
- **Description:** Links a student to a course by creating a study plan.
- **Request Body:**
  ```json
  {
    "id_mahasiswa": 1,
    "id_matkul": 2
  }
  ```
- **Response:**
  ```json
  {
    "message": "success"
  }
  ```
- **Errors:**
  - `401 Unauthorized`: If the student or course is not found, or if the student has already reached the maximum number of courses (3), or the course is full (4 students).

#### **List Study Plans with Grouped Courses**

- **Endpoint:** `GET /rencana_studi/lists`
- **Description:** Retrieves a list of study plans grouped by students, each with their respective courses.
- **Query Parameters:**
  - `page` (optional): Page number (default is 1).
  - `limit` (optional): Number of study plans per page (default is 10).
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "matkul": [
          {
            "id": 2,
            "name": "Mathematics"
          },
          ...
        ]
      },
      ...
    ],
    "pagination": {
      "totalItems": 50,
      "totalPages": 5,
      "currentPage": 1,
      "itemsPerPage": 10
    }
  }
  ```
- **Errors:**
  - `400 Bad Request`: If pagination parameters are invalid.

#### **Get Study Plan (rencana_studi) Information**

- **Endpoint:** `GET /rencana_studi/info`
- **Description:** Retrieves a study plan information by its ID.
- **Query Parameters:**
  - `id` (required): The study plan (rencana_studi) ID.
- **Response:**

  ```json
  {
    "data": {
      "id": 1,
      "mahasiswa": {
        "id_mahasiswa": 123,
        "name": "John Doe"
      },
      "matkul": {
        "id": 2,
        "name": "Mathematics"
      },
      "createdAt": "2024-09-01T03:33:07.000Z",
      "updatedAt": "2024-09-01T03:33:07.000Z"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request`: If the `id` parameter is missing or invalid.
  - `404 Not Found`: If the study plan with the given ID does not exist.

#### **Delete Study Plan**

- **Endpoint:** `DELETE /rencana_studi/:id`
- **Description:** Deletes a study plan by its ID.
- **URL Parameters:**
  - `id` (required): The study plan ID.
- **Response:**
  ```json
  {
    {
      "message": "successfully deleted"
    }
  }
  ```
- **Errors:**
  - `400 Bad Request`: If the `id` parameter is missing or invalid.
  - `404 Not Found`: If the study plan with the given ID does not exist.

## Validation

All input data is validated using `Validator.js`. If validation fails, the API will return a `400 Bad Request` or `401 Unauthorized` status code with detailed error messages.

## Error Handling

- **400 Bad Request:** Returned when the input data is invalid or missing.
- **401 Unauthorized:** Returned when a specific validation rule fails (e.g., exceeding course or student limits).
- **404 Not Found:** Returned when a requested resource (student or course) is not found.
- **500 Internal Server Error:** Returned when an unexpected error occurs on the server.
