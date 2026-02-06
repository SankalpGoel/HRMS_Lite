export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = {
  // Employee APIs
  employees: {
    create: async (data) => {
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/api/employees`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (e) {
        throw new Error(`Network error when connecting to ${API_BASE_URL}: ${e.message}`);
      }
      if (!response.ok) {
        let errorBody = null;
        try {
          errorBody = await response.json();
        } catch (e) {
          // ignore json parse errors
        }
        throw new Error((errorBody && (errorBody.detail || errorBody.message)) || `Failed to create employee (status ${response.status})`);
      }
      return await response.json();
    },

    getAll: async () => {
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/api/employees`);
      } catch (e) {
        throw new Error(`Network error: Cannot reach ${API_BASE_URL}/api/employees - ${e.message}`);
      }
      if (!response.ok) {
        let errorBody = null;
        try {
          errorBody = await response.json();
        } catch (e) {
          // ignore
        }
        throw new Error((errorBody && errorBody.detail) || `Failed to fetch employees (status ${response.status})`);
      }
      return await response.json();
    },

    get: async (id) => {
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/api/employees/${id}`);
      } catch (e) {
        throw new Error(`Network error: Cannot reach ${API_BASE_URL}/api/employees/${id} - ${e.message}`);
      }
      if (!response.ok) {
        let errorBody = null;
        try {
          errorBody = await response.json();
        } catch (e) {
          // ignore
        }
        throw new Error((errorBody && errorBody.detail) || `Failed to fetch employee (status ${response.status})`);
      }
      return await response.json();
    },

    delete: async (id) => {
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
          method: "DELETE",
        });
      } catch (e) {
        throw new Error(`Network error: Cannot reach ${API_BASE_URL}/api/employees/${id} - ${e.message}`);
      }
      if (!response.ok) {
        let errorBody = null;
        try {
          errorBody = await response.json();
        } catch (e) {
          // ignore
        }
        throw new Error((errorBody && errorBody.detail) || `Failed to delete employee (status ${response.status})`);
      }
      return response.ok;
    },
  },

  // Attendance APIs
  attendance: {
    create: async (data) => {
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/api/attendance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (e) {
        throw new Error(`Network error: Cannot reach ${API_BASE_URL}/api/attendance - ${e.message}`);
      }
      if (!response.ok) {
        let errorBody = null;
        try {
          errorBody = await response.json();
        } catch (e) {
          // ignore
        }
        throw new Error((errorBody && (errorBody.detail || errorBody.message)) || `Failed to mark attendance (status ${response.status})`);
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

      let response;
      try {
        response = await fetch(url);
      } catch (e) {
        throw new Error(`Network error: Cannot reach ${API_BASE_URL}/api/attendance - ${e.message}`);
      }
      if (!response.ok) {
        let errorBody = null;
        try {
          errorBody = await response.json();
        } catch (e) {
          // ignore
        }
        throw new Error((errorBody && errorBody.detail) || `Failed to fetch attendance records (status ${response.status})`);
      }
      return await response.json();
    },

    getByEmployee: async (employeeId) => {
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/api/attendance/employee/${employeeId}`);
      } catch (e) {
        throw new Error(`Network error: Cannot reach ${API_BASE_URL}/api/attendance/employee/${employeeId} - ${e.message}`);
      }
      if (!response.ok) {
        let errorBody = null;
        try {
          errorBody = await response.json();
        } catch (e) {
          // ignore
        }
        throw new Error((errorBody && errorBody.detail) || `Failed to fetch attendance records (status ${response.status})`);
      }
      return await response.json();
    },
  },
};

export default api;
