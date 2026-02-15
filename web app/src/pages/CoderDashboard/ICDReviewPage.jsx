import React, { useState } from 'react';
import './ICDReview.css';

function ICDReviewPage() {
  // Mock review data
  const mockReviews = [
    {
      id: 1,
      name: 'Michael Johnson',
      gender: 'Male',
      age: 45,
      spd: 'I10',
      spx1: 'E11',
      spx2: '',
      spx3: '',
      spx4: '',
      spx5: '',
      spx6: '',
      spx7: '',
      spx8: '',
      spx9: '',
      spx10: '',
      spx11: '',
      spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '',
      rw: '',
      wtlos: '',
      adjrw: '',
      lengthofstay: '',
      status: 'pending',
      confidence: '95',
      notes: 'AI Predicted - Hypertension, Diabetes'
    },
    {
      id: 2,
      name: 'Sarah Lee',
      gender: 'Female',
      age: 52,
      spd: 'J45',
      spx1: '',
      spx2: '',
      spx3: '',
      spx4: '',
      spx5: '',
      spx6: '',
      spx7: '',
      spx8: '',
      spx9: '',
      spx10: '',
      spx11: '',
      spx12: '',
      proc1: '', proc2: '', proc3: '', proc4: '', proc5: '', proc6: '', proc7: '', proc8: '', proc9: '', proc10: '', proc11: '', proc12: '', proc13: '', proc14: '', proc15: '', proc16: '', proc17: '', proc18: '', proc19: '', proc20: '',
      drg: '',
      rw: '',
      wtlos: '',
      adjrw: '',
      lengthofstay: '',
      status: 'pending',
      confidence: '88',
      notes: 'AI Predicted - Asthma'
    }
  ];

  const [reviews, setReviews] = useState(mockReviews);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditData({ ...review });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = () => {
    setReviews(reviews.map(r =>
      r.id === editingId ? { ...editData } : r
    ));
    setEditingId(null);
    setEditData({});
  };

  const handleApprove = (reviewId) => {
    setReviews(reviews.map(r =>
      r.id === reviewId ? { ...r, status: 'approved' } : r
    ));
  };

  const handleReject = (reviewId) => {
    setReviews(reviews.map(r =>
      r.id === reviewId ? { ...r, status: 'rejected' } : r
    ));
  };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const renderCell = (review, field) => {
    if (editingId === review.id) {
      return (
        <input
          type="text"
          value={editData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="edit-input"
        />
      );
    }
    return review[field];
  };

  if (reviews.length === 0) {
    return (
      <div className="icd-review-container">
        <div className="icd-review-header">
          <h2 className="page-title">AI Generated ICD-10 Codes Review</h2>
        </div>
        <div>
          <p>No pending ICD reviews at this time.</p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            💡 Tip: Submit a new patient form from the "Submit New Patient" page to generate pending reviews for coding.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="icd-review-container">
      <div className="icd-review-header">
        <h2 className="page-title">AI Generated ICD-10 Codes Review</h2>
      </div>
      <div className="table-container">
        <table className="icd-review-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>PDX</th>
              <th>SDX1</th>
              <th>SDX2</th>
              <th>SDX3</th>
              <th>SDX4</th>
              <th>SDX5</th>
              <th>SDX6</th>
              <th>SDX7</th>
              <th>SDX8</th>
              <th>SDX9</th>
              <th>SDX10</th>
              <th>SDX11</th>
              <th>SDX12</th>
              <th>Proc1</th>
              <th>Proc2</th>
              <th>Proc3</th>
              <th>Proc4</th>
              <th>Proc5</th>
              <th>Proc6</th>
              <th>Proc7</th>
              <th>Proc8</th>
              <th>Proc9</th>
              <th>Proc10</th>
              <th>Proc11</th>
              <th>Proc12</th>
              <th>Proc13</th>
              <th>Proc14</th>
              <th>Proc15</th>
              <th>Proc16</th>
              <th>Proc17</th>
              <th>Proc18</th>
              <th>Proc19</th>
              <th>Proc20</th>
              <th>DRG</th>
              <th>RW</th>
              <th>WTLOS</th>
              <th>AdjRW</th>
              <th>LOS</th>
              <th>AI Confidence</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{renderCell(review, 'name')}</td>
                <td>{renderCell(review, 'gender')}</td>
                <td>{renderCell(review, 'age')}</td>
                <td><strong>{renderCell(review, 'spd')}</strong></td>
                <td>{renderCell(review, 'spx1')}</td>
                <td>{renderCell(review, 'spx2')}</td>
                <td>{renderCell(review, 'spx3')}</td>
                <td>{renderCell(review, 'spx4')}</td>
                <td>{renderCell(review, 'spx5')}</td>
                <td>{renderCell(review, 'spx6')}</td>
                <td>{renderCell(review, 'spx7')}</td>
                <td>{renderCell(review, 'spx8')}</td>
                <td>{renderCell(review, 'spx9')}</td>
                <td>{renderCell(review, 'spx10')}</td>
                <td>{renderCell(review, 'spx11')}</td>
                <td>{renderCell(review, 'spx12')}</td>
                <td>{renderCell(review, 'proc1')}</td>
                <td>{renderCell(review, 'proc2')}</td>
                <td>{renderCell(review, 'proc3')}</td>
                <td>{renderCell(review, 'proc4')}</td>
                <td>{renderCell(review, 'proc5')}</td>
                <td>{renderCell(review, 'proc6')}</td>
                <td>{renderCell(review, 'proc7')}</td>
                <td>{renderCell(review, 'proc8')}</td>
                <td>{renderCell(review, 'proc9')}</td>
                <td>{renderCell(review, 'proc10')}</td>
                <td>{renderCell(review, 'proc11')}</td>
                <td>{renderCell(review, 'proc12')}</td>
                <td>{renderCell(review, 'proc13')}</td>
                <td>{renderCell(review, 'proc14')}</td>
                <td>{renderCell(review, 'proc15')}</td>
                <td>{renderCell(review, 'proc16')}</td>
                <td>{renderCell(review, 'proc17')}</td>
                <td>{renderCell(review, 'proc18')}</td>
                <td>{renderCell(review, 'proc19')}</td>
                <td>{renderCell(review, 'proc20')}</td>
                <td>{renderCell(review, 'drg')}</td>
                <td>{renderCell(review, 'rw')}</td>
                <td>{renderCell(review, 'wtlos')}</td>
                <td>{renderCell(review, 'adjrw')}</td>
                <td>{renderCell(review, 'lengthofstay')}</td>
                <td><strong>{review.confidence || 'N/A'}</strong></td>
                <td>
                  {editingId === review.id ? (
                    <select
                      value={editData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: review.status === 'approved' ? '#d1fae5' : review.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                      color: review.status === 'approved' ? '#065f46' : review.status === 'rejected' ? '#991b1b' : '#92400e'
                    }}>
                      {review.status}
                    </span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    {editingId === review.id ? (
                      <>
                        <button className="save-btn" onClick={handleSave}>Save</button>
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(review)}
                          disabled={review.status !== 'pending'}
                          title="Edit diagnostic and procedure codes"
                        >
                          Edit
                        </button>
                        <button
                          className="approve-btn"
                          onClick={() => handleApprove(review.id)}
                          disabled={review.status !== 'pending'}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleReject(review.id)}
                          disabled={review.status !== 'pending'}
                        >
                          Reject
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
