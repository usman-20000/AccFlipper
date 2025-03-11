import React, { useState, useEffect } from 'react';
import './Exchange.css';
// Import Material-UI components to match Buy page
// You may need to install these dependencies: @mui/material @mui/icons-material
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

const Exchange = () => {
    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [platform, setPlatform] = useState('');
    const [platformOptions, setPlatformOptions] = useState([]);
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        // Mock data with more diverse account types
        setTimeout(() => {
            const mockAccounts = [
                // Gaming accounts
                { 
                    id: 1, 
                    name: 'Steam Gaming Account', 
                    type: 'gaming',
                    platform: 'steam',
                    level: 120, 
                    value: '$250', 
                    games: ['Counter-Strike', 'Half-Life'],
                    description: 'High-level Steam account with rare items and 300+ games',
                    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                { 
                    id: 2, 
                    name: 'Xbox Game Pass Ultimate', 
                    type: 'gaming',
                    platform: 'xbox',
                    level: 50, 
                    value: '$180', 
                    games: ['Halo Infinite', 'Forza Horizon'],
                    description: 'Xbox account with Game Pass Ultimate subscription and multiple games',
                    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                
                // Social media accounts
                { 
                    id: 3, 
                    name: 'Instagram Influencer Account', 
                    type: 'social',
                    platform: 'instagram',
                    followers: '10K+', 
                    value: '$150', 
                    platforms: ['Instagram'],
                    description: 'Established lifestyle influencer account with engaged audience',
                    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                { 
                    id: 4, 
                    name: 'TikTok Creator Account', 
                    type: 'social',
                    platform: 'tiktok',
                    followers: '25K+', 
                    value: '$300', 
                    platforms: ['TikTok'],
                    description: 'Growing TikTok account with viral content potential',
                    image: 'https://images.unsplash.com/photo-1601706569523-c59a17110305?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                
                // Streaming accounts
                { 
                    id: 5, 
                    name: 'Netflix Premium Bundle', 
                    type: 'streaming',
                    platform: 'netflix',
                    subscriptions: 'Premium', 
                    value: '$120', 
                    services: ['Netflix'],
                    description: 'Netflix premium subscription with 4K streaming and multiple profiles',
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                { 
                    id: 6, 
                    name: 'Disney+ Annual Account', 
                    type: 'streaming',
                    platform: 'disney',
                    subscriptions: 'Annual', 
                    value: '$80', 
                    services: ['Disney+'],
                    description: 'Annual Disney+ subscription with all content access',
                    image: 'https://images.unsplash.com/photo-1620286068086-11959ade9b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                
                // Finance accounts
                { 
                    id: 7, 
                    name: 'Coinbase Pro Account', 
                    type: 'finance',
                    platform: 'coinbase',
                    level: 'Verified', 
                    value: '$200', 
                    features: ['Verified', 'Trading History'],
                    description: 'Fully verified Coinbase Pro account with trading history',
                    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                { 
                    id: 8, 
                    name: 'Robinhood Investor Account', 
                    type: 'finance',
                    platform: 'robinhood',
                    level: 'Gold', 
                    value: '$350', 
                    features: ['Gold Status', 'Extended Trading'],
                    description: 'Gold status Robinhood account with extended trading hours',
                    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                
                // E-commerce accounts
                { 
                    id: 9, 
                    name: 'Amazon Prime Membership', 
                    type: 'ecommerce',
                    platform: 'amazon',
                    level: 'Prime', 
                    value: '$70', 
                    features: ['Prime', 'Prime Video'],
                    description: 'Amazon Prime account with all benefits and services',
                    image: 'https://images.unsplash.com/photo-1563884072595-35f7a511a5ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                { 
                    id: 10, 
                    name: 'Shopify Store Account', 
                    type: 'ecommerce',
                    platform: 'shopify',
                    level: 'Advanced', 
                    value: '$400', 
                    features: ['Advanced Plan', 'Themes'],
                    description: 'Established Shopify store with advanced plan and premium themes',
                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                }
            ];
            
            setAccounts(mockAccounts);
            setFilteredAccounts(mockAccounts);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter accounts whenever filter criteria change
    useEffect(() => {
        if (!accounts.length) return;
        
        let results = [...accounts];
        
        // Filter by account type
        if (filterType) {
            results = results.filter(account => account.type === filterType);
        }
        
        // Filter by platform
        if (platform) {
            results = results.filter(account => account.platform === platform);
        }
        
        // Filter by price range
        if (priceRange) {
            const numericValue = account => parseFloat(account.value.replace('$', ''));
            
            switch(priceRange) {
                case '0-50':
                    results = results.filter(account => numericValue(account) <= 50);
                    break;
                case '50-100':
                    results = results.filter(account => numericValue(account) > 50 && numericValue(account) <= 100);
                    break;
                case '100-200':
                    results = results.filter(account => numericValue(account) > 100 && numericValue(account) <= 200);
                    break;
                case '200+':
                    results = results.filter(account => numericValue(account) > 200);
                    break;
                default:
                    break;
            }
        }
        
        // Filter by search term
        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase().trim();
            results = results.filter(account => 
                account.name.toLowerCase().includes(search) || 
                account.description.toLowerCase().includes(search)
            );
        }
        
        setFilteredAccounts(results);
    }, [accounts, filterType, platform, priceRange, searchTerm]);

    // Handle search input changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const selectedType = e.target.value;
        setFilterType(selectedType);
        setPlatform(''); // Reset platform when account type changes
        
        // Update platform options based on selected account type
        switch(selectedType) {
            case 'gaming':
                setPlatformOptions([
                    { value: 'steam', label: 'Steam' },
                    { value: 'epic', label: 'Epic Games' },
                    { value: 'origin', label: 'Origin' },
                    { value: 'xbox', label: 'Xbox' },
                    { value: 'playstation', label: 'PlayStation' },
                    { value: 'nintendo', label: 'Nintendo' },
                    { value: 'battle-net', label: 'Battle.net' },
                    { value: 'riot', label: 'Riot Games' }
                ]);
                break;
            case 'social':
                setPlatformOptions([
                    { value: 'instagram', label: 'Instagram' },
                    { value: 'tiktok', label: 'TikTok' },
                    { value: 'facebook', label: 'Facebook' },
                    { value: 'twitter', label: 'Twitter' },
                    { value: 'snapchat', label: 'Snapchat' },
                    { value: 'youtube', label: 'YouTube' },
                    { value: 'twitch', label: 'Twitch' },
                    { value: 'linkedin', label: 'LinkedIn' }
                ]);
                break;
            case 'streaming':
                setPlatformOptions([
                    { value: 'netflix', label: 'Netflix' },
                    { value: 'disney', label: 'Disney+' },
                    { value: 'hulu', label: 'Hulu' },
                    { value: 'prime', label: 'Amazon Prime' },
                    { value: 'hbo', label: 'HBO Max' },
                    { value: 'apple', label: 'Apple TV+' },
                    { value: 'spotify', label: 'Spotify' },
                    { value: 'youtube-premium', label: 'YouTube Premium' }
                ]);
                break;
            case 'finance':
                setPlatformOptions([
                    { value: 'paypal', label: 'PayPal' },
                    { value: 'venmo', label: 'Venmo' },
                    { value: 'cashapp', label: 'Cash App' },
                    { value: 'robinhood', label: 'Robinhood' },
                    { value: 'coinbase', label: 'Coinbase' },
                    { value: 'binance', label: 'Binance' },
                    { value: 'etrade', label: 'E*TRADE' },
                    { value: 'fidelity', label: 'Fidelity' }
                ]);
                break;
            case 'ecommerce':
                setPlatformOptions([
                    { value: 'amazon', label: 'Amazon' },
                    { value: 'ebay', label: 'eBay' },
                    { value: 'etsy', label: 'Etsy' },
                    { value: 'shopify', label: 'Shopify' },
                    { value: 'walmart', label: 'Walmart' },
                    { value: 'aliexpress', label: 'AliExpress' },
                    { value: 'target', label: 'Target' },
                    { value: 'wish', label: 'Wish' }
                ]);
                break;
            default:
                setPlatformOptions([]);
                break;
        }
    };

    // Handle view mode change
    const handleViewModeChange = (event, newViewMode) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    };

    // Handle platform filter change
    const handlePlatformChange = (e) => {
        setPlatform(e.target.value);
    };

    // Handle price range change
    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    return (
        <div className="exchange-page">
            <div className="exchange-hero">
                <h1>Exchange Accounts</h1>
                <p>Browse and exchange premium accounts with other users</p>
            </div>
            
            <div className="container">
                <div className="search-filter-container">
                    <div className="search-bar">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search accounts..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    
                    <div className="filter-controls">
                        <FormControl variant="outlined">
                            <InputLabel id="account-type-label">Account Type</InputLabel>
                            <Select
                                labelId="account-type-label"
                                id="account-type"
                                value={filterType}
                                onChange={handleFilterChange}
                                label="Account Type"
                            >
                                <MenuItem value="">All Types</MenuItem>
                                <MenuItem value="gaming">Gaming</MenuItem>
                                <MenuItem value="social">Social Media</MenuItem>
                                <MenuItem value="streaming">Streaming</MenuItem>
                                <MenuItem value="finance">Finance</MenuItem>
                                <MenuItem value="ecommerce">E-Commerce</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl variant="outlined">
                            <InputLabel id="platform-label">Platform</InputLabel>
                            <Select
                                labelId="platform-label"
                                id="platform"
                                value={platform}
                                onChange={handlePlatformChange}
                                label="Platform"
                                disabled={platformOptions.length === 0}
                            >
                                <MenuItem value="">All Platforms</MenuItem>
                                {platformOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <FormControl variant="outlined">
                            <InputLabel id="price-range-label">Price Range</InputLabel>
                            <Select
                                labelId="price-range-label"
                                id="price-range"
                                value={priceRange}
                                onChange={handlePriceRangeChange}
                                label="Price Range"
                            >
                                <MenuItem value="">All Prices</MenuItem>
                                <MenuItem value="0-50">$0 - $50</MenuItem>
                                <MenuItem value="50-100">$50 - $100</MenuItem>
                                <MenuItem value="100-200">$100 - $200</MenuItem>
                                <MenuItem value="200+">$200+</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl variant="outlined">
                            <InputLabel id="sort-by-label">Sort By</InputLabel>
                            <Select
                                labelId="sort-by-label"
                                id="sort-by"
                                value=""
                                label="Sort By"
                            >
                                <MenuItem value="featured">Featured</MenuItem>
                                <MenuItem value="newest">Newest First</MenuItem>
                                <MenuItem value="price-high">Price: High to Low</MenuItem>
                                <MenuItem value="price-low">Price: Low to High</MenuItem>
                            </Select>
                        </FormControl>
                        
                        
                        <IconButton className="filter-button-mobile">
                            <FilterListIcon />
                        </IconButton>
                    </div>
                </div>
                
                <div className="view-toggle-container">
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewModeChange}
                        aria-label="view mode"
                    >
                        <ToggleButton value="grid" aria-label="grid view">
                            <GridViewIcon />
                        </ToggleButton>
                        <ToggleButton value="list" aria-label="list view">
                            <ViewListIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {loading ? (
                    <div className="loading">Loading available accounts...</div>
                ) : filteredAccounts.length > 0 ? (
                    <div className={viewMode === 'grid' ? "accounts-grid" : "accounts-list"}>
                        {filteredAccounts.map(account => (
                            <div className={`account-card ${viewMode === 'list' ? 'list-view' : ''}`} key={account.id}>
                                {viewMode === 'grid' ? (
                                    // Grid view layout
                                    <>
                                        <div className="account-image-container">
                                            <img 
                                                src={account.image} 
                                                alt={account.name} 
                                                className="account-image" 
                                            />
                                            <div className="account-overlay">
                                                <button className="view-details-btn">View Details</button>
                                            </div>
                                            <div className="card-badges">
                                                <div className="verified-badge">
                                                    <span className="verified-badge-icon">✓</span>
                                                    Verified
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="card-content">
                                            <h3 className="account-title">{account.name}</h3>
                                            <p className="account-description">{account.description}</p>
                                            
                                            <div className="card-chips">
                                                {account.games && account.games.map(game => (
                                                    <span className="platform-chip" key={game}>{game}</span>
                                                ))}
                                                {account.platforms && account.platforms.map(platform => (
                                                    <span className="category-chip" key={platform}>{platform}</span>
                                                ))}
                                                {account.services && account.services.map(service => (
                                                    <span className="feature-chip" key={service}>{service}</span>
                                                ))}
                                            </div>
                                            
                                            <div className="rating-container">
                                                <span>★★★★★</span>
                                                <span className="rating-count">(5.0)</span>
                                            </div>
                                            
                                            <div className="card-footer">
                                                <div className="account-price">
                                                    <span className="price-currency">$</span>
                                                    {account.value.replace('$', '')}
                                                </div>
                                                <button className="exchange-now-btn">Exchange Now</button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // List view layout
                                    <div className="list-view-container">
                                        <div className="list-view-image">
                                            <img 
                                                src={account.image} 
                                                alt={account.name} 
                                                className="account-image" 
                                            />
                                            <div className="account-overlay">
                                                <button className="view-details-btn">View Details</button>
                                            </div>
                                            <div className="card-badges">
                                                <div className="verified-badge">
                                                    <span className="verified-badge-icon">✓</span>
                                                    Verified
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="list-view-content">
                                            <div className="list-view-header">
                                                <div className="list-view-title-section">
                                                    <h3 className="account-title">{account.name}</h3>
                                                    <p className="account-description">{account.description}</p>
                                                </div>
                                                <div className="list-view-price">
                                                    <div className="account-price">
                                                        <span className="price-currency">$</span>
                                                        {account.value.replace('$', '')}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="list-view-features">
                                                {account.games && account.games.map(game => (
                                                    <span className="platform-chip" key={game}>{game}</span>
                                                ))}
                                                {account.platforms && account.platforms.map(platform => (
                                                    <span className="category-chip" key={platform}>{platform}</span>
                                                ))}
                                                {account.services && account.services.map(service => (
                                                    <span className="feature-chip" key={service}>{service}</span>
                                                ))}
                                            </div>
                                            
                                            <div className="list-view-footer">
                                                <div className="date-added">
                                                    <span>Added 2 days ago</span>
                                                </div>
                                                <div className="action-buttons">
                                                    <button className="details-btn">View Details</button>
                                                    <button className="exchange-now-btn">Exchange Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state-container">
                        <div className="empty-state-icon">🔍</div>
                        <h3>No accounts found</h3>
                        <p>Try changing your search criteria or filters</p>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => {
                                setFilterType('');
                                setPlatform('');
                                setPriceRange('');
                                setSearchTerm('');
                            }}
                            style={{ marginTop: '20px' }}
                        >
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Exchange;