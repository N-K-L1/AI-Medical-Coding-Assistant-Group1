# New Patient Feature

This folder contains all the code related to the New Patient registration feature.

## Structure

```
NewPatient/
├── NewPatientPage.jsx       # Main page component
├── NewPatient.css           # Styles for the new patient feature
├── components/              # Feature-specific components
│   └── NewPatientForm.jsx   # Form component with all patient fields
└── README.md               # This file
```

## Components

### NewPatientPage.jsx
The main page wrapper that displays the form title and renders the NewPatientForm component.

### NewPatientForm.jsx
Contains the complete patient registration form with the following fields:

**Patient Information:**
- Patient Name
- Gender (dropdown)
- Age

**Medical History:**
- cc (Chief Complaint) - Main reason for hospital visit
- pi (Present Illness) - Current illness details
- ph (Past History) - Past medical history
- fh (Family History) - Family medical history

**Physical Examination:**
- Patient examination findings

**Vital Signs:**
- bt (Body Temperature)
- pr (Pulse Rate)
- rr (Respiratory Rate)
- bp (Blood Pressure)
- o2 (Oxygen Saturation)

**Diagnosis & Treatment:**
- Pre-diagnosis
- Reason for admit
- Treatment plan

## Usage

Import the NewPatientPage component in your App.jsx:

```jsx
import NewPatientPage from './pages/NewPatient/NewPatientPage';

// Use in your component
<NewPatientPage />
```

## Form State Management

The form uses React's `useState` hook to manage all form fields. Data is stored in a single `formData` object.

## Form Submission

Currently logs data to console and shows an alert. You can modify the `handleSubmit` function in `NewPatientForm.jsx` to:
- Send data to an API endpoint
- Save to a database
- Integrate with your backend service

## Styling

All styles are contained in `NewPatient.css` and are scoped to this feature. The design includes:
- Responsive layout
- Clean form fields with focus states
- Professional medical UI
- Mobile-friendly design
