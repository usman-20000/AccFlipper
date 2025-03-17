import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement';
import ListingManagement from './ListingManagement';
import NotificationCenter from './NotificationCenter';
import ReportCenter from './ReportCenter';
import ValuationCenter from './ValuationCenter';
import AdminChat from './AdminChat';
import Overview from './Overview';
import { BaseUrl } from '../utils/data';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('');
  const [stats, setStats] = useState({
    totalUsers: null,
    pendingUsers: null,
    approvedUsers: null,
    bannedUsers: null,
    totalListings: null,
    approvedListings: null,
    soldListings: null,
    valuationListings: null,
    unreadMessages: null,
    pendingReports: 12
  });

  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications for the header dropdown
  const [headerNotifications, setHeaderNotifications] = useState([
    { id: 1, message: "New user registered: john_doe@example.com", time: "5 minutes ago", read: false },
    { id: 2, message: "New valuation request submitted", time: "25 minutes ago", read: false },
    { id: 3, message: "Transaction completed: Adobe Creative Suite", time: "1 hour ago", read: false },
    { id: 4, message: "New report: Payment issue with order #52381", time: "2 hours ago", read: true },
    { id: 5, message: "User banned: spam_user123", time: "3 hours ago", read: true }
  ]);

  // Mock function to load data - would be replaced with API calls in a real app
  useEffect(() => {
    // Fetch dashboard stats from API
    console.log('Loading admin dashboard data...');
    // In real app: fetchDashboardStats().then(data => setStats(data));

    // Custom event listener for section changes from card clicks
    const handleSectionChange = (event) => {
      setActiveSection(event.detail.section);
      if (event.detail.filter) {
        setActiveFilter(event.detail.filter);
      } else {
        setActiveFilter('');
      }
    };

    document.addEventListener('sectionChange', handleSectionChange);

    return () => {
      document.removeEventListener('sectionChange', handleSectionChange);
    };
  }, []);

  // Handle header notification click
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);

    // If opening notifications, mark all as read
    if (!showNotifications) {
      const updatedNotifications = headerNotifications.map(notif => ({
        ...notif,
        read: true
      }));
      setHeaderNotifications(updatedNotifications);
    }
  };

  // Close notifications if clicked outside
  const handleClickOutside = (e) => {
    if (showNotifications && !e.target.closest('.admin-notifications')) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Render the active section based on sidebar selection
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement initialFilter={activeFilter} />;
      case 'listings':
        return <ListingManagement initialFilter={activeFilter} />;
      case 'notifications':
        return <NotificationCenter />;
      case 'reports':
        return <ReportCenter initialFilter={activeFilter} />;
      case 'valuations':
        return <ValuationCenter initialFilter={activeFilter} />;
      case 'chat':
        return <AdminChat />;
      case 'overview':
      default:
        return <Overview stats={stats} />;
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BaseUrl}/register`);
      const listingResponse = await fetch(`${BaseUrl}/listing`);
      const data = await response.json();
      const listingData = await listingResponse.json();
      const soldListings = listingData.filter(listing => listing.status === 'sold');
      const valuationReq = listingData.filter(valuation => valuation.transactionType.valuation === true);
      const approvedUser = data.filter(user => user.status.toLowerCase() === 'active');
      const pendingUsers = data.filter(user => user.status.toLowerCase() === 'pending');
      const bannedUsers = data.filter(user => user.status.toLowerCase() === 'banned');
      console.log('Users:', data.length);
      console.log('Listings:', listingData.length);
      setStats({
        ...stats,
        totalUsers: data.length,
        totalListings: listingData.length,
        soldListings: soldListings.length,
        approvedUsers: approvedUser.length,
        pendingUsers: pendingUsers.length,
        bannedUsers: bannedUsers.length,
        valuationListings: valuationReq.length,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-panel">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        stats={stats}
      />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-header-actions">
            <div className="admin-notifications">
              <span className="icon" onClick={toggleNotifications}>
                <i className="fa fa-bell"></i>
              </span>
              {headerNotifications.filter(n => !n.read).length > 0 && (
                <span className="badge">{headerNotifications.filter(n => !n.read).length}</span>
              )}

              {/* Notifications dropdown */}
              <div className={`admin-notification-dropdown ${showNotifications ? 'show' : ''}`}>
                <div className="admin-notification-dropdown-header">
                  <h3>Notifications</h3>
                  <span>{headerNotifications.filter(n => !n.read).length} new</span>
                </div>
                <div className="admin-notification-dropdown-body">
                  {headerNotifications.length > 0 ? (
                    headerNotifications.map(notif => (
                      <div key={notif.id} className="admin-notification-item">
                        <p className="admin-notification-message">{notif.message}</p>
                        <span className="admin-notification-time">{notif.time}</span>
                      </div>
                    ))
                  ) : (
                    <div className="admin-notification-item">
                      <p className="admin-notification-message">No new notifications</p>
                    </div>
                  )}
                </div>
                <div className="admin-notification-dropdown-footer">
                  <a href="#" onClick={() => setActiveSection('notifications')}>
                    View all notifications
                  </a>
                </div>
              </div>
            </div>
            <div className="admin-user">
              <span className="admin-username">Admin</span>
              <div className="admin-avatar"></div>
            </div>
          </div>
        </header>

        <main className="admin-main-content">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
