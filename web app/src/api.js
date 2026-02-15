// API base URL
const API_BASE_URL = 'http://localhost:3000';
const ML_API_BASE_URL = 'http://localhost:5000';

// Authentication
export const authAPI = {
    // Unified login for both doctors and coders
    login: async (email, password) => {
        try {
            const [usersResponse, codersResponse] = await Promise.all([
                fetch(`${API_BASE_URL}/users`),
                fetch(`${API_BASE_URL}/coders`)
            ]);

            if (!usersResponse.ok || !codersResponse.ok) {
                throw new Error('Failed to fetch authentication data');
            }

            const users = await usersResponse.json();
            const coders = await codersResponse.json();

            console.log('All users:', users);
            console.log('All coders:', coders);
            console.log('Searching for email:', email, 'Password:', password);

            // Check in users (doctors) first
            let user = users.find(u => u.email === email);
            if (user) {
                console.log('Found in users:', user);
                if (user.password === password) {
                    console.log('Password match - logging in as doctor');
                    return user;
                }
            }

            // Check in coders
            let coder = coders.find(c => c.email === email);
            if (coder) {
                console.log('Found in coders:', coder);
                if (coder.password === password) {
                    console.log('Password match - logging in as coder');
                    return coder;
                }
            }

            throw new Error('Invalid email or password');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Doctor/User login by email
    loginDoctor: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            console.log('All users:', users);
            console.log('Searching for email:', email, 'Password:', password);
            const user = users.find(u => {
                console.log('Comparing:', u.email, 'with', email, 'Match:', u.email === email);
                return u.email === email;
            });
            console.log('Found user:', user);
            if (user && user.password === password) {
                console.log('Password match - logging in');
                return user;
            }
            throw new Error('Invalid email or password');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Coder login by email
    loginCoder: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/coders`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const coders = await response.json();
            console.log('All coders:', coders);
            console.log('Searching for email:', email, 'Password:', password);
            const coder = coders.find(c => {
                console.log('Comparing:', c.email, 'with', email, 'Match:', c.email === email);
                return c.email === email;
            });
            console.log('Found coder:', coder);
            if (coder && coder.password === password) {
                console.log('Password match - logging in');
                return coder;
            }
            throw new Error('Invalid email or password');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
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

// ML Model Predictions
export const mlAPI = {
    predictICDCodes: async (medicalRecordData) => {
        try {
            console.log('Sending prediction request to ML backend:', medicalRecordData);
            const response = await fetch(`${ML_API_BASE_URL}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medicalRecordData)
            });

            if (!response.ok) {
                throw new Error(`ML API error: ${response.status}`);
            }

            const predictions = await response.json();
            console.log('Predictions received:', predictions);
            return predictions;
        } catch (error) {
            console.error('ML prediction error:', error);
            console.log('Using mock predictions as fallback...');

            // Fallback: Generate mock predictions based on diagnosis
            const diagnosis = medicalRecordData.diagnosis?.toLowerCase() || '';
            const mockPredictions = generateMockPredictions(diagnosis);
            return mockPredictions;
        }
    },

    healthCheck: async () => {
        try {
            const response = await fetch(`${ML_API_BASE_URL}/health`);
            return response.json();
        } catch (error) {
            console.error('ML health check failed:', error);
            return { status: 'unavailable' };
        }
    }
};

// Mock prediction generator when ML server is unavailable
function generateMockPredictions(diagnosis) {
    const mockCodes = {
        'hypertension': [
            { code: 'I10', description: 'Essential hypertension', confidence: 0.92 },
            { code: 'I11', description: 'Hypertensive heart disease', confidence: 0.45 }
        ],
        'diabetes': [
            { code: 'E11', description: 'Type 2 diabetes mellitus', confidence: 0.88 },
            { code: 'E13', description: 'Other specified diabetes mellitus', confidence: 0.35 }
        ],
        'migraine': [
            { code: 'G43.1', description: 'Migraine with aura', confidence: 0.85 },
            { code: 'G43.0', description: 'Migraine without aura', confidence: 0.42 }
        ],
        'pneumonia': [
            { code: 'J15', description: 'Bacterial pneumonia', confidence: 0.80 },
            { code: 'J18', description: 'Pneumonia, unspecified organism', confidence: 0.60 }
        ],
        'asthma': [
            { code: 'J45', description: 'Asthma', confidence: 0.82 },
            { code: 'J45.9', description: 'Asthma, unspecified', confidence: 0.65 }
        ]
    };

    // Find matching mock codes
    let predictions = [];
    for (const [key, codes] of Object.entries(mockCodes)) {
        if (diagnosis.includes(key)) {
            predictions = codes;
            break;
        }
    }

    // If no match, return generic high-confidence codes
    if (predictions.length === 0) {
        predictions = [
            { code: 'R00.0', description: 'Tachycardia, unspecified', confidence: 0.50 }
        ];
    }

    console.log('Mock predictions generated:', predictions);
    return {
        predictions: predictions,
        model_type: 'mock_fallback',
        note: 'Using mock predictions - ML server unavailable'
    };
}
