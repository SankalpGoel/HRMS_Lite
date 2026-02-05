import React, { useState, useEffect } from 'react';
import { EmployeeForm } from '../components/Forms';
import { EmployeeTable, StatsCard } from '../components/Tables';
import { LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, Modal, Button, Card } from '../components/SharedComponents';
import api from '../services/api';
import '../styles/pages.css';

export const EmployeesPage = ({ employees, setEmployees, loading, setLoading }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleAddEmployee = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await api.employees.create(formData);
      setSuccess('Employee added successfully');
      setShowForm(false);
      // Refresh employee list
      const updatedEmployees = await api.employees.getAll();
      setEmployees(updatedEmployees);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    setDeleting(employeeId);
    setError(null);
    try {
      await api.employees.delete(employeeId);
      setSuccess('Employee deleted successfully');
      const updatedEmployees = await api.employees.getAll();
      setEmployees(updatedEmployees);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="page employees-page">
      <div className="page-header">
        <div>
          <h1>👥 Employee Management</h1>
          <p>Manage your organization's employee directory</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          + Add New Employee
        </Button>
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}
      {success && (
        <SuccessMessage message={success} onDismiss={() => setSuccess(null)} />
      )}

      <Card>
        <div className="card-header">
          <h2>Employees ({employees.length})</h2>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : employees.length === 0 ? (
          <EmptyState
            title="No Employees Found"
            description="Get started by adding your first employee to the system."
            action={<Button onClick={() => setShowForm(true)}>+ Add Employee</Button>}
          />
        ) : (
          <EmployeeTable
            employees={employees}
            onDelete={handleDeleteEmployee}
            loading={deleting !== null}
          />
        )}
      </Card>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Employee"
      >
        <EmployeeForm
          onSubmit={handleAddEmployee}
          loading={loading}
        />
      </Modal>
    </div>
  );
};
