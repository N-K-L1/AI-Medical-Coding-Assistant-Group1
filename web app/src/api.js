// API base URL
const API_BASE_URL = 'http://localhost:3000';

// Authentication
export const authAPI = {
    // Doctor/User login
    loginDoctor: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/users?username=${username}`);
        const users = await response.json();
        if (users.length > 0 && users[0].password === password) {
            return users[0];
        }
        throw new Error('Invalid credentials');
    },

    // Coder login
    loginCoder: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/coders?username=${username}`);
        const coders = await response.json();
        if (coders.length > 0 && coders[0].password === password) {
            return coders[0];
        }
        throw new Error('Invalid credentials');
    },

    // Doctor signup
    signupDoctor: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    // Coder signup
    signupCoder: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/coders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    }
};

// Patients
export const patientAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/patients`);
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/patients/${id}`);
        return response.json();
    },

    create: async (patientData) => {
        const response = await fetch(`${API_BASE_URL}/patients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });
        return response.json();
    },

    update: async (id, patientData) => {
        const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }
};

// Medical Records
export const medicalRecordAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/medicalRecords`);
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/medicalRecords/${id}`);
        return response.json();
    },

    getByPatientId: async (patientId) => {
        const response = await fetch(`${API_BASE_URL}/medicalRecords?patientId=${patientId}`);
        return response.json();
    },

    create: async (recordData) => {
        const response = await fetch(`${API_BASE_URL}/medicalRecords`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recordData)
        });
        return response.json();
    },

    update: async (id, recordData) => {
        const response = await fetch(`${API_BASE_URL}/medicalRecords/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recordData)
        });
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/medicalRecords/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }
};

// ICD Codes
export const icdCodeAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/icdCodes`);
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/icdCodes/${id}`);
        return response.json();
    },

    search: async (query) => {
        const response = await fetch(`${API_BASE_URL}/icdCodes?description_like=${query}`);
        return response.json();
    }
};

// ICD Reviews
export const icdReviewAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/icdReviews`);
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/icdReviews/${id}`);
        return response.json();
    },

    getByStatus: async (status) => {
        const response = await fetch(`${API_BASE_URL}/icdReviews?status=${status}`);
        return response.json();
    },

    create: async (reviewData) => {
        const response = await fetch(`${API_BASE_URL}/icdReviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });
        return response.json();
    },

    update: async (id, reviewData) => {
        const response = await fetch(`${API_BASE_URL}/icdReviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/icdReviews/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }
};
