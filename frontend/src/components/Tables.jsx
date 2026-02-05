import React from 'react';
import { Button, Badge } from './SharedComponents';

export const EmployeeTable = ({ employees, onDelete, loading = false }) => {
  if (employees.length === 0) {
    return null;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.employee_id}</td>
              <td>{employee.full_name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${employee.full_name}?`)) {
                      onDelete(employee.id);
                    }
                  }}
                  disabled={loading}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const AttendanceTable = ({ records, employees = [] }) => {
  if (records.length === 0) {
    return null;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.employee_name}</td>
              <td>{new Date(record.attendance_date).toLocaleDateString()}</td>
              <td><Badge status={record.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const StatsCard = ({ label, value, icon = '📊' }) => (
  <div className="stats-card">
    <div className="stats-icon">{icon}</div>
    <div className="stats-content">
      <h4>{label}</h4>
      <p className="stats-value">{value}</p>
    </div>
  </div>
);
