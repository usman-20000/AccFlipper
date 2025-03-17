import React, { useState, useEffect } from 'react';
import { BaseUrl, timeAgo } from '../utils/data';

const ListingManagement = ({ initialFilter = 'all' }) => {
  const [listings, setListings] = useState([]);

  const [selectedListing, setSelectedListing] = useState(null);
  const [showListingModal, setShowListingModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(initialFilter);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Update filter when initialFilter prop changes
  useEffect(() => {
    setFilterStatus(initialFilter);
  }, [initialFilter]);

  const filteredListings = listings.filter(listing => {
    // Filter by status
    if (filterStatus !== 'all' && listing.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }

    // Filter by type
    if (filterType !== 'all' && listing.type.toLowerCase() !== filterType.toLowerCase()) {
      return false;
    }

    // Filter by search query
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !listing.seller.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleViewListing = (listing) => {
    setSelectedListing(listing);
    setShowListingModal(true);
  };

  const handleStatusChange = (listingId, newStatus) => {
    const updatedListings = listings.map(listing =>
      listing.id === listingId ? { ...listing, status: newStatus } : listing
    );
    setListings(updatedListings);
  };

  const handleDeleteListing = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      const updatedListings = listings.filter(listing => listing._id !== listingId);
      setListings(updatedListings);
     const response = await fetch(`${BaseUrl}/listing/${listingId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          if (!response.ok) {
            throw new Error(data.message || 'Failed to delete listing');
          }
        })
        .catch(error => {
          console.error('Error deleting listing:', error);
        });
    }
  };

  const fetchListing = async () => {
    try {
      const response = await fetch(`${BaseUrl}/listing`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch listings');
      }
      if (response.ok) {
        setListings(data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <div className="listing-management">
      <h2>Listing Management {filterStatus !== 'all' ? `- ${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Listings` : ''}</h2>

      <div className="admin-filters">
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search listings..."
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
            <option value="sold">Sold</option>
            <option value="valuation">Valuation</option>
          </select>

          <select
            className="admin-filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="subscription">Subscription</option>
            <option value="software">Software</option>
            <option value="game">Game</option>
          </select>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            {/* <th>Seller</th> */}
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredListings.map(listing => (
            <tr key={listing._id}>
              <td>{listing.accountName}</td>
              <td>{listing.accountPrice}</td>
              {/* <td>{listing.seller}</td> */}
              <td>{listing.platform}</td>
              <td>
                <span className={`status-badge status-${listing.status.toLowerCase()}`}>
                  {listing.status}
                </span>
              </td>
              <td>{listing.createdAt && timeAgo(listing.createdAt)}</td>
              <td>
                <div className="admin-table-actions">
                  <button
                    className="admin-table-btn admin-table-btn-view"
                    onClick={() => handleViewListing(listing)}
                  >
                    View
                  </button>
                  {listing.status === 'Pending' && (
                    <button
                      className="admin-table-btn admin-table-btn-edit"
                      onClick={() => handleStatusChange(listing.id, 'Active')}
                    >
                      Approve
                    </button>
                  )}
                  {(listing.status === 'Active' || listing.status === 'Pending') && (
                    <button
                      className="admin-table-btn admin-table-btn-edit"
                      onClick={() => handleStatusChange(listing.id, 'Sold')}
                    >
                      Mark Sold
                    </button>
                  )}
                  <button
                    className="admin-table-btn admin-table-btn-delete"
                    onClick={() => handleDeleteListing(listing._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showListingModal && selectedListing && (
        <div className="admin-modal-backdrop" onClick={() => setShowListingModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{selectedListing.accountName}</h3>
              <button className="admin-modal-close" onClick={() => setShowListingModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="listing-detail-tabs">
                <div className="listing-detail-section">
                  <h4>Listing Information</h4>
                  <p><strong>Name:</strong> {selectedListing.accountName}</p>
                  <p><strong>Price:</strong> {selectedListing.accountPrice}</p>
                  {/* <p><strong>Seller:</strong> {selectedListing.seller}</p>
                  <p><strong>Type:</strong> {selectedListing.type}</p> */}
                  <p><strong>Status:</strong> {selectedListing.status}</p>
                  <p><strong>Listed On:</strong> {selectedListing.createdAt && timeAgo(selectedListing.createdAt)}</p>

                  <h4>Description</h4>
                  <p>
                    {selectedListing.type === 'Subscription'
                      ? 'Premium subscription with all features included. Account has been verified and is in good standing.'
                      : 'Full version software with all features unlocked. License is transferable and valid for 1 year.'}
                  </p>

                  {selectedListing.status === 'Valuation' && (
                    <div className="valuation-section">
                      <h4>Valuation Request</h4>
                      <div className="valuation-form">

                        <div className="admin-form-group">
                          <label className="admin-form-label">Estimated Value</label>
                          <input type="text" className="admin-form-control" placeholder="Enter estimated value" />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-form-label">Comments</label>
                          <textarea className="admin-form-control admin-form-textarea" placeholder="Enter valuation comments"></textarea>
                        </div>
                        <div className="admin-form-actions">
                          <button className="admin-btn admin-btn-primary">Submit Valuation</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="listing-admin-actions">
                  <h4>Admin Actions</h4>
                  <div className="admin-action-buttons">
                    {selectedListing.status === 'Pending' && (
                      <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => {
                          handleStatusChange(selectedListing.id, 'Active');
                          setShowListingModal(false);
                        }}
                      >
                        Approve Listing
                      </button>
                    )}

                    {(selectedListing.status === 'Active' || selectedListing.status === 'Pending') && (
                      <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => {
                          handleStatusChange(selectedListing.id, 'Sold');
                          setShowListingModal(false);
                        }}
                      >
                        Mark as Sold
                      </button>
                    )}

                    <button className="admin-btn admin-btn-secondary">
                      Message Seller
                    </button>

                    <button
                      className="admin-btn admin-btn-danger"
                      onClick={() => {
                        handleDeleteListing(selectedListing._id);
                        setShowListingModal(false);
                      }}
                    >
                      Delete Listing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingManagement;
