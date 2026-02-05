import React, { useState, useEffect } from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { AttendancePage } from './pages/AttendancePage';
import { LoadingSpinner, ErrorMessage } from './components/SharedComponents';
import api from './services/api';
import './styles/app.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setGeneralError(null);
    try {
      const data = await api.employees.getAll();
      setEmployees(data);
    } catch (err) {
      setGeneralError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPage = () => {
    const props = { employees, setEmployees, loading, setLoading };

    switch (currentPage) {
      case 'employees':
        return <EmployeesPage {...props} />;
      case 'attendance':
        return <AttendancePage {...props} />;
      default:
        return <DashboardPage employees={employees} loading={loading} />;
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <h1>HRMS Lite</h1>
          </div>
          <nav className="nav">
            <button
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              🏠 Dashboard
            </button>
            <button
              className={`nav-link ${currentPage === 'employees' ? 'active' : ''}`}
              onClick={() => setCurrentPage('employees')}
            >
              👥 Employees
            </button>
            <button
              className={`nav-link ${currentPage === 'attendance' ? 'active' : ''}`}
              onClick={() => setCurrentPage('attendance')}
            >
              📅 Attendance
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {generalError && (
          <ErrorMessage message={generalError} onDismiss={() => setGeneralError(null)} />
        )}
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 HRMS Lite. All rights reserved.</p>
        <p>Admin Panel | Version 1.0.0</p>
      </footer>
    </div>
  );
}

export default App;
