import React from 'react';

const Sidebar = ({ activeSection, setActiveSection, stats }) => {
  const menuItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: 'fa fa-chart-bar' },
    { id: 'users', name: 'User Management', icon: 'fa fa-users', stat: stats.totalUsers },
    { id: 'listings', name: 'Listing Management', icon: 'fa fa-list-alt', stat: stats.totalListings },
    { id: 'valuations', name: 'Valuations', icon: 'fa fa-dollar-sign', stat: stats.valuationListings },
    { id: 'notifications', name: 'Notifications', icon: 'fa fa-bell' },
    { id: 'chat', name: 'Chat Console', icon: 'fa fa-comments', stat: stats.unreadMessages },
    { id: 'reports', name: 'Reports', icon: 'fa fa-flag', stat: stats.pendingReports },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>AccFlipper Admin</h2>
      </div>
      
      <ul className="admin-sidebar-menu">
        {menuItems.map(item => (
          <li 
            key={item.id}
            className={`admin-sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="admin-sidebar-icon"><i className={item.icon}></i></span>
            {item.name}
            {item.stat && <span className="admin-sidebar-stat">{item.stat}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
