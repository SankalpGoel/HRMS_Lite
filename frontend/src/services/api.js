const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = {
  // Employee APIs
  employees: {
    create: async (data) => {
      const response = await fetch(`${API_BASE_URL}/api/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to create employee");
      }
      return await response.json();
    },

    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/api/employees`);
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      return await response.json();
    },

    get: async (id) => {
      const response = await fetch(`${API_BASE_URL}/api/employees/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch employee");
      }
      return await response.json();
    },

    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to delete employee");
      }
      return response.ok;
    },
  },

  // Attendance APIs
  attendance: {
    create: async (data) => {
      const response = await fetch(`${API_BASE_URL}/api/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to mark attendance");
      }
      return await response.json();
    },

    getAll: async (params = {}) => {
      const queryParams = new URLSearchParams();
      if (params.employee_id) queryParams.append("employee_id", params.employee_id);
      if (params.from_date) queryParams.append("from_date", params.from_date);
      if (params.to_date) queryParams.append("to_date", params.to_date);

      const url = queryParams.toString()
        ? `${API_BASE_URL}/api/attendance?${queryParams}`
        : `${API_BASE_URL}/api/attendance`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch attendance records");
      }
      return await response.json();
    },

    getByEmployee: async (employeeId) => {
      const response = await fetch(`${API_BASE_URL}/api/attendance/employee/${employeeId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch attendance records");
      }
      return await response.json();
    },
  },
};

export default api;
