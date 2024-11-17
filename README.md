
# **Employee Management System (GraphQL + NestJS)**

This project is a GraphQL-based backend application built with **NestJS** for managing employees, complete with authentication, role-based authorization, and JWT support. 

---

## **Features**
- **GraphQL API** with queries and mutations.
- **Authentication & Authorization** using JWT.
- **Role-Based Access Control** (Admin and Employee roles).
- **Pagination & Filtering** for queries.
- **Modular Architecture** for scalability.

---

## **Prerequisites**

Before setting up the project, make sure you have the following installed:

1. **Node.js** (v16 or higher)
2. **NPM** or **Yarn**
3. **PostgreSQL** (or any other TypeORM-supported database)

---

## **Setup Instructions**

### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Configure Environment Variables**

Create a `.env` file in the root directory and add the following configurations:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=employee_management

# JWT Secret
JWT_SECRET=supersecretkey
```

### 4. **Run Database Migration**

To ensure the database schema is created based on the TypeORM entities:
```bash
npm run start:dev
```

This will synchronize the database with the schema.

---

## **Running the Application**

To start the server:

### **Development Mode**
```bash
npm run start:dev
```

### **Production Mode**
```bash
npm run build
npm run start:prod
```

The server will be running on `http://localhost:3000`.

---

## **GraphQL Playground**

Access the GraphQL Playground at:
```
http://localhost:3000/graphql
```

Here, you can test queries and mutations.

---

## **Sample API Requests**

### **1. Register a New Employee**
Mutation to register a new employee.

**Query:**
```graphql
mutation RegisterEmployee {
  register(registerInput: {
    name: "John Doe",
    age: 30,
    class: "A",
    subjects: ["Math", "Science"],
    attendance: 85,
    password: "strongpassword",
    role: "employee"
  }) {
    id
    name
    role
  }
}
```

**Response:**
```json
{
  "data": {
    "register": {
      "id": 1,
      "name": "John Doe",
      "role": "employee"
    }
  }
}
```

---

### **2. Login**
Mutation to generate a JWT token for an employee.

**Query:**
```graphql
mutation Login {
  login(loginInput: {
    name: "John Doe",
    password: "strongpassword"
  })
}
```

**Response:**
```json
{
  "data": {
    "login": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### **3. List Employees**
Query to fetch a paginated list of employees.

**Query:**
```graphql
query ListEmployees {
  listEmployees(skip: 0, take: 10) {
    id
    name
    age
    class
    attendance
  }
}
```

**Response:**
```json
{
  "data": {
    "listEmployees": [
      {
        "id": 1,
        "name": "John Doe",
        "age": 30,
        "class": "A",
        "attendance": 85
      }
    ]
  }
}
```

---

### **4. Get Employee by ID**
Query to fetch a single employee's details.

**Query:**
```graphql
query GetEmployee {
  getEmployee(id: 1) {
    id
    name
    class
    subjects
    attendance
  }
}
```

**Response:**
```json
{
  "data": {
    "getEmployee": {
      "id": 1,
      "name": "John Doe",
      "class": "A",
      "subjects": ["Math", "Science"],
      "attendance": 85
    }
  }
}
```

---

### **5. Update Employee Attendance**
Mutation to update an employee's attendance.

**Query:**
```graphql
mutation UpdateEmployee {
  updateEmployee(id: 1, attendance: 90) {
    id
    name
    attendance
  }
}
```

**Response:**
```json
{
  "data": {
    "updateEmployee": {
      "id": 1,
      "name": "John Doe",
      "attendance": 90
    }
  }
}
```

---

## **Role-Based Access Control**

- **Admin:** Can access all operations (add/update employees, etc.).
- **Employee:** Limited access to certain queries.

To restrict access, use the **JWT token** from login as a Bearer token in the GraphQL Playground.

---

## **Scripts**

- **`npm run start:dev`** - Start the application in development mode.
- **`npm run start:prod`** - Start the application in production mode.
- **`npm run build`** - Build the application.

---

## **Contributing**

Feel free to contribute to the project by submitting issues or pull requests.

---

## **License**

This project is licensed under the MIT License.

--- 
