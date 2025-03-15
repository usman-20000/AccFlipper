import React, { useState } from 'react';

const NotificationCenter = () => {
  const [notificationMode, setNotificationMode] = useState('send');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [notificationSubject, setNotificationSubject] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  
  const [sentNotifications, setSentNotifications] = useState([
    {
      id: 1,
      subject: 'New Feature: Account Valuation',
      recipients: 'All Users',
      date: '2023-07-15',
      status: 'Sent'
    },
    {
      id: 2,
      subject: 'Important: Terms of Service Update',
      recipients: 'All Users',
      date: '2023-07-01',
      status: 'Sent'
    },
    {
      id: 3,
      subject: 'Your Listing Has Been Approved',
      recipients: 'john@example.com',
      date: '2023-07-10',
      status: 'Read'
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleSendNotification = (e) => {
    e.preventDefault();
    
    if (!notificationSubject || !notificationContent) {
      alert('Please fill in all fields');
      return;
    }
    
    // In a real app, this would send the notification via an API call
    console.log('Sending notification:', {
      subject: notificationSubject,
      content: notificationContent,
      recipientType: selectedUserType
    });
    
    // Add to sent notifications
    const newNotification = {
      id: sentNotifications.length + 1,
      subject: notificationSubject,
      recipients: selectedUserType === 'all' ? 'All Users' : `All ${selectedUserType}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Sent'
    };
    
    setSentNotifications([newNotification, ...sentNotifications]);
    
    // Reset form
    setNotificationSubject('');
    setNotificationContent('');
    setSelectedUserType('all');
    
    // Show success message
    alert('Notification sent successfully!');
  };

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationModal(true);
  };
  
  const handleResendNotification = (notification) => {
    // In a real app, this would call an API to resend the notification
    console.log('Resending notification:', notification);
    
    // Show feedback to the user
    alert(`Notification "${notification.subject}" has been resent to ${notification.recipients}`);
  };

  return (
    <div className="notification-center">
      <h2>Notification Center</h2>
      
      <div className="notification-tabs">
        <button 
          className={`notification-tab ${notificationMode === 'send' ? 'active' : ''}`}
          onClick={() => setNotificationMode('send')}
        >
          Send Notifications
        </button>
        <button 
          className={`notification-tab ${notificationMode === 'history' ? 'active' : ''}`}
          onClick={() => setNotificationMode('history')}
        >
          Notification History
        </button>
      </div>
      
      {notificationMode === 'send' ? (
        <div className="send-notification-form">
          <h3>Send New Notification</h3>
          
          <form onSubmit={handleSendNotification}>
            <div className="admin-form-group">
              <label className="admin-form-label">Recipients</label>
              <select 
                className="admin-form-control" 
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="buyers">Buyers Only</option>
                <option value="sellers">Sellers Only</option>
                <option value="exchangers">Exchangers Only</option>
                <option value="valuation">Valuation Requesters</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Notification Subject</label>
              <input 
                type="text" 
                className="admin-form-control" 
                value={notificationSubject}
                onChange={(e) => setNotificationSubject(e.target.value)}
                placeholder="Enter notification subject"
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Notification Content</label>
              <textarea 
                className="admin-form-control admin-form-textarea" 
                value={notificationContent}
                onChange={(e) => setNotificationContent(e.target.value)}
                placeholder="Enter notification content"
                rows="6"
              ></textarea>
            </div>
            
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn admin-btn-primary">
                Send Notification
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="notification-history">
          <h3>Sent Notifications</h3>
          
          <table className="admin-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Recipients</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sentNotifications.map(notification => (
                <tr key={notification.id}>
                  <td>{notification.subject}</td>
                  <td>{notification.recipients}</td>
                  <td>{notification.date}</td>
                  <td>{notification.status}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button 
                        className="admin-table-btn admin-table-btn-view"
                        onClick={() => handleViewNotification(notification)}
                      >
                        View
                      </button>
                      <button 
                        className="admin-table-btn admin-table-btn-edit"
                        onClick={() => handleResendNotification(notification)}
                      >
                        Resend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Notification View Modal */}
      {showNotificationModal && selectedNotification && (
        <div className="admin-modal-backdrop" onClick={() => setShowNotificationModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{selectedNotification.subject}</h3>
              <button className="admin-modal-close" onClick={() => setShowNotificationModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="notification-detail">
                <p><strong>Recipients:</strong> {selectedNotification.recipients}</p>
                <p><strong>Date Sent:</strong> {selectedNotification.date}</p>
                <p><strong>Status:</strong> {selectedNotification.status}</p>
                
                <div className="notification-content">
                  <h4>Content</h4>
                  <div className="notification-preview" style={{
                    padding: '15px', 
                    border: '1px solid #e0e9f5', 
                    borderRadius: '6px',
                    marginTop: '10px',
                    backgroundColor: '#f8fafc'
                  }}>
                    {selectedNotification.subject === 'New Feature: Account Valuation' ? (
                      <>
                        <p>Hello AccFlipper Users,</p>
                        <p>We're excited to announce a new feature: Account Valuation!</p>
                        <p>Now you can get a professional valuation of your digital account before listing it for sale. Our experts will assess the value based on market trends and account specifics.</p>
                        <p>Try it today by navigating to the "Get Valuation" option in your dashboard.</p>
                        <p>Best regards,<br/>The AccFlipper Team</p>
                      </>
                    ) : selectedNotification.subject === 'Important: Terms of Service Update' ? (
                      <>
                        <p>Dear AccFlipper Users,</p>
                        <p>We have updated our Terms of Service effective July 1st, 2023.</p>
                        <p>Key changes include:</p>
                        <ul>
                          <li>Updated payment processing terms</li>
                          <li>Revised dispute resolution process</li>
                          <li>Enhanced security requirements</li>
                        </ul>
                        <p>Please review the full terms on our website.</p>
                        <p>Thank you for using AccFlipper!</p>
                      </>
                    ) : (
                      <>
                        <p>Hello John,</p>
                        <p>Your listing "Netflix Premium Account" has been approved and is now visible to potential buyers.</p>
                        <p>You can check the status and manage your listing from your profile dashboard.</p>
                        <p>Thank you for using AccFlipper!</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setShowNotificationModal(false)}
              >
                Close
              </button>
              <button 
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  handleResendNotification(selectedNotification);
                  setShowNotificationModal(false);
                }}
              >
                Resend Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
