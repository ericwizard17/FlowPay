# FlowPay API Documentation

## 🚀 API Endpoints

Base URL: `http://localhost:3000`

---

## Authentication

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-12-10T00:00:00.000Z"
  },
  "token": "jwt-token"
}
```

---

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-12-10T00:00:00.000Z"
  },
  "token": "jwt-token"
}
```

---

### Get Current User
**GET** `/api/auth/me`

**Headers:**
```
user-id: uuid
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

---

## Transactions

### Get All Transactions
**GET** `/api/transactions`

**Headers:**
```
user-id: uuid
```

**Query Parameters:**
- `category` (optional): Filter by category
- `startDate` (optional): Filter by start date (ISO format)
- `endDate` (optional): Filter by end date (ISO format)
- `type` (optional): "income" or "expense"

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "amount": -50.00,
    "category": "Market",
    "note": "Grocery shopping",
    "date": "2024-12-10T00:00:00.000Z",
    "createdAt": "2024-12-10T00:00:00.000Z"
  }
]
```

---

### Get Single Transaction
**GET** `/api/transactions/:id`

**Headers:**
```
user-id: uuid
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "amount": -50.00,
  "category": "Market",
  "note": "Grocery shopping",
  "date": "2024-12-10T00:00:00.000Z",
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

---

### Create Transaction
**POST** `/api/transactions`

**Headers:**
```
user-id: uuid
```

**Request Body:**
```json
{
  "amount": -50.00,
  "category": "Market",
  "note": "Grocery shopping",
  "date": "2024-12-10T00:00:00.000Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "amount": -50.00,
  "category": "Market",
  "note": "Grocery shopping",
  "date": "2024-12-10T00:00:00.000Z",
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

---

### Update Transaction
**PUT** `/api/transactions/:id`

**Headers:**
```
user-id: uuid
```

**Request Body:**
```json
{
  "amount": -60.00,
  "category": "Market",
  "note": "Updated note"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "amount": -60.00,
  "category": "Market",
  "note": "Updated note",
  "date": "2024-12-10T00:00:00.000Z",
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

---

### Delete Transaction
**DELETE** `/api/transactions/:id`

**Headers:**
```
user-id: uuid
```

**Response:** 204 No Content

---

### Get Transaction Statistics
**GET** `/api/transactions/stats/summary`

**Headers:**
```
user-id: uuid
```

**Query Parameters:**
- `startDate` (optional): Filter by start date
- `endDate` (optional): Filter by end date

**Response:**
```json
{
  "income": 5000.00,
  "expense": 3000.00,
  "balance": 2000.00,
  "totalTransactions": 25,
  "categoryBreakdown": {
    "Market": 500.00,
    "Ulaşım": 300.00,
    "Eğlence": 200.00
  }
}
```

---

## Budgets

### Get All Budgets
**GET** `/api/budgets`

**Headers:**
```
user-id: uuid
```

**Query Parameters:**
- `month` (optional): Format "YYYY-MM" (default: current month)

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "category": "Market",
    "limitAmount": 1000.00,
    "month": "2024-12",
    "spent": 500.00,
    "remaining": 500.00,
    "percentage": "50.00",
    "createdAt": "2024-12-10T00:00:00.000Z",
    "updatedAt": "2024-12-10T00:00:00.000Z"
  }
]
```

---

### Get Single Budget
**GET** `/api/budgets/:id`

**Headers:**
```
user-id: uuid
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "category": "Market",
  "limitAmount": 1000.00,
  "month": "2024-12",
  "createdAt": "2024-12-10T00:00:00.000Z",
  "updatedAt": "2024-12-10T00:00:00.000Z"
}
```

---

### Create Budget
**POST** `/api/budgets`

**Headers:**
```
user-id: uuid
```

**Request Body:**
```json
{
  "category": "Market",
  "limitAmount": 1000.00,
  "month": "2024-12"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "category": "Market",
  "limitAmount": 1000.00,
  "month": "2024-12",
  "createdAt": "2024-12-10T00:00:00.000Z",
  "updatedAt": "2024-12-10T00:00:00.000Z"
}
```

---

### Update Budget
**PUT** `/api/budgets/:id`

**Headers:**
```
user-id: uuid
```

**Request Body:**
```json
{
  "limitAmount": 1200.00
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "category": "Market",
  "limitAmount": 1200.00,
  "month": "2024-12",
  "createdAt": "2024-12-10T00:00:00.000Z",
  "updatedAt": "2024-12-10T00:00:00.000Z"
}
```

---

### Delete Budget
**DELETE** `/api/budgets/:id`

**Headers:**
```
user-id: uuid
```

**Response:** 204 No Content

---

## Dashboard

### Get Dashboard Statistics
**GET** `/api/dashboard/stats`

**Headers:**
```
user-id: uuid
```

**Response:**
```json
{
  "currentMonth": {
    "income": 5000.00,
    "expense": 3000.00,
    "balance": 2000.00,
    "transactionCount": 25
  },
  "changes": {
    "income": "10.50",
    "expense": "-5.25"
  },
  "categoryBreakdown": {
    "Market": {
      "income": 0,
      "expense": 500.00
    },
    "Maaş": {
      "income": 5000.00,
      "expense": 0
    }
  },
  "topCategories": [
    {
      "category": "Market",
      "amount": 500.00
    },
    {
      "category": "Ulaşım",
      "amount": 300.00
    }
  ],
  "recentTransactions": [...],
  "budgetStatus": [
    {
      "category": "Market",
      "limit": 1000.00,
      "spent": 500.00,
      "remaining": 500.00,
      "percentage": "50.00",
      "status": "good"
    }
  ]
}
```

---

## AI Analysis

### Get AI Analysis
**GET** `/api/ai/analysis`

**Headers:**
```
user-id: uuid
```

**Response:**
```json
{
  "message": "Market harcamalarınız bu ay geçen aya göre %15 arttı. 💡",
  "analysis": {
    "Market": {
      "current": 575.00,
      "previous": 500.00
    },
    "Ulaşım": {
      "current": 300.00,
      "previous": 320.00
    }
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Record not found"
}
```

### 409 Conflict
```json
{
  "error": "A record with this value already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error details (only in development mode)"
}
```

---

## Notes

- All dates should be in ISO 8601 format
- Amounts: Positive = Income, Negative = Expense
- Authentication currently uses `user-id` header (will be replaced with JWT Bearer token)
- All endpoints return JSON
- CORS is enabled for configured origins
