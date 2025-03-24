import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
  Skeleton,
  Rating,
  Tooltip,
  Dialog,
  DialogContent,
  Fade,
} from '@mui/material';
import {
  Search as SearchIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  VerifiedUser as VerifiedUserIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { BaseUrl, timeAgo } from "../utils/data";
import './Buy.css';

const Buy = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState([]);
  const [selectedListing, setSelectedListing] = useState({});
  const [showListingModal, setShowListingModal] = useState(false);


  const accountsPerPage = 12;

  // Fetch accounts from the backend
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BaseUrl}/listing`);
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }

        const data = await response.json();
        const activeData = data.filter((item) => item.status.toLowerCase() === "active");
        setAccounts(activeData);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Filter and sort accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch =
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.platform.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || account.accountType === selectedCategory;

    const matchesPlatform = selectedPlatform === 'all' || account.platform.toLowerCase() === selectedPlatform.toLowerCase();

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLowToHigh':
        return a.accountPrice - b.accountPrice;
      case 'priceHighToLow':
        return b.accountPrice - a.accountPrice;
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Pagination
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = sortedAccounts.slice(indexOfFirstAccount, indexOfLastAccount);
  const totalPages = Math.ceil(sortedAccounts.length / accountsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewListing = (listing) => {
    setSelectedListing(listing);
    setShowListingModal(true);
  };

  return (
    <Box className="buy-page">
      <Container sx={{ py: 12 }}>
        {/* Search and Filter Section */}
        <Box className="search-filter-container">
          <TextField
            placeholder="Search accounts..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Account Listings */}
        <Grid container spacing={3}>
          {loading
            ? Array(8)
              .fill()
              .map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton variant="text" height={32} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" />
                </Grid>
              ))
            : currentAccounts.map((account) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={account._id}>
                <Card onClick={() => handleViewListing(account)} className="account-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={account.uploadImage}
                    alt={account.accountName}
                  />
                  <CardContent>
                    <Typography variant="h6">{account.accountName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {account.accountDescription}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${account.accountPrice}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      fullWidth
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* Pagination */}
        {!loading && (
          <Box className="pagination-container">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Container>
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
                    {selectedListing.accountDescription}
                  </p>
                </div>

                <div className="listing-admin-actions">
                  <h4 style={{ marginBottom: '5%' }}>Actions</h4>
                  <div className="admin-action-buttons">
                    {selectedListing.status.toLowerCase() === 'pending' && (
                      <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => {
                          // handleStatusChange(selectedListing._id, 'Active');
                          setShowListingModal(false);
                        }}
                      >
                        Approve Listing
                      </button>
                    )}

                    <a href={`/chat/${selectedListing.userId}`} className="admin-btn admin-btn-secondary">
                      Message Seller
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Buy;