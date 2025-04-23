import React, { useState, useEffect } from 'react';
import { BaseUrl, timeAgo } from '../utils/data';

const ValuationCenter = ({ initialFilter = 'all' }) => {
  const [valuationRequests, setValuationRequests] = useState([]);

  const [selectedValuation, setSelectedValuation] = useState(null);
  const [showValuationModal, setShowValuationModal] = useState(false);
  const [valuationPrice, setValuationPrice] = useState('');
  const [valuationNotes, setValuationNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState(initialFilter);
  const [selectedUser, setSelectedUser] = useState([]);

  // Update filter when initialFilter prop changes
  useEffect(() => {
    setFilterStatus(initialFilter);
  }, [initialFilter]);

  const filteredRequests = valuationRequests.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleViewValuation = async (valuation) => {
    setSelectedValuation(valuation);
    setValuationPrice(valuation.estimatedValue || '');
    setValuationNotes('');
    if (valuation.userId) {
      const response = await fetch(`${BaseUrl}/register/${valuation.userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSelectedUser(data);
      }
    }
    setShowValuationModal(true);
  };

  const fetchValuationRequests = async () => {
    try {
      const response = await fetch(`${BaseUrl}/listing`);
      if (response.ok) {
        const data = await response.json();
        const valuations = data.filter(listing => listing.transactionType.valuation === true);
        setValuationRequests(valuations);
        setFilterStatus('all');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchValuationRequests();
  }, []);

  const handleCompleteValuation = async () => {
    if (!valuationPrice) {
      alert('Please enter a valuation price');
      return;
    }


    // Update the valuation request
    const updatedRequests = valuationRequests.map(req =>
      req.id === selectedValuation.id
        ? {
          ...req,
          status: 'Completed',
          details: {
            ...req.details,
            price: valuationPrice
          }
        }
        : req
    );

    const response = await fetch(`${BaseUrl}/listing/${selectedValuation._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'Completed',
        estimatedValue: valuationPrice,
        valuationNote: valuationNotes
      })
    });
    if (response.ok) {
      console.log('Valuation completed successfully');
      alert('Valuation completed successfully');
    } else {
      console.log('Valuation completion failed');
      alert('Valuation completion failed');
    }

    setValuationRequests(updatedRequests);
    setShowValuationModal(false);

    // In a real app, this would send an email notification to the user
    console.log(`Valuation completed for ${selectedValuation.title}. Price: ${valuationPrice}`);
  };

  return (
    <div className="valuation-center">
      <h2>Valuation Center {filterStatus !== 'all' ? `- ${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Requests` : ''}</h2>

      <div className="admin-filters">
        <div className="admin-filter-group">
          <select
            className="admin-filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            {/* <th>User</th> */}
            <th>Request Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map(request => (
            <tr key={request._id}>
              <td>{request.accountName}</td>
              {/* <td>{request.user}</td> */}
              <td>{request.createdAt && timeAgo(request.createdAt)}</td>
              <td>
                <span className={`status-badge status-${request.status.toLowerCase().replace(' ', '-')}`}>
                  {request.status}
                </span>
              </td>
              <td>
                <div className="admin-table-actions">
                  <button
                    className="admin-table-btn admin-table-btn-view"
                    onClick={() => handleViewValuation(request)}
                  >
                    {request.status === 'Completed' ? 'View' : 'Complete Valuation'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showValuationModal && selectedValuation && (
        <div className="admin-modal-backdrop" onClick={() => setShowValuationModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Valuation: {selectedValuation.accountName}</h3>
              <button className="admin-modal-close" onClick={() => setShowValuationModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="valuation-details">
                <div className="valuation-info">
                  <p><strong>Requestor:</strong> {selectedUser?.name}</p>
                  <p><strong>Email:</strong> {selectedUser?.email}</p>
                  <p><strong>Request Date:</strong> {selectedValuation.createdAt && timeAgo(selectedValuation.createdAt)}</p>
                  <p><strong>Status:</strong> {selectedValuation.status}</p>
                </div>

                {selectedValuation.status === 'Completed' ? (
                  <div className="completed-valuation">
                    <h4>Valuation Results</h4>
                    <p><strong>Estimated Value:</strong> {selectedValuation?.estimatedValue}</p>
                  </div>
                ) : (
                  <div className="valuation-form">
                    <h4>Complete Valuation</h4>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Estimated Value</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="Enter dollar amount (e.g. $19.99)"
                        value={valuationPrice}
                        onChange={(e) => setValuationPrice(e.target.value)}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Valuation Notes (Optional)</label>
                      <textarea
                        className="admin-form-control admin-form-textarea"
                        rows="4"
                        placeholder="Enter any notes about this valuation"
                        value={valuationNotes}
                        onChange={(e) => setValuationNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button
                className="admin-btn admin-btn-secondary"
                onClick={() => setShowValuationModal(false)}
              >
                Close
              </button>
              {selectedValuation.status !== 'Completed' && (
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={handleCompleteValuation}
                >
                  Submit Valuation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuationCenter;
