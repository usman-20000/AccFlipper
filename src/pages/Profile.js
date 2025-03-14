import React, { useEffect, useState } from 'react';
import './Profile.css';
import { BaseUrl, timeAgo } from '../utils/data';

const Profile = () => {
    const [user, setUser] = useState({});
    const [currentView, setCurrentView] = useState('profile');
    const [selectedListing, setSelectedListing] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [listing, setListing] = useState([]);

    const mockListings = [
        {
            id: 1,
            title: "Netflix Premium Account",
            price: "$19.99",
            status: "Active",
            image: "https://via.placeholder.com/60x60/e2f1ff/0066cc?text=N",
            description: "Netflix Premium subscription with 4K streaming. Valid until December 2023. Multiple devices supported."
        },
        {
            id: 2,
            title: "PlayStation Plus 1-Year",
            price: "$59.99",
            status: "Pending",
            image: "https://via.placeholder.com/60x60/f0f7ff/0066cc?text=PS+",
            description: "PlayStation Plus annual subscription with access to free monthly games and online multiplayer. Includes exclusive discounts."
        },
        {
            id: 3,
            title: "Adobe Creative Suite",
            price: "$29.99/mo",
            status: "Sold",
            image: "https://via.placeholder.com/60x60/e6f7ff/0066cc?text=Adobe",
            description: "Full Adobe Creative Cloud subscription with Photoshop, Illustrator, and all premium Adobe apps. Student discount applied."
        }
    ];

    const [notification, setNotification] = useState([]);

    const fetchListing = async () => {
        try {
            const id = localStorage.getItem('id');
            if (id) {
                const response = await fetch(`${BaseUrl}/listing/${id}`);
                const json = await response.json();
                setListing(json);
            }
        } catch (e) {
            console.log('error fetching...', e);
        }
    };

    const fetchNotification = async () => {
        try {
            const id = localStorage.getItem('id');
            if (id) {
                const response = await fetch(`${BaseUrl}/notifications/receiver/${id}`);
                const json = await response.json();
                setNotification(json);
            }
        } catch (e) {
            console.log('error fetching...', e);
        }
    };

    const fetchProfile = async () => {
        try {
            const id = localStorage.getItem('id');
            if (id) {
                const response = await fetch(`${BaseUrl}/register/${id}`);
                const json = await response.json();
                setUser(json);
            }
        } catch (e) {
            console.log('error fetching...', e);
        }
    };

    useEffect(() => {
        fetchListing();
        fetchProfile();
        fetchNotification();
    }, []);

    const handleMyListings = () => setCurrentView('listings');
    const handleNotifications = () => setCurrentView('notifications');
    const handleBackToProfile = () => {
        setCurrentView('profile');
        setSelectedListing(null);
        setSelectedNotification(null);
    };

    const showListingDetails = (listing) => setSelectedListing(listing);
    const backToListings = () => setSelectedListing(null);
    const showNotificationDetails = (notification) => {
        setSelectedNotification(notification);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = localStorage.getItem('id');
        fetch(`${BaseUrl}/register/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error updating user:', error));
    };

    const updateNotification = async (notificationId) => {
        try {
            const response = await fetch(`${BaseUrl}/notifications/${notificationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ seen: true })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            fetchNotification();
        } catch (error) {
            console.error(error);
        }
    };

    const backToNotifications = () => setSelectedNotification(null);

    const handleEditProfile = () => setIsEditing(true);
    const handleCancelEdit = () => setIsEditing(false);
    const handleSaveProfile = (event) => {
        handleSubmit(event);
        setIsEditing(false);
    };

    const renderProfileView = () => (
        <>
            <div className="profile-section">
                <h2 className="section-title">Account Information</h2>
                <div className="profile-info-row">
                    <span className="info-label">Full Name:</span>
                    <span className="info-value">{user.name}</span>
                </div>
                <div className="profile-info-row">
                    <span className="info-label">Email Address:</span>
                    <span className="info-value">{user.email}</span>
                </div>
                <div className="profile-info-row">
                    <span className="info-label">Phone Number:</span>
                    <span className="info-value">{user.phone}</span>
                </div>
                <div className="profile-info-row">
                    <span className="info-label">Mailing Address:</span>
                    <span className="info-value">{user.address}</span>
                </div>
                <div className="profile-info-row">
                    <span className="info-label">City:</span>
                    <span className="info-value">{user.city}</span>
                </div>
                <div className="profile-info-row">
                    <span className="info-label">Country:</span>
                    <span className="info-value">{user.country}</span>
                </div>
            </div>

            <div className="profile-actions-section">
                <h2 className="section-title">Account Management</h2>
                <div className="action-buttons">
                    <button onClick={handleMyListings} className="profile-btn action-btn">
                        <span className="action-icon">📋</span>
                        My Listings
                        <span className="count-badge">{listing.length}</span>
                    </button>
                    <button onClick={handleNotifications} className="profile-btn action-btn">
                        <span className="action-icon">🔔</span>
                        Notifications
                        {notification.filter(n => !n.seen).length > 0 && (
                            <span className="count-badge">{notification.filter(n => !n.read).length}</span>
                        )}
                    </button>
                </div>
            </div>

            <div className="button-container">
                <button onClick={handleEditProfile} className="profile-btn primary-btn">Update Profile</button>
            </div>
        </>
    );

    const renderEditProfileView = () => (
        <>
            <div className="profile-section">
                <h2 className="section-title">Edit Account Information</h2>
                <div className="form-group">
                    <label htmlFor="edit-name">Full Name</label>
                    <input
                        type="text"
                        id="edit-name"
                        className="form-control"
                        value={user.name || ''}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-email">Email Address</label>
                    <input
                        type="email"
                        id="edit-email"
                        className="form-control"
                        value={user.email || ''}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-phone">Phone Number</label>
                    <input
                        type="tel"
                        id="edit-phone"
                        className="form-control"
                        value={user.phone || ''}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-address">Mailing Address</label>
                    <textarea
                        id="edit-address"
                        className="form-control"
                        rows="3"
                        value={user.address || ''}
                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="edit-city">City</label>
                    <input
                        type="text"
                        id="edit-city"
                        className="form-control"
                        value={user.city || ''}
                        onChange={(e) => setUser({ ...user, city: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-country">Country</label>
                    <input
                        type="text"
                        id="edit-country"
                        className="form-control"
                        value={user.country || ''}
                        onChange={(e) => setUser({ ...user, country: e.target.value })}
                    />
                </div>
            </div>
            <div className="button-container">
                <button onClick={handleCancelEdit} className="profile-btn secondary-btn">Cancel</button>
                <button onClick={handleSaveProfile} className="profile-btn primary-btn">Save Changes</button>
            </div>
        </>
    );

    const renderListings = () => (
        <div className="mock-data-view">
            <div className="view-header">
                <h2 className="section-title">My Listings</h2>
                <button className="profile-btn back-btn" onClick={handleBackToProfile}>
                    Back to Profile
                </button>
            </div>
            <div className="mock-items-container">
                {listing.map(item => (
                    <div
                        key={item._id}
                        className="mock-listing-item"
                        onClick={() => showListingDetails(item)}
                    >
                        <div className="mock-item-image">
                            <img src={item.uploadImage} alt={item.accountName} />
                        </div>
                        <div className="mock-item-details">
                            <h3 className="mock-item-title">{item.accountName}</h3>
                            <p className="mock-item-price">$ {item.accountPrice}</p>
                        </div>
                        <div className="mock-item-status">
                            <span className={`status-badge ${item.status.toLowerCase()}`}>
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderListingDetails = () => (
        <div className="mock-data-view">
            <div className="view-header">
                <button className="profile-btn back-btn" onClick={backToListings}>
                    <span className="back-icon">←</span> Back to Listings
                </button>
            </div>

            <div className="listing-detail-container">
                <div className="listing-detail-header">
                    <div className="listing-detail-image">
                        <img src={selectedListing.uploadImage} alt={selectedListing.accountName} />
                    </div>
                    <div className="listing-detail-title-section">
                        <h2 className="listing-detail-title">{selectedListing.accountName}</h2>
                        <div className="listing-detail-price-status">
                            <span className="listing-detail-price">$ {selectedListing.accountPrice}</span>
                            <span className={`status-badge ${selectedListing.status.toLowerCase()}`}>
                                {selectedListing.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="listing-detail-section">
                    <h3 className="section-subtitle">Description</h3>
                    <p className="listing-detail-description">{selectedListing.accountDescription}</p>
                </div>
                <div className="listing-detail-actions">
                    <button className="profile-btn secondary-btn">Edit Listing</button>
                    <button className="profile-btn primary-btn">View Offers</button>
                </div>
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="mock-data-view">
            <div className="view-header">
                <h2 className="section-title">Notifications</h2>
                <button className="profile-btn back-btn" onClick={handleBackToProfile}>
                    Back to Profile
                </button>
            </div>
            <div className="mock-items-container">
                {notification.map(item => (
                    <div
                        key={item._id}
                        className={`mock-notification-item ${item.seen ? '' : 'unread'}`}
                        onClick={() => { showNotificationDetails(item); updateNotification(item._id) }}
                    >
                        <div className="mock-notification-content">
                            <p className="mock-notification-message">{item.heading}</p>
                            <span className="mock-notification-time">{item.subHeading}</span>
                        </div>
                        {!item.seen && <span className="notification-dot"></span>}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderNotificationDetails = () => (
        <div className="mock-data-view">
            <div className="view-header">
                <button className="profile-btn back-btn" onClick={backToNotifications}>
                    <span className="back-icon">←</span> Back to Notifications
                </button>
            </div>

            <div className="notification-detail-container">
                <div className="notification-detail-header">
                    <span className="notification-detail-time">{selectedNotification.timestamp && timeAgo(selectedNotification?.timestamp)}</span>
                </div>

                <div className="notification-detail-content">
                    <h3 className="notification-detail-title">{selectedNotification.heading}</h3>
                    <p className="notification-detail-message">{selectedNotification.subHeading}</p>
                </div>

                {/* <div className="notification-detail-actions">
                    <button className="profile-btn primary-btn">Take Action</button>
                    <button className="profile-btn secondary-btn">Mark as Unread</button>
                </div> */}
            </div>
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar"></div>
                <h1 className="profile-title">{user.name}</h1>
            </div>

            <div id="profile-view-mode">
                {isEditing ? renderEditProfileView() : renderProfileView()}
                {currentView === 'listings' && !selectedListing && renderListings()}
                {currentView === 'listings' && selectedListing && renderListingDetails()}
                {currentView === 'notifications' && !selectedNotification && renderNotifications()}
                {currentView === 'notifications' && selectedNotification && renderNotificationDetails()}
            </div>
        </div>
    );
};

export default Profile;