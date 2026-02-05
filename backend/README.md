# Backend README

## Setup Instructions

### 1. Create MySQL Database

```sql
CREATE DATABASE hrms_lite;
USE hrms_lite;
```

### 2. Environment Setup

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update the DATABASE_URL in `.env`:
```
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/hrms_lite
```

### 3. Install Dependencies

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 4. Run the Server

```bash
python -m uvicorn app.main:app --reload
```

Server will start at `http://localhost:8000`

### 5. API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Employees
- `POST /api/employees` - Create employee
- `GET /api/employees` - List employees
- `GET /api/employees/{id}` - Get employee
- `DELETE /api/employees/{id}` - Delete employee

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - List attendance
- `GET /api/attendance/employee/{id}` - Get employee attendance

## Request/Response Examples

### Create Employee
```bash
curl -X POST http://localhost:8000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "full_name": "John Doe",
    "email": "john@example.com",
    "department": "Engineering"
  }'
```

### Mark Attendance
```bash
curl -X POST http://localhost:8000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": 1,
    "attendance_date": "2026-02-05",
    "status": "Present"
  }'
```

## Project Structure

```
app/
├── database/
│   ├── __init__.py
│   └── database.py        # DB configuration
├── models/
│   ├── __init__.py
│   ├── employee.py        # Employee model
│   └── attendance.py      # Attendance model
├── routes/
│   ├── __init__.py
│   ├── employee.py        # Employee routes
│   └── attendance.py      # Attendance routes
├── schemas/
│   ├── __init__.py
│   ├── employee.py        # Employee schemas
│   └── attendance.py      # Attendance schemas
└── main.py                # FastAPI app
```

## Dependencies

- fastapi - Web framework
- uvicorn - ASGI server
- sqlalchemy - ORM
- pymysql - MySQL driver
- pydantic - Validation
- python-dotenv - Environment variables
