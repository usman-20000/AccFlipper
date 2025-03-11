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
  Divider,
  Badge,
  Paper,
  Dialog,
  DialogContent,
  Fade,
  ListItem,
  ListItemIcon,
  ListItemText,
  List
} from '@mui/material';
import { 
  Search as SearchIcon,
  GridView as GridViewIcon, 
  ViewList as ListViewIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  FilterAlt as FilterIcon,
  Sort as SortIcon,
  VerifiedUser as VerifiedUserIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  SearchOff as SearchOffIcon,
  Star as StarIcon,
  Close as CloseIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
  SupportAgent as SupportAgentIcon,
  ContactSupport as ContactSupportIcon,
  CalendarToday as CalendarTodayIcon,
  ChatBubble,
  ChatBubbleOutline
} from '@mui/icons-material';
import './Buy.css';

const Buy = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all'); // New state for platform selection
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const accountsPerPage = 12;
  
  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'social', label: 'Social Media' },
    { value: 'streaming', label: 'Streaming' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'finance', label: 'Finance' },
    { value: 'other', label: 'Other' }
  ];

  // Platforms based on categories
  const platformsByCategory = {
    all: [{ value: 'all', label: 'All Platforms' }],
    gaming: [
      { value: 'all', label: 'All Gaming Platforms' },
      { value: 'steam', label: 'Steam' },
      { value: 'epic', label: 'Epic Games' },
      { value: 'origin', label: 'Origin / EA Play' },
      { value: 'battle.net', label: 'Battle.net' },
      { value: 'xbox', label: 'Xbox Live' },
      { value: 'playstation', label: 'PlayStation Network' },
      { value: 'nintendo', label: 'Nintendo' },
      { value: 'uplay', label: 'Ubisoft Connect' },
      { value: 'rockstar', label: 'Rockstar Games' },
      { value: 'gog', label: 'GOG' },
      { value: 'minecraft', label: 'Minecraft' },
      { value: 'roblox', label: 'Roblox' },
      { value: 'valorant', label: 'Valorant' },
      { value: 'fortnite', label: 'Fortnite' },
      { value: 'leagueoflegends', label: 'League of Legends' },
      { value: 'worldofwarcraft', label: 'World of Warcraft' },
      { value: 'genshinimpact', label: 'Genshin Impact' },
      { value: 'mobilelegends', label: 'Mobile Legends' },
      { value: 'pubg', label: 'PUBG' },
      { value: 'apexlegends', label: 'Apex Legends' },
      { value: 'callofduty', label: 'Call of Duty' },
      { value: 'csgo', label: 'CS:GO' },
      { value: 'dota2', label: 'Dota 2' }
    ],
    social: [
      { value: 'all', label: 'All Social Media' },
        { value: 'youtube', label: 'YouTube' },
      { value: 'facebook', label: 'Facebook' },
      { value: 'instagram', label: 'Instagram' },
      { value: 'twitter', label: 'Twitter' },
      { value: 'tiktok', label: 'TikTok' },
      { value: 'snapchat', label: 'Snapchat' },
      { value: 'linkedin', label: 'LinkedIn' },
      { value: 'pinterest', label: 'Pinterest' },
      { value: 'reddit', label: 'Reddit' },
      { value: 'tumblr', label: 'Tumblr' },
      { value: 'quora', label: 'Quora' },
      { value: 'discord', label: 'Discord' },
      { value: 'telegram', label: 'Telegram' },
      { value: 'whatsapp', label: 'WhatsApp' },
      { value: 'signal', label: 'Signal' },
      { value: 'slack', label: 'Slack' },
      { value: 'clubhouse', label: 'Clubhouse' },
      { value: 'vk', label: 'VKontakte' },
      { value: 'weibo', label: 'Weibo' },
      { value: 'line', label: 'Line' },
      { value: 'kakaotalk', label: 'KakaoTalk' },
      { value: 'wechat', label: 'WeChat' },
      { value: 'threads', label: 'Threads' },
      { value: 'mastodon', label: 'Mastodon' }
    ],
    streaming: [
      { value: 'all', label: 'All Streaming Platforms' },
      { value: 'twitch', label: 'Twitch' },
      { value: 'netflix', label: 'Netflix' },
      { value: 'disney+', label: 'Disney+' },
      { value: 'hulu', label: 'Hulu' },
      { value: 'spotify', label: 'Spotify' },
      { value: 'apple-music', label: 'Apple Music' },
      { value: 'amazonprime', label: 'Amazon Prime Video' },
      { value: 'hbomax', label: 'HBO Max' },
      { value: 'peacock', label: 'Peacock' },
      { value: 'paramountplus', label: 'Paramount+' },
      { value: 'crunchyroll', label: 'Crunchyroll' },
      { value: 'funimation', label: 'Funimation' },
      { value: 'deezer', label: 'Deezer' },
      { value: 'tidal', label: 'Tidal' },
      { value: 'pandora', label: 'Pandora' },
      { value: 'amazonmusic', label: 'Amazon Music' },
      { value: 'youtubepremium', label: 'YouTube Premium' },
      { value: 'appletv', label: 'Apple TV+' },
      { value: 'soundcloud', label: 'SoundCloud' },
      { value: 'mubi', label: 'MUBI' },
      { value: 'viki', label: 'Viki' },
      { value: 'curiositystream', label: 'CuriosityStream' }
    ],
    ecommerce: [
      { value: 'all', label: 'All E-Commerce' },
      { value: 'amazon', label: 'Amazon' },
      { value: 'ebay', label: 'eBay' },
      { value: 'etsy', label: 'Etsy' },
      { value: 'shopify', label: 'Shopify' },
      { value: 'walmart', label: 'Walmart' },
      { value: 'aliexpress', label: 'AliExpress' },
      { value: 'wish', label: 'Wish' },
      { value: 'target', label: 'Target' },
      { value: 'bestbuy', label: 'Best Buy' },
      { value: 'wayfair', label: 'Wayfair' },
      { value: 'newegg', label: 'Newegg' },
      { value: 'homedepot', label: 'Home Depot' },
      { value: 'overstock', label: 'Overstock' },
      { value: 'zalando', label: 'Zalando' },
      { value: 'lazada', label: 'Lazada' },
      { value: 'mercadolibre', label: 'Mercado Libre' },
      { value: 'shein', label: 'SHEIN' },
      { value: 'rakuten', label: 'Rakuten' },
      { value: 'temu', label: 'Temu' },
      { value: 'flipkart', label: 'Flipkart' },
      { value: 'asos', label: 'ASOS' }
    ],
    finance: [
      { value: 'all', label: 'All Finance' },
      { value: 'paypal', label: 'PayPal' },
      { value: 'venmo', label: 'Venmo' },
      { value: 'cashapp', label: 'Cash App' },
      { value: 'crypto', label: 'Crypto Exchanges' },
      { value: 'banking', label: 'Banking' },
      { value: 'investing', label: 'Investing' },
      { value: 'coinbase', label: 'Coinbase' },
      { value: 'binance', label: 'Binance' },
      { value: 'robinhood', label: 'Robinhood' },
      { value: 'etrade', label: 'E*TRADE' },
      { value: 'stripe', label: 'Stripe' },
      { value: 'chase', label: 'Chase' },
      { value: 'bankofamerica', label: 'Bank of America' },
      { value: 'wellsfargo', label: 'Wells Fargo' },
      { value: 'americanexpress', label: 'American Express' },
      { value: 'zelle', label: 'Zelle' },
      { value: 'klarna', label: 'Klarna' },
      { value: 'affirm', label: 'Affirm' },
      { value: 'wise', label: 'Wise' },
      { value: 'revolut', label: 'Revolut' },
      { value: 'kraken', label: 'Kraken' },
      { value: 'ftx', label: 'FTX' },
      { value: 'citibank', label: 'Citibank' }
    ],
    other: [
      { value: 'all', label: 'All Others' },
      { value: 'email', label: 'Email Services' },
      { value: 'domain', label: 'Domain Services' },
      { value: 'cloud', label: 'Cloud Storage' },
      { value: 'education', label: 'Education' },
      { value: 'productivity', label: 'Productivity' },
      { value: 'gmail', label: 'Gmail' },
      { value: 'outlook', label: 'Outlook' },
      { value: 'protonmail', label: 'ProtonMail' },
      { value: 'yahoomail', label: 'Yahoo Mail' },
      { value: 'godaddy', label: 'GoDaddy' },
      { value: 'namecheap', label: 'Namecheap' },
      { value: 'googleworkspace', label: 'Google Workspace' },
      { value: 'office365', label: 'Office 365' },
      { value: 'dropbox', label: 'Dropbox' },
      { value: 'googledrive', label: 'Google Drive' },
      { value: 'onedrive', label: 'OneDrive' },
      { value: 'icloud', label: 'iCloud' },
      { value: 'coursera', label: 'Coursera' },
      { value: 'udemy', label: 'Udemy' },
      { value: 'skillshare', label: 'Skillshare' },
      { value: 'masterclass', label: 'MasterClass' },
      { value: 'duolingo', label: 'Duolingo' },
      { value: 'canva', label: 'Canva' },
      { value: 'adobe', label: 'Adobe Creative Cloud' },
      { value: 'notion', label: 'Notion' },
      { value: 'trello', label: 'Trello' },
      { value: 'evernote', label: 'Evernote' }
    ],
  };

  // Get available platforms based on selected category
  const availablePlatforms = platformsByCategory[selectedCategory] || platformsByCategory.all;

  // Mock account data - this would normally come from an API
  useEffect(() => {
    const fetchAccounts = async () => {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data
      const mockAccounts = [];
      const accountTypes = ['gaming', 'social', 'streaming', 'ecommerce', 'finance', 'other'];
      const platforms = {
        gaming: ['Steam', 'Epic Games', 'Origin', 'Battle.net', 'Xbox Live', 'PlayStation Network', 'Nintendo'],
        social: ['Facebook', 'Instagram', 'Twitter', 'TikTok', 'Snapchat', 'LinkedIn', 'Pinterest'],
        streaming: ['Twitch', 'YouTube', 'Netflix', 'Disney+', 'Hulu', 'Spotify', 'Apple Music'],
        ecommerce: ['Amazon', 'eBay', 'Etsy', 'Shopify', 'Walmart', 'AliExpress'],
        finance: ['PayPal', 'Venmo', 'Cash App', 'Coinbase', 'Robinhood', 'Banking Apps'],
        other: ['Email Services', 'Domain Registrars', 'Cloud Storage', 'Educational Platforms', 'Productivity Tools']
      };
      
      for (let i = 1; i <= 50; i++) {
        const category = accountTypes[Math.floor(Math.random() * accountTypes.length)];
        const platform = platforms[category][Math.floor(Math.random() * platforms[category].length)];
        const price = Math.floor(Math.random() * 1000) + 50;
        const rating = (Math.random() * 3 + 2).toFixed(1); // Rating between 2-5
        
        mockAccounts.push({
          id: i,
          title: `${platform} Account - Premium`,
          description: `Level ${Math.floor(Math.random() * 100 + 1)} ${platform} account with ${Math.floor(Math.random() * 500 + 10)} items.`,
          category: category,
          platform: platform,
          price: price,
          image: `https://source.unsplash.com/random/300x200?${platform.toLowerCase().replace(/[^a-z0-9]/g, '')}&sig=${i}`,
          rating: parseFloat(rating),
          reviewCount: Math.floor(Math.random() * 200),
          dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
          verified: Math.random() > 0.3, // 70% of accounts are verified
          features: [
            `${Math.floor(Math.random() * 5 + 1)} years old`,
            `${Math.floor(Math.random() * 100 + 1)} connections`,
            Math.random() > 0.5 ? 'Original Email' : 'Email Changeable'
          ]
        });
      }
      
      setAccounts(mockAccounts);
      setLoading(false);
    };

    fetchAccounts();
  }, []);

  // Load favorites from local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('accountFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Reset platform when category changes
  useEffect(() => {
    setSelectedPlatform('all');
  }, [selectedCategory]);

  // Save favorites to local storage
  const toggleFavorite = (accountId) => {
    const newFavorites = favorites.includes(accountId)
      ? favorites.filter(id => id !== accountId)
      : [...favorites, accountId];
    
    setFavorites(newFavorites);
    localStorage.setItem('accountFavorites', JSON.stringify(newFavorites));
  };

  // Handle opening the details modal
  const handleOpenDetails = (account) => {
    setSelectedAccount(account);
    setDetailsModalOpen(true);
  };

  // Handle closing the details modal
  const handleCloseDetails = () => {
    setDetailsModalOpen(false);
    // Reset selected account after animation completes
    setTimeout(() => setSelectedAccount(null), 300);
  };

  // Filter and sort accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.platform.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || account.category === selectedCategory;
    
    const matchesPlatform = selectedPlatform === 'all' || 
                            account.platform.toLowerCase() === selectedPlatform.toLowerCase();
    
    const matchesPriceRange = account.price >= priceRange[0] && account.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPlatform && matchesPriceRange;
  });

  // Sort accounts based on selected sort option
  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLowToHigh':
        return a.price - b.price;
      case 'priceHighToLow':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'oldest':
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case 'newest':
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
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

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedPlatform('all'); // Reset platform when changing category
    setCurrentPage(1);
  };

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterDrawerToggle = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  // Enhanced render account cards function
  const renderAccountCards = () => {
    if (loading) {
      return Array(8).fill().map((_, index) => (
        <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} lg={viewMode === 'grid' ? 3 : 12} key={index}>
          {viewMode === 'grid' ? (
            <Card className="account-card-skeleton">
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton variant="text" height={32} width="80%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="40%" />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Skeleton variant="text" height={30} width="30%" />
                  <Skeleton variant="circular" height={40} width={40} />
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card className="account-card-skeleton list-view">
              <Box sx={{ display: 'flex', height: '100%' }}>
                <Skeleton variant="rectangular" width={200} height="100%" />
                <CardContent sx={{ flex: 1 }}>
                  <Skeleton variant="text" height={32} width="60%" />
                  <Skeleton variant="text" height={20} width="80%" />
                  <Skeleton variant="text" height={20} width="40%" />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton variant="text" height={30} width="30%" />
                    <Skeleton variant="circular" height={40} width={40} />
                  </Box>
                </CardContent>
              </Box>
            </Card>
          )}
        </Grid>
      ));
    }

    if (currentAccounts.length === 0) {
      return (
        <Box className="empty-state-container">
          <SearchOffIcon className="empty-state-icon" />
          <Typography variant="h5" color="textSecondary" gutterBottom>
            No accounts found
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
            We couldn't find any accounts matching your current filters. Try adjusting your search criteria or browse our entire collection.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedPlatform('all');
              setPriceRange([0, 10000]);
              setSortBy('newest');
            }}
            sx={{
              borderRadius: 30,
              px: 3,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(63, 81, 181, 0.25)'
            }}
          >
            Clear All Filters
          </Button>
        </Box>
      );
    }

    return currentAccounts.map(account => (
      <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} lg={viewMode === 'grid' ? 3 : 12} key={account.id}>
        {viewMode === 'grid' ? (
          <Card className="account-card" elevation={0}>
            {/* Image Container with Overlay */}
            <Box className="account-image-container">
              <CardMedia
                component="img"
                height="220"
                image={account.image}
                alt={account.title}
                className="account-image"
              />
              <Box className="account-overlay">
                <Button 
                  variant="contained" 
                  color="primary" 
                  className="view-details-btn"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleOpenDetails(account)}
                >
                  View Details
                </Button>
              </Box>
            </Box>
            
            {/* Card Badges */}
            <Box className="card-badges">
              <IconButton 
                className="favorite-button"
                onClick={() => toggleFavorite(account.id)}
                aria-label={favorites.includes(account.id) ? "Remove from favorites" : "Add to favorites"}
                size="small"
              >
                {favorites.includes(account.id) ? 
                  <FavoriteIcon color="error" /> : 
                  <FavoriteBorderIcon />
                }
              </IconButton>
              
              {account.verified && (
                <Tooltip title="Verified Account" placement="left" arrow>
                  <Box className="verified-badge">
                    <VerifiedUserIcon className="verified-badge-icon" />
                    <Typography variant="caption" component="span">Verified</Typography>
                  </Box>
                </Tooltip>
              )}
            </Box>
            
            {/* Card Content */}
            <Box className="card-content">
              <Typography variant="h6" component="h2" className="account-title">
                {account.title}
              </Typography>
              
              <Box className="card-chips">
                <Chip 
                  label={account.platform} 
                  size="small" 
                  className="platform-chip"
                />
                <Chip 
                  label={account.category} 
                  size="small" 
                  className="category-chip"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" className="account-description">
                {account.description}
              </Typography>
              
              <Box className="rating-container">
                <Rating 
                  value={account.rating} 
                  precision={0.5} 
                  size="small" 
                  readOnly 
                  emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                />
                <Typography variant="body2" className="rating-count">
                  ({account.reviewCount})
                </Typography>
              </Box>
              
              <Box className="card-footer">
                <Typography variant="h6" component="p" className="account-price">
                  <span className="price-currency">$</span>{account.price}
                </Typography>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  size="medium"
                  startIcon={<ShoppingCartIcon />}
                  className="buy-now-btn"
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Card>
        ) : (
          <Card className="account-card list-view" elevation={0}>
            <Box sx={{ display: 'flex', height: '100%' }}>
              {/* Image Container */}
              <Box sx={{ position: 'relative', width: 240, minWidth: 240 }} className="account-image-container">
                <CardMedia
                  component="img"
                  sx={{ height: '100%', width: '100%' }}
                  image={account.image}
                  alt={account.title}
                  className="account-image"
                />
                
                <IconButton 
                  className="favorite-button"
                  onClick={() => toggleFavorite(account.id)}
                  aria-label={favorites.includes(account.id) ? "Remove from favorites" : "Add to favorites"}
                  size="small"
                  sx={{ position: 'absolute', top: 12, right: 12 }}
                >
                  {favorites.includes(account.id) ? 
                    <FavoriteIcon color="error" /> : 
                    <FavoriteBorderIcon />
                  }
                </IconButton>
                
                {account.verified && (
                  <Tooltip title="Verified Account" placement="top" arrow>
                    <Box className="verified-badge" sx={{ position: 'absolute', bottom: 12, left: 12 }}>
                      <VerifiedUserIcon className="verified-badge-icon" />
                      <Typography variant="caption" component="span">Verified</Typography>
                    </Box>
                  </Tooltip>
                )}
              </Box>
              
              {/* List View Content */}
              <Box className="list-view-content">
                <Box className="list-view-header">
                  <Box className="list-view-title-section">
                    <Typography variant="h6" component="h2" className="account-title">
                      {account.title}
                    </Typography>
                    
                    <Box className="card-chips">
                      <Chip 
                        label={account.platform} 
                        size="small" 
                        className="platform-chip"
                      />
                      <Chip 
                        label={account.category} 
                        size="small" 
                        className="category-chip"
                      />
                      
                      <Box className="rating-container" sx={{ display: 'inline-flex', ml: 1 }}>
                        <Rating 
                          value={account.rating} 
                          precision={0.5} 
                          size="small" 
                          readOnly 
                          emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                        />
                        <Typography variant="body2" className="rating-count">
                          ({account.reviewCount})
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box className="list-view-price">
                    <Typography variant="h6" component="p" className="account-price" color="primary">
                      <span className="price-currency">$</span>{account.price}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" className="account-description">
                  {account.description}
                </Typography>
                
                <Box className="list-view-features">
                  {account.features.map((feature, index) => (
                    <Chip 
                      key={index}
                      label={feature}
                      size="small"
                      className="feature-chip"
                    />
                  ))}
                </Box>
                
                <Box className="list-view-footer">
                  <Typography variant="body2" className="date-added">
                    <CalendarTodayIcon fontSize="small" sx={{ fontSize: 16, opacity: 0.7 }} />
                    Added {new Date(account.dateAdded).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Typography>
                  
                  <Box className="action-buttons">
                    <Button 
                      variant="outlined" 
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      className="details-btn"
                      onClick={() => handleOpenDetails(account)}
                    >
                      Details
                    </Button>
                    
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      className="buy-now-btn"
                    >
                      Buy Now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        )}
      </Grid>
    ));
  };

  return (
    <Box className="buy-page">
      <Box className="buy-hero">
        <Container>
          <Typography variant="h2" component="h1">
            Buy Premium Accounts
          </Typography>
          <Typography variant="body1">
            Browse our verified collection of high-quality accounts available for purchase
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        {/* Filter and search section */}
        <Paper elevation={0} className="search-filter-container">
          <Box className="search-bar">
            <TextField
              placeholder="Search accounts by platform, title, or description..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box className="filter-controls">
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 300 }
                  }
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Platform Filter - Only show when category is selected */}
            <FormControl sx={{ minWidth: 180, display: selectedCategory !== 'all' ? 'block' : 'none' }}>
              <InputLabel id="platform-label">Platform</InputLabel>
              <Select
                labelId="platform-label"
                value={selectedPlatform}
                onChange={handlePlatformChange}
                label="Platform"
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 300 }
                  }
                }}
              >
                {availablePlatforms.map((platform) => (
                  <MenuItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
              </Select>
            </FormControl>

            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
              sx={{ 
                '& .MuiToggleButton-root': { 
                  border: '1px solid #e0e0e0',
                  px: 2
                },
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: 'rgba(63, 81, 181, 0.08)',
                  color: '#3f51b5'
                }
              }}
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ListViewIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleFilterDrawerToggle}
              className="filter-button-mobile"
              sx={{ borderRadius: 30 }}
            >
              Filter
            </Button>
          </Box>
        </Paper>

        {/* Active filters display */}
        {(selectedCategory !== 'all' || selectedPlatform !== 'all') && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2, mb: 1 }}>
            {selectedCategory !== 'all' && (
              <Chip
                label={`Category: ${categories.find(c => c.value === selectedCategory)?.label}`}
                onDelete={() => setSelectedCategory('all')}
                color="primary"
                variant="outlined"
                sx={{ borderRadius: '20px' }}
              />
            )}
            {selectedPlatform !== 'all' && (
              <Chip
                label={`Platform: ${availablePlatforms.find(p => p.value === selectedPlatform)?.label}`}
                onDelete={() => setSelectedPlatform('all')}
                color="primary"
                variant="outlined"
                sx={{ borderRadius: '20px' }}
              />
            )}
          </Box>
        )}

        {/* Results summary */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            my: 3,
            px: 2
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {loading ? 
              'Loading accounts...' : 
              `Showing ${filteredAccounts.length > 0 ? `${indexOfFirstAccount + 1}-${Math.min(indexOfLastAccount, filteredAccounts.length)} of ` : ''}${filteredAccounts.length} accounts`
            }
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 30, px: 2, py: 0.5, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <SortIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 500 }}>
              Sort by:
            </Typography>
            <FormControl size="small" variant="standard" sx={{ m: 0, minWidth: 120 }}>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                disableUnderline
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        {/* Account listings */}
        <Grid container spacing={3}>
          {renderAccountCards()}
        </Grid>

        {/* Pagination */}
        {!loading && filteredAccounts.length > 0 && (
          <Box className="pagination-container">
            <Pagination 
              count={totalPages} 
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              siblingCount={1}
            />
          </Box>
        )}
      </Container>

      {/* Account Details Modal */}
      <Dialog
        open={detailsModalOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        classes={{ paper: 'details-modal' }}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
      >
        {selectedAccount && (
          <>
            <IconButton
              aria-label="close"
              onClick={handleCloseDetails}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: 'grey.500',
                zIndex: 1,
                bgcolor: 'rgba(255,255,255,0.9)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,1)',
                  transform: 'scale(1.1) rotate(90deg)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <DialogContent className="details-modal-content" sx={{ p: 0 }}>
              <Grid container>
                {/* Account Image Section */}
                <Grid item xs={12} md={5} className="details-image-container">
                  <img 
                    src={selectedAccount.image} 
                    alt={selectedAccount.title} 
                    className="details-account-image"
                  />
                  {selectedAccount.verified && (
                    <Chip
                      icon={<VerifiedUserIcon />}
                      label="Verified Account"
                      color="primary"
                      variant="filled"
                      size="small"
                      className="details-verified-badge"
                    />
                  )}
                </Grid>
                
                {/* Account Details Section */}
                <Grid item xs={12} md={7} className="details-info-container">
                  <Box className="details-header">
                    <Typography variant="h4" component="h2" className="details-title">
                      {selectedAccount.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, mb: 2 }}>
                      <Rating 
                        value={selectedAccount.rating} 
                        precision={0.5} 
                        readOnly 
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({selectedAccount.reviewCount} reviews)
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                      <Chip 
                        label={selectedAccount.platform} 
                        className="platform-chip"
                      />
                      <Chip 
                        label={selectedAccount.category} 
                        className="category-chip"
                      />
                      <Chip 
                        label={`Added ${new Date(selectedAccount.dateAdded).toLocaleDateString()}`} 
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box className="details-section">
                    <Typography variant="h6" gutterBottom>Description</Typography>
                    <Typography variant="body1" paragraph>
                      {selectedAccount.description}
                      {/* Extended description for modal */}
                      {` This premium account has been verified by our team and is ready for immediate transfer. 
                      The account is in excellent standing with no restrictions or limitations.`}
                    </Typography>
                  </Box>
                  
                  <Box className="details-section">
                    <Typography variant="h6" gutterBottom>Features</Typography>
                    <List>
                      {selectedAccount.features.map((feature, index) => (
                        <ListItem key={index} sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleOutlineIcon color="success" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                      {/* Additional generated features for details modal */}
                      <ListItem sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="No purchase history can be tracked" />
                      </ListItem>
                      <ListItem sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Account recovery options available" />
                      </ListItem>
                    </List>
                  </Box>
                  
                  <Box className="details-section">
                    <Typography variant="h6" gutterBottom>Security & Transfer</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <SecurityIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Secure Transfer" 
                          secondary="We use our secured escrow service for all transfers" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <HistoryIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Transfer Time" 
                          secondary="Usually completed within 24 hours" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SupportAgentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Support" 
                          secondary="30-day transfer support included" 
                        />
                      </ListItem>
                    </List>
                  </Box>
                  
                  {/* Price and action buttons */}
                  <Box className="details-purchase" sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h5" component="p" color="primary" sx={{ fontWeight: 700 }}>
                        ${selectedAccount.price}
                      </Typography>
                      
                      <IconButton 
                        color={favorites.includes(selectedAccount.id) ? "error" : "default"}
                        onClick={() => toggleFavorite(selectedAccount.id)}
                        sx={{ border: '1px solid rgba(0,0,0,0.12)', p: 1.5 }}
                      >
                        {favorites.includes(selectedAccount.id) ? 
                          <FavoriteIcon /> : 
                          <FavoriteBorderIcon />
                        }
                      </IconButton>
                    </Box>
                    
                    <Button 
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      startIcon={<ShoppingCartIcon />}
                      sx={{ 
                        borderRadius: 30,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1.1rem'
                      }}
                    >
                      Buy Now
                    </Button>
                    
                    <Button
                      fullWidth
                      sx={{
                        mt: 1.5,
                        borderRadius: 30,
                        color: 'text.secondary',
                        textTransform: 'none',
                      }}
                      startIcon={<ChatBubbleOutline/>}
                    >
                      Chat with Seller
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Buy;
