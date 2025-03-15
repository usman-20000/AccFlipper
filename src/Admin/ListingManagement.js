import React, { useState, useEffect } from 'react';

const ListingManagement = ({ initialFilter = 'all' }) => {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'Netflix Premium Account',
      price: '$19.99',
      seller: 'John Doe',
      status: 'Active',
      date: '2023-07-10',
      type: 'Subscription'
    },
    {
      id: 2,
      title: 'Spotify Family Plan',
      price: '$14.99',
      seller: 'Jane Smith',
      status: 'Sold',
      date: '2023-07-05',
      type: 'Subscription'
    },
    {
      id: 3,
      title: 'PlayStation Plus 1-Year',
      price: '$59.99',
      seller: 'Mike Johnson',
      status: 'Pending',
      date: '2023-07-15',
      type: 'Subscription'
    },
    {
      id: 4,
      title: 'Adobe Creative Suite',
      price: '$29.99/mo',
      seller: 'Tom Wilson',
      status: 'Valuation',
      date: '2023-07-14',
      type: 'Software'
    },
    {
      id: 5,
      title: 'Xbox Game Pass Ultimate',
      price: '$16.99',
      seller: 'Sarah Lee',
      status: 'Active',
      date: '2023-07-09',
      type: 'Subscription'
    }
  ]);
  
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

  const handleDeleteListing = (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      const updatedListings = listings.filter(listing => listing.id !== listingId);
      setListings(updatedListings);
    }
  };

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
            <th>Seller</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredListings.map(listing => (
            <tr key={listing.id}>
              <td>{listing.title}</td>
              <td>{listing.price}</td>
              <td>{listing.seller}</td>
              <td>{listing.type}</td>
              <td>
                <span className={`status-badge status-${listing.status.toLowerCase()}`}>
                  {listing.status}
                </span>
              </td>
              <td>{listing.date}</td>
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
                    onClick={() => handleDeleteListing(listing.id)}
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
              <h3 className="admin-modal-title">{selectedListing.title}</h3>
              <button className="admin-modal-close" onClick={() => setShowListingModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="listing-detail-tabs">
                <div className="listing-detail-section">
                  <h4>Listing Information</h4>
                  <p><strong>Price:</strong> {selectedListing.price}</p>
                  <p><strong>Seller:</strong> {selectedListing.seller}</p>
                  <p><strong>Type:</strong> {selectedListing.type}</p>
                  <p><strong>Status:</strong> {selectedListing.status}</p>
                  <p><strong>Listed On:</strong> {selectedListing.date}</p>
                  
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
                        handleDeleteListing(selectedListing.id);
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
