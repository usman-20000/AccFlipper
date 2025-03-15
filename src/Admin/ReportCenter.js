import React, { useState, useEffect } from 'react';

const ReportCenter = ({ initialFilter = 'all' }) => {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Account Issue',
      subject: 'Unable to access my account',
      reporter: 'John Doe',
      email: 'john@example.com',
      date: '2023-07-18',
      status: 'Pending',
      description: 'I can\'t log into my account even though I\'m using the correct password. I\'ve tried resetting it twice already.'
    },
    {
      id: 2,
      type: 'Payment Issue',
      subject: 'Payment not received for sold item',
      reporter: 'Jane Smith',
      email: 'jane@example.com',
      date: '2023-07-17',
      status: 'In Progress',
      description: 'I sold my Netflix account 3 days ago but haven\'t received the payment yet. The system shows it as "payment pending".'
    },
    {
      id: 3,
      type: 'Listing Issue',
      subject: 'Cannot edit my listing',
      reporter: 'Mike Johnson',
      email: 'mike@example.com',
      date: '2023-07-16',
      status: 'Resolved',
      description: 'Whenever I try to edit my listing, I get an error message saying "Server error". This has been happening for 2 days.'
    },
    {
      id: 4,
      type: 'User Report',
      subject: 'Reporting suspicious user activity',
      reporter: 'Anna Brown',
      email: 'anna@example.com',
      date: '2023-07-15',
      status: 'Pending',
      description: 'A user named "quickbuyer123" is messaging everyone with suspicious payment links. I think they\'re trying to scam people.'
    }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(initialFilter);
  const [filterType, setFilterType] = useState('all');
  const [responseText, setResponseText] = useState('');

  // Update filter when initialFilter prop changes
  useEffect(() => {
    setFilterStatus(initialFilter);
  }, [initialFilter]);

  const filteredReports = reports.filter(report => {
    if (filterStatus !== 'all' && report.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    
    if (filterType !== 'all' && report.type !== filterType) {
      return false;
    }
    
    return true;
  });

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
    setResponseText('');
  };

  const handleUpdateStatus = (reportId, newStatus) => {
    const updatedReports = reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    );
    setReports(updatedReports);
  };

  const handleResolveReport = () => {
    if (!responseText) {
      alert('Please enter a response before resolving the report.');
      return;
    }

    // Update report status
    handleUpdateStatus(selectedReport.id, 'Resolved');
    
    // In a real app, this would send an email to the user with the response
    console.log(`Sending response to ${selectedReport.email}: ${responseText}`);
    
    setShowReportModal(false);
  };

  return (
    <div className="report-center">
      <h2>Report Center {filterStatus !== 'all' ? `- ${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Reports` : ''}</h2>
      
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
            <option value="resolved">Resolved</option>
          </select>
          
          <select 
            className="admin-filter-select" 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Account Issue">Account Issues</option>
            <option value="Payment Issue">Payment Issues</option>
            <option value="Listing Issue">Listing Issues</option>
            <option value="User Report">User Reports</option>
          </select>
        </div>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Type</th>
            <th>Reporter</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map(report => (
            <tr key={report.id}>
              <td>{report.subject}</td>
              <td>{report.type}</td>
              <td>{report.reporter}</td>
              <td>{report.date}</td>
              <td>
                <span className={`status-badge status-${report.status.toLowerCase().replace(' ', '-')}`}>
                  {report.status}
                </span>
              </td>
              <td>
                <div className="admin-table-actions">
                  <button 
                    className="admin-table-btn admin-table-btn-view"
                    onClick={() => handleViewReport(report)}
                  >
                    {report.status === 'Resolved' ? 'View' : 'Respond'}
                  </button>
                  {report.status === 'Pending' && (
                    <button 
                      className="admin-table-btn admin-table-btn-edit"
                      onClick={() => handleUpdateStatus(report.id, 'In Progress')}
                    >
                      Mark In Progress
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {showReportModal && selectedReport && (
        <div className="admin-modal-backdrop" onClick={() => setShowReportModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Report: {selectedReport.subject}</h3>
              <button className="admin-modal-close" onClick={() => setShowReportModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="report-details">
                <div className="report-info">
                  <p><strong>Reporter:</strong> {selectedReport.reporter} ({selectedReport.email})</p>
                  <p><strong>Date Submitted:</strong> {selectedReport.date}</p>
                  <p><strong>Type:</strong> {selectedReport.type}</p>
                  <p><strong>Status:</strong> {selectedReport.status}</p>
                </div>
                
                <div className="report-description">
                  <h4>Description</h4>
                  <p>{selectedReport.description}</p>
                </div>
                
                {selectedReport.status !== 'Resolved' ? (
                  <div className="report-response">
                    <h4>Respond to Report</h4>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Your Response</label>
                      <textarea 
                        className="admin-form-control admin-form-textarea"
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Enter your response to this report..."
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                ) : (
                  <div className="report-resolved">
                    <h4>Resolution</h4>
                    <p className="resolved-message">This issue has been resolved.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setShowReportModal(false)}
              >
                Close
              </button>
              {selectedReport.status !== 'Resolved' && (
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={handleResolveReport}
                >
                  Resolve & Send Response
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCenter;
