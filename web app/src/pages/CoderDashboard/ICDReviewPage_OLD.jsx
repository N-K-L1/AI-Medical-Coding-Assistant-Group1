import React, { useState, useEffect } from 'react';
import { icdReviewAPI, medicalRecordAPI, patientAPI, icdCodeAPI } from '../../api';
import './ICDReview.css';

function ICDReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch pending ICD reviews when component loads
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all ICD reviews
      const allReviews = await icdReviewAPI.getAll();
      console.log('Fetched ICD reviews:', allReviews);

      // Filter for pending reviews
      const pendingReviews = allReviews.filter(r => r.status === 'pending');
      console.log('Pending reviews:', pendingReviews);

      // Enrich reviews with related data
      const enrichedReviews = await Promise.all(
        pendingReviews.map(async (review) => {
          try {
            const medicalRecord = await medicalRecordAPI.getById(review.medicalRecordId);
            const patient = await patientAPI.getById(medicalRecord.patientId);
            const icdCode = await icdCodeAPI.getById(review.icdCodeId);

            return {
              ...review,
              medicalRecord,
              patient,
              icdCode
            };
          } catch (err) {
            console.error('Error enriching review:', err);
            return review;
          }
        })
      );

      setReviews(enrichedReviews);
      console.log('Enriched reviews:', enrichedReviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditData({ ...review });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = async () => {
    try {
      await icdReviewAPI.update(editingId, editData);
      setReviews(reviews.map(r => 
        r.id === editingId ? { ...editData } : r
      ));
      setEditingId(null);
      setEditData({});
      alert('Review saved successfully!');
    } catch (err) {
      console.error('Error saving review:', err);
      alert('Error saving review: ' + err.message);
    }
  };

  if (loading) {
    return <div className="icd-review-container"><p>Loading pending reviews...</p></div>;
  }

  if (error) {
    return <div className="icd-review-container"><p style={{color: 'red'}}>Error: {error}</p></div>;
  }

  if (reviews.length === 0) {
    return <div className="icd-review-container"><p>No pending ICD reviews at this time.</p></div>;
  }

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Jane',
      gender: 'F',
      age: 29,
      spd: 'I509',
      spx1: 'I119', spx2: 'E785', spx3: 'E119', spx4: 'I489', spx5: '', spx6: '', spx7: '', spx8: '', spx9: '', spx10: '', spx11: '', spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '293',
      rw: '0.8234',
      wtlos: '3.2',
      adjrw: '0.8956',
      lengthofstay: '4',
      approved: false
    },
    {
      id: 2,
      name: 'JJ',
      gender: 'M',
      age: 55,
      spd: 'I509',
      spx1: 'I119', spx2: 'E785', spx3: 'E119', spx4: 'I489', spx5: '', spx6: '', spx7: '', spx8: '', spx9: '', spx10: '', spx11: '', spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '293',
      rw: '0.8234',
      wtlos: '3.2',
      adjrw: '0.8956',
      lengthofstay: '4',
      approved: false
    },
    {
      id: 3,
      name: 'Alice',
      gender: 'F',
      age: 66,
      spd: 'I509',
      spx1: 'I119', spx2: 'E785', spx3: 'E119', spx4: 'I489', spx5: '', spx6: '', spx7: '', spx8: '', spx9: '', spx10: '', spx11: '', spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '293',
      rw: '0.8234',
      wtlos: '3.2',
      adjrw: '0.8956',
      lengthofstay: '4',
      approved: false
    },
    {
      id: 4,
      name: 'Willam',
      gender: 'M',
      age: 30,
      spd: 'I509',
      spx1: 'I119', spx2: 'E785', spx3: 'E119', spx4: 'I489', spx5: '', spx6: '', spx7: '', spx8: '', spx9: '', spx10: '', spx11: '', spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '293',
      rw: '0.8234',
      wtlos: '3.2',
      adjrw: '0.8956',
      lengthofstay: '4',
      approved: false
    },
    {
      id: 5,
      name: 'Jack',
      gender: 'F',
      age: 45,
      spd: 'I509',
      spx1: 'I119', spx2: 'E785', spx3: 'E119', spx4: 'I489', spx5: '', spx6: '', spx7: '', spx8: '', spx9: '', spx10: '', spx11: '', spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '293',
      rw: '0.8234',
      wtlos: '3.2',
      adjrw: '0.8956',
      lengthofstay: '4',
      approved: false
    },
    {
      id: 6,
      name: 'Vin',
      gender: 'M',
      age: 58,
      spd: 'I509',
      spx1: 'I119', spx2: 'E785', spx3: 'E119', spx4: 'I489', spx5: '', spx6: '', spx7: '', spx8: '', spx9: '', spx10: '', spx11: '', spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '293',
      rw: '0.8234',
      wtlos: '3.2',
      adjrw: '0.8956',
      lengthofstay: '4',
      approved: false
    },
    {
      id: 7,
      name: 'Miin',
      gender: 'M',
      age: 53,
      spd: 'I509',
      spx1: 'I119', spx2: 'E785', spx3: 'E119', spx4: 'I489', spx5: '', spx6: '', spx7: '', spx8: '', spx9: '', spx10: '', spx11: '', spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '293',
      rw: '0.8234',
      wtlos: '3.2',
      adjrw: '0.8956',
      lengthofstay: '4',
      approved: false
    },
    {
      id: 8,
      name: 'Yin',
      gender: 'M',
      age: 43,
      spd: 'I509',
      spx1: 'I119', spx2: 'E785', spx3: 'E119', spx4: 'I489', spx5: '', spx6: '', spx7: '', spx8: '', spx9: '', spx10: '', spx11: '', spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '293',
      rw: '0.8234',
      wtlos: '3.2',
      adjrw: '0.8956',
      lengthofstay: '4',
      approved: false
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (patient) => {
    setEditingId(patient.id);
    setEditData({ ...patient });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = () => {
    setPatients(patients.map(p => 
      p.id === editingId ? { ...editData } : p
    ));
    setEditingId(null);
    setEditData({});
    alert('Changes saved successfully!');
  };

  const handleApprove = (patientId) => {
    setPatients(patients.map(p => 
      p.id === patientId ? { ...p, approved: true } : p
    ));
    alert('Patient data approved!');
  };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const renderCell = (patient, field) => {
    if (editingId === patient.id) {
      return (
        <input
          type="text"
          value={editData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="edit-input"
        />
      );
    }
    return patient[field];
  };

  return (
    <div className="icd-review-container">
      <div className="icd-review-header">
        <h2 className="page-title">AI Generated ICD-10 Codes Review</h2>
        <div className="search-container">
          <input type="text" placeholder="Search here..." className="search-input" />
        </div>
      </div>
      
      <div className="table-container">
        <table className="icd-review-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>pdx</th>
              <th>sdx1</th>
              <th>sdx2</th>
              <th>sdx3</th>
              <th>sdx4</th>
              <th>sdx5</th>
              <th>sdx6</th>
              <th>sdx7</th>
              <th>sdx8</th>
              <th>sdx9</th>
              <th>sdx10</th>
              <th>sdx11</th>
              <th>sdx12</th>
              <th>proc1</th>
              <th>proc2</th>
              <th>proc3</th>
              <th>proc4</th>
              <th>proc5</th>
              <th>proc6</th>
              <th>proc7</th>
              <th>proc8</th>
              <th>proc9</th>
              <th>proc10</th>
              <th>proc11</th>
              <th>proc12</th>
              <th>proc13</th>
              <th>proc14</th>
              <th>proc15</th>
              <th>proc16</th>
              <th>proc17</th>
              <th>proc18</th>
              <th>proc19</th>
              <th>proc20</th>
              <th>drg</th>
              <th>rw</th>
              <th>wtlos</th>
              <th>adjrw</th>
              <th>lengthofstay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className={patient.approved ? 'approved-row' : editingId === patient.id ? 'editing-row' : ''}>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{renderCell(patient, 'spd')}</td>
                <td>{renderCell(patient, 'spx1')}</td>
                <td>{renderCell(patient, 'spx2')}</td>
                <td>{renderCell(patient, 'spx3')}</td>
                <td>{renderCell(patient, 'spx4')}</td>
                <td>{renderCell(patient, 'spx5')}</td>
                <td>{renderCell(patient, 'spx6')}</td>
                <td>{renderCell(patient, 'spx7')}</td>
                <td>{renderCell(patient, 'spx8')}</td>
                <td>{renderCell(patient, 'spx9')}</td>
                <td>{renderCell(patient, 'spx10')}</td>
                <td>{renderCell(patient, 'spx11')}</td>
                <td>{renderCell(patient, 'spx12')}</td>
                <td>{renderCell(patient, 'proc1')}</td>
                <td>{renderCell(patient, 'proc2')}</td>
                <td>{renderCell(patient, 'proc3')}</td>
                <td>{renderCell(patient, 'proc4')}</td>
                <td>{renderCell(patient, 'proc5')}</td>
                <td>{renderCell(patient, 'proc6')}</td>
                <td>{renderCell(patient, 'proc7')}</td>
                <td>{renderCell(patient, 'proc8')}</td>
                <td>{renderCell(patient, 'proc9')}</td>
                <td>{renderCell(patient, 'proc10')}</td>
                <td>{renderCell(patient, 'proc11')}</td>
                <td>{renderCell(patient, 'proc12')}</td>
                <td>{renderCell(patient, 'proc13')}</td>
                <td>{renderCell(patient, 'proc14')}</td>
                <td>{renderCell(patient, 'proc15')}</td>
                <td>{renderCell(patient, 'proc16')}</td>
                <td>{renderCell(patient, 'proc17')}</td>
                <td>{renderCell(patient, 'proc18')}</td>
                <td>{renderCell(patient, 'proc19')}</td>
                <td>{renderCell(patient, 'proc20')}</td>
                <td>{renderCell(patient, 'drg')}</td>
                <td>{renderCell(patient, 'rw')}</td>
                <td>{renderCell(patient, 'wtlos')}</td>
                <td>{renderCell(patient, 'adjrw')}</td>
                <td>{renderCell(patient, 'lengthofstay')}</td>
                <td>
                  <div className="action-buttons">
                    {editingId === patient.id ? (
                      <>
                        <button 
                          className="save-btn"
                          onClick={handleSave}
                        >
                          💾 Save
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(patient)}
                          disabled={patient.approved}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="approve-btn"
                          onClick={() => handleApprove(patient.id)}
                          disabled={patient.approved}
                        >
                          {patient.approved ? '✓ Approved' : 'Approve'}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ICDReviewPage;
