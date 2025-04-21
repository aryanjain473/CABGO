# User Registration Endpoint

## Endpoint: `/user/register`

### Description
This endpoint is used to register a new user. It accepts user details such as fullname, email, and password and returns the registered user details along with a generated authentication token.

### HTTP Method
`POST`

### Request Body
The request body must contain the following fields:

- `fullname`: An object containing the user's first and last name.
  - `firstname`: The first name of the user (required, minimum length 3 characters).
  - `lastname`: The last name of the user (required, minimum length 3 characters).
- `email`: The email address of the user (required, must be unique, minimum length 5 characters).
- `password`: The password for the user account (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response
#### Success (201 Created)
If the user is successfully registered, the server will respond with a status code of 201 and a JSON object containing the user details and an authentication token.

Example:
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "60c72b2f9b1d8c001c8e4a7b"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Client Error (400 Bad Request)
If there are validation errors in the request body, the server will respond with a status code of 400 and a JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "first name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Email must be at least 5 character long",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Error Handling
- If any of the required fields (`fullname`, `email`, `password`) are missing or invalid, the server will respond with a status code of 400 and a list of validation errors.
- The `email` field must be unique. If a user with the same email already exists, an appropriate error message will be returned.

### Example Usage
To register a new user, send a `POST` request to `/user/register` with the required fields in the request body.

```bash
curl -X POST http://<api_base_url>/user/register \
     -H "Content-Type: application/json" \
     -d '{
           "fullname": {
             "firstname": "John",
             "lastname": "Doe"
           },
           "email": "john.doe@example.com",
           "password": "password123"
         }'
```

# Fare Calculation Endpoint

## Endpoint: `/rides/fare`

### Description
This endpoint calculates the estimated fare for a ride based on pickup and destination locations. It uses distance and duration data from Google Maps to compute fares for different vehicle types.

### HTTP Method
`GET`

### Query Parameters
- `pickup`: The pickup location address (required, minimum 3 characters)
- `destination`: The destination location address (required, minimum 3 characters)

### Authorization
Requires a valid user authentication token in the Authorization header:
```
Authorization: Bearer <token>
```

### Response
#### Success (200 OK)
Returns estimated fares for different vehicle types.

Example:
```json
{
  "fare": {
    "auto": 150,
    "car": 200,
    "moto": 100
  }
}
```

#### Error Responses

##### 400 Bad Request
If validation fails for pickup or destination parameters:
```json
{
  "errors": [
    {
      "msg": "Invalid pickup location",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

##### 401 Unauthorized
If authentication token is missing or invalid:
```json
{
  "message": "Token not provided"
}
```

##### 500 Internal Server Error
If there's an error calculating the fare:
```json
{
  "error": "Unable to fetch distance and time"
}
```

### Example Usage
```bash
curl -X GET 'http://<api_base_url>/rides/fare?pickup=Mumbai&destination=Pune' \
     -H 'Authorization: Bearer <your_token>'
```
