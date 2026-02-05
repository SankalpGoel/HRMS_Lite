import React, { useState, useEffect } from 'react';
import { AttendanceForm } from '../components/Forms';
import { AttendanceTable, StatsCard } from '../components/Tables';
import { LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, Card, Button } from '../components/SharedComponents';
import api from '../services/api';
import '../styles/pages.css';

export const AttendancePage = ({ employees, setEmployees, loading, setLoading }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [fetchingAttendance, setFetchingAttendance] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    fetchAttendanceRecords(selectedEmployeeId);
  }, []);

  const fetchAttendanceRecords = async (employeeId) => {
    setFetchingAttendance(true);
    setError(null);
    try {
      let records;
      if (employeeId) {
        records = await api.attendance.getByEmployee(employeeId);
      } else {
        records = await api.attendance.getAll();
      }
      setAttendanceRecords(records);
      updateStats(records);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchingAttendance(false);
    }
  };

  const updateStats = (records) => {
    const present = records.filter(r => r.status === 'Present').length;
    const absent = records.filter(r => r.status === 'Absent').length;
    setPresentCount(present);
    setAbsentCount(absent);
  };

  const handleMarkAttendance = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await api.attendance.create(formData);
      setSuccess('Attendance marked successfully');
      await fetchAttendanceRecords(selectedEmployeeId);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeFilter = async (employeeId) => {
    setSelectedEmployeeId(employeeId);
    await fetchAttendanceRecords(employeeId);
  };

  return (
    <div className="page attendance-page">
      <div className="page-header">
        <div>
          <h1>📅 Attendance Management</h1>
          <p>Track and manage employee attendance</p>
        </div>
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}
      {success && (
        <SuccessMessage message={success} onDismiss={() => setSuccess(null)} />
      )}

      {/* Stats Section */}
      <div className="stats-grid">
        <StatsCard label="Total Present" value={presentCount} icon="✓" />
        <StatsCard label="Total Absent" value={absentCount} icon="✗" />
        <StatsCard label="Total Records" value={attendanceRecords.length} icon="📊" />
        <StatsCard label="Total Employees" value={employees.length} icon="👥" />
      </div>

      {/* Forms and Records */}
      <div className="attendance-grid">
        {/* Mark Attendance Form */}
        <Card>
          <div className="card-header">
            <h2>Mark Attendance</h2>
          </div>
          {employees.length === 0 ? (
            <EmptyState
              title="No Employees"
              description="Add employees first before marking attendance."
            />
          ) : (
            <AttendanceForm
              employees={employees}
              onSubmit={handleMarkAttendance}
              loading={loading}
            />
          )}
        </Card>

        {/* Attendance Records */}
        <Card>
          <div className="card-header">
            <h2>Attendance Records</h2>
            <select
              value={selectedEmployeeId || ''}
              onChange={(e) => handleEmployeeFilter(e.target.value ? parseInt(e.target.value) : null)}
              className="filter-select"
            >
              <option value="">All Employees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
          </div>
          {fetchingAttendance ? (
            <LoadingSpinner />
          ) : attendanceRecords.length === 0 ? (
            <EmptyState
              title="No Attendance Records"
              description="No attendance records found. Start marking attendance."
            />
          ) : (
            <AttendanceTable records={attendanceRecords} />
          )}
        </Card>
      </div>
    </div>
  );
};
