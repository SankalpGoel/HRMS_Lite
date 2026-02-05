import React, { useState } from 'react';
import { Button } from './SharedComponents';

export const EmployeeForm = ({ onSubmit, loading = false, initialData = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
      employee_id: '',
      full_name: '',
      email: '',
      department: '',
    }
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employee_id.trim()) newErrors.employee_id = 'Employee ID is required';
    if (!formData.full_name.trim()) newErrors.full_name = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form employee-form">
      <div className="form-group">
        <label htmlFor="employee_id">Employee ID *</label>
        <input
          type="text"
          id="employee_id"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          placeholder="e.g., EMP001"
          className={errors.employee_id ? 'input-error' : ''}
        />
        {errors.employee_id && <span className="form-error">{errors.employee_id}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="full_name">Full Name *</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="e.g., John Doe"
          className={errors.full_name ? 'input-error' : ''}
        />
        {errors.full_name && <span className="form-error">{errors.full_name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g., john@example.com"
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="department">Department *</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={errors.department ? 'input-error' : ''}
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
          <option value="Other">Other</option>
        </select>
        {errors.department && <span className="form-error">{errors.department}</span>}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Employee'}
      </Button>
    </form>
  );
};

export const AttendanceForm = ({ employees, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    attendance_date: '',
    status: 'Present',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employee_id) newErrors.employee_id = 'Employee is required';
    if (!formData.attendance_date) newErrors.attendance_date = 'Date is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      ...formData,
      employee_id: parseInt(formData.employee_id),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form attendance-form">
      <div className="form-group">
        <label htmlFor="employee_id">Employee *</label>
        <select
          id="employee_id"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          className={errors.employee_id ? 'input-error' : ''}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>
        {errors.employee_id && <span className="form-error">{errors.employee_id}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="attendance_date">Date *</label>
        <input
          type="date"
          id="attendance_date"
          name="attendance_date"
          value={formData.attendance_date}
          onChange={handleChange}
          className={errors.attendance_date ? 'input-error' : ''}
        />
        {errors.attendance_date && <span className="form-error">{errors.attendance_date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Marking...' : 'Mark Attendance'}
      </Button>
    </form>
  );
};
