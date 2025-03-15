import React, { useState, useEffect } from 'react';

const ValuationCenter = ({ initialFilter = 'all' }) => {
  const [valuationRequests, setValuationRequests] = useState([
    {
      id: 1,
      title: 'Netflix Premium Account',
      requestDate: '2023-07-15',
      user: 'John Doe',
      email: 'john@example.com',
      status: 'Pending',
      details: {
        type: 'Subscription',
        plan: 'Premium 4K',
        validUntil: '2024-03-15',
        price: null
      }
    },
    {
      id: 2,
      title: 'Spotify Family Plan',
      requestDate: '2023-07-12',
      user: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Completed',
      details: {
        type: 'Subscription',
        plan: 'Family (6 users)',
        validUntil: '2023-12-31',
        price: '$45.99'
      }
    },
    {
      id: 3,
      title: 'Adobe Creative Suite',
      requestDate: '2023-07-14',
      user: 'Mike Johnson',
      email: 'mike@example.com',
      status: 'Pending',
      details: {
        type: 'Software',
        plan: 'Complete Suite',
        validUntil: '2023-10-15',
        price: null
      }
    },
    {
      id: 4,
      title: 'PlayStation Plus 2-Year',
      requestDate: '2023-07-10',
      user: 'Tom Wilson',
      email: 'tom@example.com',
      status: 'In Progress',
      details: {
        type: 'Subscription',
        plan: 'Premium',
        validUntil: '2025-07-10',
        price: null
      }
    }
  ]);

  const [selectedValuation, setSelectedValuation] = useState(null);
  const [showValuationModal, setShowValuationModal] = useState(false);
  const [valuationPrice, setValuationPrice] = useState('');
  const [valuationNotes, setValuationNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState(initialFilter);
  
  // Update filter when initialFilter prop changes
  useEffect(() => {
    setFilterStatus(initialFilter);
  }, [initialFilter]);

  const filteredRequests = valuationRequests.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleViewValuation = (valuation) => {
    setSelectedValuation(valuation);
    setValuationPrice(valuation.details.price || '');
    setValuationNotes('');
    setShowValuationModal(true);
  };

  const handleCompleteValuation = () => {
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
            <th>User</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map(request => (
            <tr key={request.id}>
              <td>{request.title}</td>
              <td>{request.user}</td>
              <td>{request.requestDate}</td>
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
              <h3 className="admin-modal-title">Valuation: {selectedValuation.title}</h3>
              <button className="admin-modal-close" onClick={() => setShowValuationModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="valuation-details">
                <div className="valuation-info">
                  <p><strong>Requestor:</strong> {selectedValuation.user}</p>
                  <p><strong>Email:</strong> {selectedValuation.email}</p>
                  <p><strong>Request Date:</strong> {selectedValuation.requestDate}</p>
                  <p><strong>Type:</strong> {selectedValuation.details.type}</p>
                  <p><strong>Plan:</strong> {selectedValuation.details.plan}</p>
                  <p><strong>Valid Until:</strong> {selectedValuation.details.validUntil}</p>
                  <p><strong>Status:</strong> {selectedValuation.status}</p>
                </div>
                
                {selectedValuation.status === 'Completed' ? (
                  <div className="completed-valuation">
                    <h4>Valuation Results</h4>
                    <p><strong>Estimated Value:</strong> {selectedValuation.details.price}</p>
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
