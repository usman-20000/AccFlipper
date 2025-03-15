import React, { useState, useEffect } from 'react';
import { BaseUrl, timeAgo } from '../utils/data';

const UserManagement = ({ initialFilter = 'all' }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Buyer', status: 'Active', joinDate: '2023-05-12' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', status: 'Active', joinDate: '2023-06-08' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Exchanger', status: 'Pending', joinDate: '2023-07-01' },
    { id: 4, name: 'Anna Brown', email: 'anna@example.com', role: 'Buyer', status: 'Banned', joinDate: '2023-04-15' },
    { id: 5, name: 'Tom Wilson', email: 'tom@example.com', role: 'Seller', status: 'Active', joinDate: '2023-06-22' },
  ]);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  // Update filter when initialFilter prop changes
  useEffect(() => {
    setFilterStatus(initialFilter);
  }, [initialFilter]);

  const filteredUsers = users.filter(user => {
    // Filter by status
    if (filterStatus !== 'all' && user.status.toLowerCase() !== filterStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleStatusChange = (userId, newStatus) => {
    const updatedUsers = users.map(user => 
      user._id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BaseUrl}/register`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log('Users:', data[0].timestamp);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  } , []);

  return (
    <div className="user-management">
      <h2>User Management {filterStatus !== 'all' ? `- ${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Users` : ''}</h2>
      
      <div className="admin-filters">
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="admin-filter-group">
          <select 
            className="admin-filter-select" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="banned">Banned</option>
          </select>
          
          <button className="admin-btn admin-btn-primary">
            Add New User
          </button>
        </div>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Role</th> */}
            <th>Status</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.role}</td> */}
              <td>
                <span className={`status-badge status-${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td>{user.timestamp && timeAgo(user?.timestamp)}</td>
              <td>
                <div className="admin-table-actions">
                  <button 
                    className="admin-table-btn admin-table-btn-view"
                    onClick={() => handleViewUser(user)}
                  >
                    View
                  </button>
                  {user.status === 'Active' ? (
                    <button 
                      className="admin-table-btn admin-table-btn-delete"
                      onClick={() => handleStatusChange(user._id, 'Banned')}
                    >
                      Ban
                    </button>
                  ) : user.status === 'Banned' ? (
                    <button 
                      className="admin-table-btn admin-table-btn-edit"
                      onClick={() => handleStatusChange(user._id, 'Active')}
                    >
                      Unban
                    </button>
                  ) : (
                    <button 
                      className="admin-table-btn admin-table-btn-edit"
                      onClick={() => handleStatusChange(user._id, 'Active')}
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    className="admin-table-btn admin-table-btn-delete"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {showUserModal && selectedUser && (
        <div className="admin-modal-backdrop" onClick={() => setShowUserModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">User Details: {selectedUser.name}</h3>
              <button className="admin-modal-close" onClick={() => setShowUserModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="user-detail-tabs">
                <div className="user-detail-section">
                  <h4>Account Information</h4>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p><strong>Status:</strong> {selectedUser.status}</p>
                  <p><strong>Join Date:</strong> {selectedUser.createdAt}</p>
                  <p><strong>Last Login:</strong> 2023-07-28 14:35</p>
                </div>
                
                <div className="user-detail-section">
                  <h4>User Listings</h4>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Netflix Premium Account</td>
                        <td>$19.99</td>
                        <td>
                          <span className="status-badge status-active">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Spotify Family Plan</td>
                        <td>$14.99</td>
                        <td>
                          <span className="status-badge status-sold">Sold</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setShowUserModal(false)}
              >
                Close
              </button>
              {selectedUser.status === 'Active' ? (
                <button 
                  className="admin-btn admin-btn-danger"
                  onClick={() => {
                    handleStatusChange(selectedUser._id, 'Banned');
                    setShowUserModal(false);
                  }}
                >
                  Ban User
                </button>
              ) : selectedUser.status === 'Banned' ? (
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    handleStatusChange(selectedUser._id, 'Active');
                    setShowUserModal(false);
                  }}
                >
                  Unban User
                </button>
              ) : (
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    handleStatusChange(selectedUser._id, 'Active');
                    setShowUserModal(false);
                  }}
                >
                  Approve User
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
