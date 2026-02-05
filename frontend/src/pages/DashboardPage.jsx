import React, { useState, useEffect } from 'react';
import { StatsCard } from '../components/Tables';
import { LoadingSpinner, ErrorMessage, Card } from '../components/SharedComponents';
import api from '../services/api';
import '../styles/pages.css';

export const DashboardPage = ({ employees, loading }) => {
  const [attendanceStats, setAttendanceStats] = useState({ present: 0, absent: 0 });
  const [fetchingStats, setFetchingStats] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendanceStats();
  }, [employees]);

  const fetchAttendanceStats = async () => {
    setFetchingStats(true);
    setError(null);
    try {
      const records = await api.attendance.getAll();
      const present = records.filter(r => r.status === 'Present').length;
      const absent = records.filter(r => r.status === 'Absent').length;
      setAttendanceStats({ present, absent });
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchingStats(false);
    }
  };

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <div>
          <h1>🏠 Dashboard</h1>
          <p>Overview of your HRMS system</p>
        </div>
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      <div className="stats-grid">
        <StatsCard
          label="Total Employees"
          value={employees.length}
          icon="👥"
        />
        <StatsCard
          label="Present Today"
          value={attendanceStats.present}
          icon="✓"
        />
        <StatsCard
          label="Absent Today"
          value={attendanceStats.absent}
          icon="✗"
        />
        <StatsCard
          label="Total Records"
          value={attendanceStats.present + attendanceStats.absent}
          icon="📊"
        />
      </div>

      {/* Quick Links */}
      <Card>
        <div className="card-header">
          <h2>Quick Links</h2>
        </div>
        <div className="quick-links">
          <a href="#/employees" className="quick-link">
            <span className="quick-link-icon">👥</span>
            <div>
              <h3>Manage Employees</h3>
              <p>Add, view, and delete employees</p>
            </div>
          </a>
          <a href="#/attendance" className="quick-link">
            <span className="quick-link-icon">📅</span>
            <div>
              <h3>Track Attendance</h3>
              <p>Mark and view attendance records</p>
            </div>
          </a>
        </div>
      </Card>

      {/* System Info */}
      <Card>
        <div className="card-header">
          <h2>System Information</h2>
        </div>
        <div className="system-info">
          <div className="info-item">
            <strong>Application:</strong>
            <span>HRMS Lite v1.0.0</span>
          </div>
          <div className="info-item">
            <strong>Status:</strong>
            <span className="status-badge">🟢 Operational</span>
          </div>
          <div className="info-item">
            <strong>Features:</strong>
            <span>Employee Management, Attendance Tracking</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
