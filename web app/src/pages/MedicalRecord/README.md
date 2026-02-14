# Medical Record Feature

This folder contains all the code for displaying and searching patient medical records.

## Structure

```
MedicalRecord/
├── MedicalRecordPage.jsx           # Main page component
├── MedicalRecord.css               # Styles for the medical record feature
├── components/
│   ├── MedicalRecordTable.jsx      # Table displaying patient data
│   └── SearchBar.jsx               # Search functionality
└── README.md                       # This file
```

## Components

### MedicalRecordPage.jsx
The main page that displays the medical records table with search functionality.

### MedicalRecordTable.jsx
Displays patient data in a table format with columns:
- Name
- Gender (M/F)
- Age
- cc (Chief Complaint)
- pi (Present Illness)
- ph (Past History)

Features:
- Loads patient data from localStorage
- Filters data based on search query
- Shows message when no data exists
- Displays "No results" when search has no matches

### SearchBar.jsx
Search input component that allows filtering the patient records table.

## Data Storage

Patient data is stored in the browser's `localStorage` under the key `patients`. When a new patient is submitted in the New Patient form, the data is saved to localStorage and automatically appears in this Medical Record table.

## Usage

Import the MedicalRecordPage component in your App.jsx:

```jsx
import MedicalRecordPage from './pages/MedicalRecord/MedicalRecordPage';

// Use in your component
<MedicalRecordPage />
```

## Search Functionality

The search bar filters records across multiple fields:
- Patient name
- Gender
- Age
- Chief complaint (cc)
- Present illness (pi)
- Past history (ph)

Search is case-insensitive and updates in real-time.

## Styling

All styles are in `MedicalRecord.css`:
- Clean table design with hover effects
- Responsive layout for mobile devices
- Professional medical UI matching the application theme
