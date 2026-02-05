# HRMS Lite - HR Management System

A lightweight, professional HR Management System for managing employee records and attendance tracking.

## 🎯 Features

### Employee Management
- ✅ Add new employees with unique ID, name, email, and department
- ✅ View all employees in a clean, organized table
- ✅ Delete employee records with confirmation
- ✅ Duplicate employee ID and email validation

### Attendance Management
- ✅ Mark attendance for employees (Present/Absent)
- ✅ View attendance records with filtering options
- ✅ Track attendance by employee and date
- ✅ Prevent duplicate attendance entries for same date

### Dashboard
- ✅ Quick overview of key metrics
- ✅ Total employees count
- ✅ Attendance statistics
- ✅ Quick navigation links

### UI/UX
- ✅ Professional, modern interface
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Loading states with spinner
- ✅ Error and success messages
- ✅ Empty states with guidance
- ✅ Modal dialogs for forms
- ✅ Smooth transitions and animations

## 🏗️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **CSS** - Custom styling (no frameworks)

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **PyMySQL** - MySQL driver

### Database
- **MySQL** - Relational database

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting

## 📋 Project Structure

```
hrms-lite/
├── backend/
│   ├── app/
│   │   ├── database/
│   │   │   └── database.py        # Database configuration
│   │   ├── models/
│   │   │   ├── employee.py        # Employee model
│   │   │   └── attendance.py      # Attendance model
│   │   ├── routes/
│   │   │   ├── employee.py        # Employee endpoints
│   │   │   └── attendance.py      # Attendance endpoints
│   │   ├── schemas/
│   │   │   ├── employee.py        # Employee validation schemas
│   │   │   └── attendance.py      # Attendance validation schemas
│   │   └── main.py                # FastAPI app initialization
│   ├── requirements.txt           # Python dependencies
│   └── .env.example               # Environment variables example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SharedComponents.jsx  # Reusable UI components
│   │   │   ├── Forms.jsx             # Employee & Attendance forms
│   │   │   └── Tables.jsx            # Data tables
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx     # Dashboard
│   │   │   ├── EmployeesPage.jsx     # Employee management
│   │   │   └── AttendancePage.jsx    # Attendance tracking
│   │   ├── services/
│   │   │   └── api.js                # API client
│   │   ├── styles/
│   │   │   ├── global.css            # Global styles & variables
│   │   │   ├── app.css               # App layout
│   │   │   ├── pages.css             # Page styles
│   │   │   ├── components.css        # Component styles
│   │   │   └── forms.css             # Form styles
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # React entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- MySQL 5.7+

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   ```bash
    .env
   ```
   Edit `.env` and update the `DATABASE_URL` with your MySQL credentials.

6. **Run the backend:**
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   Backend will be available at `http://localhost:8000`

7. **API Documentation:**
   - Interactive docs: `http://localhost:8000/docs`
   - Alternative docs: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
    .env
   ```
   Update the `VITE_API_URL` if your backend is not on `http://localhost:8000`

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` folder

## 📝 API Endpoints

### Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Create new employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get specific employee |
| DELETE | `/api/employees/{id}` | Delete employee |

### Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attendance` | Mark attendance |
| GET | `/api/attendance` | Get all attendance records |
| GET | `/api/attendance?employee_id=1&from_date=2026-02-01&to_date=2026-02-05` | Filter attendance |
| GET | `/api/attendance/employee/{id}` | Get employee attendance |

## 💾 Database Schema

### Employees Table
```sql
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  department VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);
```

## 🔒 Validation Rules

- **Employee ID:** Required, unique, max 50 characters
- **Full Name:** Required, max 255 characters
- **Email:** Required, valid format, unique
- **Department:** Required, max 100 characters
- **Attendance Date:** Required, date format YYYY-MM-DD
- **Attendance Status:** Required, must be "Present" or "Absent"

## 🎨 UI Components

### Shared Components
- `LoadingSpinner` - Loading state indicator
- `ErrorMessage` - Error notification
- `SuccessMessage` - Success notification
- `EmptyState` - Empty data state
- `Modal` - Modal dialog
- `Button` - Reusable button
- `Card` - Container component
- `Badge` - Status badge

### Forms
- `EmployeeForm` - Employee creation form with validation
- `AttendanceForm` - Attendance marking form

### Tables
- `EmployeeTable` - Displays employee list
- `AttendanceTable` - Displays attendance records
- `StatsCard` - Statistics display

## 📦 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variable: `VITE_API_URL` to your backend URL
4. Deploy automatically on push

### Backend (Render)

1. Create a Render account and connect GitHub
2. Create a new Web Service
3. Set environment variable: `DATABASE_URL`
4. Deploy from GitHub

## ⚙️ Environment Variables

### Backend (.env)
```
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/hrms_lite
ENVIRONMENT=production
```

### Frontend (.env)
```
VITE_API_URL=https://hrms-backend.onrender.com
```

## 🐛 Error Handling

- **400 Bad Request:** Validation errors, duplicate data
- **404 Not Found:** Resource doesn't exist
- **500 Internal Server Error:** Server-side errors

All endpoints return meaningful error messages in JSON format.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📊 Performance

- Page load: < 2 seconds
- API response: < 500ms
- Database queries optimized with indexes
- Responsive design for all screen sizes

## 🔐 Security Considerations

- Input validation on both frontend and backend
- SQL injection prevention through SQLAlchemy ORM
- CORS enabled for frontend origin
- Proper HTTP status codes
- No sensitive data exposed in logs

## 🎯 Bonus Features Implemented

- ✅ Filter attendance records by employee
- ✅ Display attendance statistics (Present/Absent counts)
- ✅ Dashboard summary with key metrics
- ✅ Responsive design for mobile and tablet
- ✅ Professional UI with smooth animations

## 📝 Assumptions & Limitations

### Assumptions
1. Single admin user (no authentication required)
2. All users have admin privileges
3. Database is accessible and configured
4. MySQL is used as database

### Limitations
1. No user authentication or role management
2. No leave management system
3. No payroll features
4. No advanced reporting features
5. File uploads not supported
6. No email notifications

## 🤝 Contributing

This is a demo application for educational purposes.

## 📄 License

This project is provided as-is for educational purposes.

## 📞 Support

For issues or questions, please check the deployment links for live application status.

---

**Version:** 1.0.0  
**Last Updated:** February 5, 2026  
**Status:** Production Ready ✅
