import React, { useState } from 'react';

const Overview = ({ stats }) => {
  const statCards = [
    { 
      title: 'Total Users', 
      value: stats.totalUsers, 
      icon: 'fa fa-users', 
      change: '+12% this month',
      link: { section: 'users', filter: 'all' }
    },
    { 
      title: 'Total Listings', 
      value: stats.totalListings, 
      icon: 'fa fa-list-alt', 
      change: '+8% this month',
      link: { section: 'listings', filter: 'all' }
    },
    { 
      title: 'Sold Listings', 
      value: stats.soldListings, 
      icon: 'fa fa-money-bill-wave', 
      change: '+15% this month',
      link: { section: 'listings', filter: 'sold' }
    },
    { 
      title: 'Approved Users', 
      value: stats.approvedUsers, 
      icon: 'fa fa-check-circle', 
      change: '+5% this month',
      link: { section: 'users', filter: 'active' }
    },
    { 
      title: 'Pending Users', 
      value: stats.pendingUsers, 
      icon: 'fa fa-clock', 
      change: '-3% this month', 
      negative: true,
      link: { section: 'users', filter: 'pending' }
    },
    { 
      title: 'Banned Users', 
      value: stats.bannedUsers, 
      icon: 'fa fa-ban', 
      change: 'No change',
      link: { section: 'users', filter: 'banned' }
    },
    { 
      title: 'Valuation Requests', 
      value: stats.valuationListings, 
      icon: 'fa fa-dollar-sign', 
      change: '+20% this month',
      link: { section: 'valuations', filter: 'all' }
    },
    { 
      title: 'Pending Reports', 
      value: stats.pendingReports, 
      icon: 'fa fa-flag', 
      change: '+2 this week',
      link: { section: 'reports', filter: 'pending' }
    },
  ];

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Mock recent activity data
  const recentActivity = [
    { 
      id: 1, 
      action: 'New User Registered', 
      details: 'john_doe@example.com', 
      time: '10 minutes ago',
      fullDetails: {
        username: 'johndoe123',
        email: 'john_doe@example.com',
        ip: '192.168.1.105',
        location: 'New York, USA',
        device: 'Chrome on Windows'
      }
    },
    { 
      id: 2, 
      action: 'Listing Approved', 
      details: 'Netflix Premium Account', 
      time: '25 minutes ago',
      fullDetails: {
        title: 'Netflix Premium Account',
        seller: 'Jane Smith',
        price: '$19.99',
        duration: '12 months',
        approvedBy: 'Admin'
      }
    },
    { 
      id: 3, 
      action: 'Account Sold', 
      details: 'Adobe Creative Suite', 
      time: '1 hour ago',
      fullDetails: {
        title: 'Adobe Creative Suite',
        seller: 'Mike Johnson',
        buyer: 'Sarah Williams',
        price: '$29.99/mo',
        commission: '$5.99'
      }
    },
    { 
      id: 4, 
      action: 'Valuation Request', 
      details: 'Spotify Premium Account', 
      time: '2 hours ago',
      fullDetails: {
        title: 'Spotify Premium Account',
        requestedBy: 'Tom Wilson',
        accountType: 'Family Plan (6 users)',
        validUntil: '2023-12-31',
        requestNotes: 'Need valuation for potential sale next month.'
      }
    },
    { 
      id: 5, 
      action: 'User Banned', 
      details: 'spam_user123', 
      time: '3 hours ago',
      fullDetails: {
        username: 'spam_user123',
        email: 'spammer@example.com',
        reason: 'Multiple reports of fraudulent listings',
        bannedBy: 'System (Automated)',
        appeals: 0
      }
    },
  ];

  const handleViewActivity = (activity) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  const handleCardClick = (link) => {
    // Dispatch custom event with both section and filter
    const sectionChangeEvent = new CustomEvent('sectionChange', { 
      detail: {
        section: link.section,
        filter: link.filter
      }
    });
    document.dispatchEvent(sectionChangeEvent);
  };

  return (
    <div className="admin-overview">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card"
            onClick={() => handleCardClick(stat.link)}
            title={`Go to ${stat.title}`}
          >
            <div className="stat-card-header">
              <h3 className="stat-card-title">{stat.title}</h3>
              <div className="stat-card-icon">
                <i className={stat.icon}></i>
              </div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className={`stat-card-change ${stat.negative ? 'negative' : ''}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
      
      <h3>Recent Activity</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Details</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentActivity.map(activity => (
            <tr key={activity.id}>
              <td>{activity.action}</td>
              <td>{activity.details}</td>
              <td>{activity.time}</td>
              <td>
                <div className="admin-table-actions">
                  <button 
                    className="admin-table-btn admin-table-btn-view"
                    onClick={() => handleViewActivity(activity)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Activity Detail Modal */}
      {showActivityModal && selectedActivity && (
        <div className="admin-modal-backdrop" onClick={() => setShowActivityModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{selectedActivity.action}</h3>
              <button 
                className="admin-modal-close" 
                onClick={() => setShowActivityModal(false)}
              >
                ×
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="activity-details">
                {/* Render details based on activity type */}
                <p><strong>Time:</strong> {selectedActivity.time}</p>
                
                {selectedActivity.action === 'New User Registered' && (
                  <div className="user-registration-details">
                    <p><strong>Username:</strong> {selectedActivity.fullDetails.username}</p>
                    <p><strong>Email:</strong> {selectedActivity.fullDetails.email}</p>
                    <p><strong>IP Address:</strong> {selectedActivity.fullDetails.ip}</p>
                    <p><strong>Location:</strong> {selectedActivity.fullDetails.location}</p>
                    <p><strong>Device:</strong> {selectedActivity.fullDetails.device}</p>
                  </div>
                )}
                
                {selectedActivity.action === 'Listing Approved' && (
                  <div className="listing-details">
                    <p><strong>Title:</strong> {selectedActivity.fullDetails.title}</p>
                    <p><strong>Seller:</strong> {selectedActivity.fullDetails.seller}</p>
                    <p><strong>Price:</strong> {selectedActivity.fullDetails.price}</p>
                    <p><strong>Duration:</strong> {selectedActivity.fullDetails.duration}</p>
                    <p><strong>Approved By:</strong> {selectedActivity.fullDetails.approvedBy}</p>
                  </div>
                )}
                
                {selectedActivity.action === 'Account Sold' && (
                  <div className="sale-details">
                    <p><strong>Title:</strong> {selectedActivity.fullDetails.title}</p>
                    <p><strong>Seller:</strong> {selectedActivity.fullDetails.seller}</p>
                    <p><strong>Buyer:</strong> {selectedActivity.fullDetails.buyer}</p>
                    <p><strong>Price:</strong> {selectedActivity.fullDetails.price}</p>
                    <p><strong>Commission:</strong> {selectedActivity.fullDetails.commission}</p>
                  </div>
                )}
                
                {selectedActivity.action === 'Valuation Request' && (
                  <div className="valuation-details">
                    <p><strong>Title:</strong> {selectedActivity.fullDetails.title}</p>
                    <p><strong>Requested By:</strong> {selectedActivity.fullDetails.requestedBy}</p>
                    <p><strong>Account Type:</strong> {selectedActivity.fullDetails.accountType}</p>
                    <p><strong>Valid Until:</strong> {selectedActivity.fullDetails.validUntil}</p>
                    <p><strong>Request Notes:</strong> {selectedActivity.fullDetails.requestNotes}</p>
                  </div>
                )}
                
                {selectedActivity.action === 'User Banned' && (
                  <div className="ban-details">
                    <p><strong>Username:</strong> {selectedActivity.fullDetails.username}</p>
                    <p><strong>Email:</strong> {selectedActivity.fullDetails.email}</p>
                    <p><strong>Reason:</strong> {selectedActivity.fullDetails.reason}</p>
                    <p><strong>Banned By:</strong> {selectedActivity.fullDetails.bannedBy}</p>
                    <p><strong>Appeals:</strong> {selectedActivity.fullDetails.appeals}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setShowActivityModal(false)}
              >
                Close
              </button>
              <button className="admin-btn admin-btn-primary">
                Take Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
