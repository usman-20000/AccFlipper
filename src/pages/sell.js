import React, { useState, useEffect } from 'react';
import './sell.css';
import { BaseUrl } from '../utils/data';
import { imageListItemBarClasses } from '@mui/material';
import Footer from '../components/Footer';

const Sell = () => {
    const [formData, setFormData] = useState({
        accountName: '',
        accountURL: '',
        accountAge: '',
        accountType: '',
        accountDescription: '',
        accountPrice: '',
        contactEmail: '',
        phoneNumber: '',
        followers: '',
        engagement: '',
        revenue: '',
        platform: '',
        transactionType: {
            sell: true,
            valuation: false,
            exchange: false
        },
        exchangeRequirements: '',
        preferredPayment: 'paypal',
        termsAgree: false
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');
    const [transactionMode, setTransactionMode] = useState('single'); // 'single' or 'multiple'
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgh6eftpe/image/upload";

    // Define platform options for each account type
    const platformsByType = {
        social: [
            { value: "facebook", label: "Facebook" },
            { value: "instagram", label: "Instagram" },
            { value: "twitter", label: "Twitter/X" },
            { value: "tiktok", label: "TikTok" },
            { value: "linkedin", label: "LinkedIn" },
            { value: "snapchat", label: "Snapchat" },
            { value: "pinterest", label: "Pinterest" },
            { value: "reddit", label: "Reddit" },
            { value: "other", label: "Other Social Media" }
        ],
        gaming: [
            { value: "steam", label: "Steam" },
            { value: "xbox", label: "Xbox" },
            { value: "playstation", label: "PlayStation" },
            { value: "nintendo", label: "Nintendo" },
            { value: "epicgames", label: "Epic Games" },
            { value: "battlenet", label: "Battle.net" },
            { value: "origin", label: "EA Origin" },
            { value: "roblox", label: "Roblox" },
            { value: "minecraft", label: "Minecraft" },
            { value: "other", label: "Other Gaming Platform" }
        ],
        streaming: [
            { value: "youtube", label: "YouTube" },
            { value: "twitch", label: "Twitch" },
            { value: "tiktok", label: "TikTok" },
            { value: "instagram", label: "Instagram" },
            { value: "spotify", label: "Spotify" },
            { value: "applemusic", label: "Apple Music" },
            { value: "soundcloud", label: "SoundCloud" },
            { value: "rumble", label: "Rumble" },
            { value: "other", label: "Other Streaming Platform" }
        ],
        email: [
            { value: "gmail", label: "Gmail" },
            { value: "outlook", label: "Outlook" },
            { value: "yahoo", label: "Yahoo" },
            { value: "protonmail", label: "ProtonMail" },
            { value: "aol", label: "AOL" },
            { value: "icloud", label: "iCloud" },
            { value: "other", label: "Other Email Provider" }
        ],
        ecommerce: [
            { value: "shopify", label: "Shopify" },
            { value: "amazon", label: "Amazon" },
            { value: "ebay", label: "eBay" },
            { value: "etsy", label: "Etsy" },
            { value: "woocommerce", label: "WooCommerce" },
            { value: "aliexpress", label: "AliExpress" },
            { value: "mercadolibre", label: "Mercado Libre" },
            { value: "other", label: "Other E-Commerce Platform" }
        ],
        blog: [
            { value: "wordpress", label: "WordPress" },
            { value: "blogger", label: "Blogger" },
            { value: "medium", label: "Medium" },
            { value: "substack", label: "Substack" },
            { value: "wix", label: "Wix" },
            { value: "squarespace", label: "Squarespace" },
            { value: "tumblr", label: "Tumblr" },
            { value: "other", label: "Other Blog Platform" }
        ],
        other: [
            { value: "other", label: "Other Platform" }
        ]
    };

    // Get available platforms based on selected account type
    const getAvailablePlatforms = () => {
        if (!formData.accountType) return [];
        return platformsByType[formData.accountType] || platformsByType.other;
    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    // Reset platform when account type changes
    useEffect(() => {
        // Reset platform when account type changes
        setFormData(prev => ({
            ...prev,
            platform: ''
        }));
    }, [formData.accountType]);

    // Generate CSRF token on component mount
    useEffect(() => {
        const token = generateCSRFToken();
        setCsrfToken(token);
        sessionStorage.setItem('csrfToken', token);
    }, []);

    const generateCSRFToken = () => {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.accountName.trim()) newErrors.accountName = 'Account name is required';

        if (!formData.accountURL.trim()) {
            newErrors.accountURL = 'Account URL is required';
        } else if (!/^https?:\/\/.+/.test(formData.accountURL)) {
            newErrors.accountURL = 'Please enter a valid URL starting with http:// or https://';
        }

        if (!formData.accountAge) {
            newErrors.accountAge = 'Account age is required';
        } else if (parseFloat(formData.accountAge) < 0) {
            newErrors.accountAge = 'Age cannot be negative';
        }

        if (!formData.accountType) newErrors.accountType = 'Please select an account type';
        if (!formData.accountDescription.trim()) newErrors.accountDescription = 'Description is required';

        if (!formData.accountPrice) {
            newErrors.accountPrice = 'Price is required';
        } else if (parseFloat(formData.accountPrice) < 0) {
            newErrors.accountPrice = 'Price cannot be negative';
        }

        if (!formData.contactEmail.trim()) {
            newErrors.contactEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
            newErrors.contactEmail = 'Please enter a valid email address';
        }

        if (!formData.termsAgree) newErrors.termsAgree = 'You must agree to the terms';

        // Only validate exchange requirements if exchange is selected
        if (formData.transactionType.exchange && !formData.exchangeRequirements.trim()) {
            newErrors.exchangeRequirements = 'Please specify what you\'re looking to exchange for';
        }

        // Validate followers if provided
        if (formData.followers && isNaN(Number(formData.followers))) {
            newErrors.followers = 'Followers must be a number';
        }

        // Validate revenue if provided
        if (formData.revenue && isNaN(Number(formData.revenue))) {
            newErrors.revenue = 'Revenue must be a number';
        }

        // Validate phone if provided
        if (formData.phoneNumber && !/^\+?[\d\s-]{8,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();


            // const formErrors = validateForm();
            // if (Object.keys(formErrors).length > 0) {
            //     setErrors(formErrors);
            //     return;
            // }

            const id = localStorage.getItem('id');
            if (!id) {
                alert('Please login to submit a listing.');
                return;
            }

            if (!image) {
                alert('Please upload an image.');
                return;
            }

            let form = new FormData();
            form.append('file', image);
            form.append('upload_preset', 'FirstAccFlipper_preset');
            form.append('cloud_name', 'dgh6eftpe');

            const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: form,
            });

            const cloudinaryData = await cloudinaryResponse.json();
            console.log('Cloudinary Response:', cloudinaryData.secure_url);

            if (!cloudinaryData.secure_url) {
                alert('Image upload failed. Please try again.');
                return;
            }

            // Prepare listing data
            const listingData = {
                userId: id,
                accountName: formData.accountName || '',
                accountURL: formData.accountURL || '',
                accountAge: formData.accountAge || '',
                accountType: formData.accountType || '',
                uploadImage: cloudinaryData.secure_url || '',
                accountDescription: formData.accountDescription || '',
                accountPrice: formData.accountPrice || '',
                contactEmail: formData.contactEmail || '',
                phoneNumber: formData.phoneNumber || '',
                followers: formData.followers || '',
                engagement: formData.engagement || '',
                revenue: formData.revenue || '',
                platform: formData.platform || 'YouTube',
                transactionType: formData.transactionType || {
                    sell: true,
                    valuation: false,
                    exchange: false
                },
                exchangeRequirements: formData.exchangeRequirements || '',
                preferredPayment: formData.preferredPayment || 'paypal',
                termsAgree: formData.termsAgree || false
            };

            console.log('Final Data Sent:', listingData);

            const response = await fetch(`${BaseUrl}/listing`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(listingData)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('API Error:', result);
                alert(`Error: ${result.message || 'Failed to submit'}`);
                return;
            }

            console.log('Success:', result);
            alert('Uploaded successfully!');

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was a problem submitting your listing. Please try again.');
        }
    };



    const handleUpload = async () => {
        try {
            if (!image) {
                return;
            }

            let formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'FirstAccFlipper_preset');
            formData.append('cloud_name', 'dgh6eftpe');

            fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            }).then(async r => {
                let data = await r.json();
                console.log(data);
                if (data.secure_url) {
                    // Use the secure URL in your REST API
                    console.log(data.secure_url);
                    alert('Uploaded successfully...');
                }
            }).catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
    };
    const handleTransactionTypeChange = (type) => {
        if (transactionMode === 'single') {
            // In single mode, only one option can be selected
            setFormData(prev => ({
                ...prev,
                transactionType: {
                    sell: type === 'sell',
                    valuation: type === 'valuation',
                    exchange: type === 'exchange'
                }
            }));
        } else {
            // In multiple mode, toggle the selected option
            setFormData(prev => ({
                ...prev,
                transactionType: {
                    ...prev.transactionType,
                    [type]: !prev.transactionType[type]
                }
            }));

            // After toggling, check if all options are now deselected
            setTimeout(() => {
                const allDeselected = !formData.transactionType.sell &&
                    !formData.transactionType.valuation &&
                    !formData.transactionType.exchange;

                // If all are deselected, force the clicked one to be selected
                if (allDeselected) {
                    setFormData(prev => ({
                        ...prev,
                        transactionType: {
                            ...prev.transactionType,
                            [type]: true
                        }
                    }));
                }
            }, 10);
        }
    };

    const toggleTransactionMode = () => {
        if (transactionMode === 'single') {
            setTransactionMode('multiple');
        } else {
            // When switching back to single mode, keep only the first selected option
            const types = ['sell', 'valuation', 'exchange'];
            const selectedType = types.find(type => formData.transactionType[type]) || 'sell';

            setTransactionMode('single');
            setFormData(prev => ({
                ...prev,
                transactionType: {
                    sell: selectedType === 'sell',
                    valuation: selectedType === 'valuation',
                    exchange: selectedType === 'exchange'
                }
            }));
        }
    };

    // Helper to determine if any transaction type is selected
    const isAnyTransactionSelected = () => {
        return formData.transactionType.sell ||
            formData.transactionType.valuation ||
            formData.transactionType.exchange;
    };

    // This function determines the button class based on the selected transaction types
    const getSubmitButtonClass = () => {
        const { sell, valuation, exchange } = formData.transactionType;

        if (sell && !valuation && !exchange) return 'submit-btn sell';
        if (!sell && valuation && !exchange) return 'submit-btn valuation';
        if (!sell && !valuation && exchange) return 'submit-btn exchange';
        if (sell || valuation || exchange) return 'submit-btn multiple';

        return 'submit-btn';
    };

    return (
        <>
            <div className="sell-page">
                <div className="form-container">
                    <h2>List Your Account</h2>

                    <div className={`transaction-type-selector ${transactionMode === 'multiple' ? 'multiple-mode' : ''}`}>
                        <div className="transaction-header">
                            <h3>What would you like to do with your account?</h3>
                            <div className={`transaction-mode-toggle ${transactionMode === 'multiple' ? 'active' : ''}`}>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={transactionMode === 'multiple'}
                                        onChange={toggleTransactionMode}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                                <span className="toggle-label">
                                    {transactionMode === 'multiple' ? 'Multiple options' : 'Single option'}
                                </span>
                            </div>
                        </div>

                        <div className={`transaction-options ${transactionMode === 'multiple' ? 'multiple-mode' : ''}`}>
                            <div
                                className={`transaction-option ${formData.transactionType.sell ? 'selected' : ''}`}
                                onClick={() => handleTransactionTypeChange('sell')}
                            >
                                <input
                                    type="checkbox"
                                    id="sellOption"
                                    checked={formData.transactionType.sell}
                                    onChange={() => { }}
                                />
                                <label htmlFor="sellOption">
                                    <span className="option-icon">💰</span>
                                    <span className="option-text">Sell</span>
                                    <span className="option-description">List your account for sale</span>
                                </label>
                            </div>

                            <div
                                className={`transaction-option ${formData.transactionType.valuation ? 'selected' : ''}`}
                                onClick={() => handleTransactionTypeChange('valuation')}
                            >
                                <input
                                    type="checkbox"
                                    id="valuationOption"
                                    checked={formData.transactionType.valuation}
                                    onChange={() => { }}
                                />
                                <label htmlFor="valuationOption">
                                    <span className="option-icon">📊</span>
                                    <span className="option-text">Get Valuation</span>
                                    <span className="option-description">Find out what your account is worth</span>
                                </label>
                            </div>

                            <div
                                className={`transaction-option ${formData.transactionType.exchange ? 'selected' : ''}`}
                                onClick={() => handleTransactionTypeChange('exchange')}
                            >
                                <input
                                    type="checkbox"
                                    id="exchangeOption"
                                    checked={formData.transactionType.exchange}
                                    onChange={() => { }}
                                />
                                <label htmlFor="exchangeOption">
                                    <span className="option-icon">🔄</span>
                                    <span className="option-text">Exchange</span>
                                    <span className="option-description">Trade your account for another</span>
                                </label>
                            </div>
                        </div>

                        {!isAnyTransactionSelected() && (
                            <div className="transaction-warning">
                                Please select at least one option to proceed
                            </div>
                        )}

                        {transactionMode === 'multiple' && (
                            <div className="transaction-info">
                                <i className="info-icon">ℹ️</i> Click on multiple boxes to combine options (e.g., sell AND get a valuation)
                            </div>
                        )}
                    </div>

                    <form id="sellAccountForm" onSubmit={handleSubmit}>
                        <input type="hidden" name="csrf_token" value={csrfToken} />

                        <div className="form-section">
                            <h3>Account Details</h3>

                            <div className="form-group">
                                <label htmlFor="accountName">Account Name *</label>
                                <input
                                    type="text"
                                    id="accountName"
                                    name="accountName"
                                    value={formData.accountName}
                                    onChange={handleChange}
                                    className={errors.accountName ? 'error' : ''}
                                />
                                {errors.accountName && <span className="error-message">{errors.accountName}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="accountURL">Account URL *</label>
                                <input
                                    type="url"
                                    id="accountURL"
                                    name="accountURL"
                                    placeholder="https://example.com"
                                    value={formData.accountURL}
                                    onChange={handleChange}
                                    className={errors.accountURL ? 'error' : ''}
                                />
                                {errors.accountURL && <span className="error-message">{errors.accountURL}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="accountAge">Account Age (years) *</label>
                                <input
                                    type="number"
                                    id="accountAge"
                                    name="accountAge"
                                    min="0"
                                    step="0.1"
                                    value={formData.accountAge}
                                    onChange={handleChange}
                                    className={errors.accountAge ? 'error' : ''}
                                />
                                {errors.accountAge && <span className="error-message">{errors.accountAge}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="accountType">Account Type *</label>
                                <select
                                    id="accountType"
                                    name="accountType"
                                    value={formData.accountType}
                                    onChange={handleChange}
                                    className={errors.accountType ? 'error' : ''}
                                >
                                    <option value="">Select account type</option>
                                    <option value="social">Social Media</option>
                                    <option value="gaming">Gaming</option>
                                    <option value="streaming">Streaming</option>
                                    <option value="email">Email</option>
                                    <option value="ecommerce">E-Commerce</option>
                                    <option value="blog">Blog/Website</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.accountType && <span className="error-message">{errors.accountType}</span>}
                            </div>

                            {formData.accountType && (
                                <div className="form-group">
                                    <label htmlFor="platform">Platform *</label>
                                    <select
                                        id="platform"
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleChange}
                                        className={errors.platform ? 'error' : ''}>
                                        <option value="">Select platform</option>
                                        {getAvailablePlatforms().map(platform => (
                                            <option key={platform.value} value={platform.value}>
                                                {platform.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.platform && <span className="error-message">{errors.platform}</span>}
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="contactEmail">Upload Image *</label>
                                <input
                                    type="file"
                                    id="updloadImage"
                                    name="updloadImage"
                                    onChange={handleFileChange}
                                    className={errors.contactEmail ? 'error' : ''}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Performance Metrics</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="followers">Followers/Subscribers</label>
                                    <input
                                        type="text"
                                        id="followers"
                                        name="followers"
                                        placeholder="e.g., 10000"
                                        value={formData.followers}
                                        onChange={handleChange}
                                        className={errors.followers ? 'error' : ''}
                                    />
                                    {errors.followers && <span className="error-message">{errors.followers}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="engagement">Engagement Rate (%)</label>
                                    <input
                                        type="text"
                                        id="engagement"
                                        name="engagement"
                                        placeholder="e.g., 3.5"
                                        value={formData.engagement}
                                        onChange={handleChange}
                                        className={errors.engagement ? 'error' : ''}
                                    />
                                    {errors.engagement && <span className="error-message">{errors.engagement}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="revenue">Monthly Revenue ($)</label>
                                <input
                                    type="text"
                                    id="revenue"
                                    name="revenue"
                                    placeholder="e.g., 500"
                                    value={formData.revenue}
                                    onChange={handleChange}
                                    className={errors.revenue ? 'error' : ''}
                                />
                                {errors.revenue && <span className="error-message">{errors.revenue}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="accountDescription">Description *</label>
                                <textarea
                                    id="accountDescription"
                                    name="accountDescription"
                                    rows="4"
                                    placeholder="Describe your account, its niche, content, and any other relevant details"
                                    value={formData.accountDescription}
                                    onChange={handleChange}
                                    className={errors.accountDescription ? 'error' : ''}
                                ></textarea>
                                {errors.accountDescription && <span className="error-message">{errors.accountDescription}</span>}
                            </div>
                        </div>

                        {(formData.transactionType.sell || formData.transactionType.valuation) && (
                            <div className="form-section">
                                <h3>{formData.transactionType.sell ? 'Pricing' : 'Valuation'} Information</h3>

                                <div className="form-group">
                                    <label htmlFor="accountPrice">{formData.transactionType.sell ? 'Asking Price ($) *' : 'Desired Valuation ($)'}</label>
                                    <input
                                        type="number"
                                        id="accountPrice"
                                        name="accountPrice"
                                        min="0"
                                        step="0.01"
                                        value={formData.accountPrice}
                                        onChange={handleChange}
                                        className={errors.accountPrice ? 'error' : ''}
                                        required={formData.transactionType.sell}
                                    />
                                    {errors.accountPrice && <span className="error-message">{errors.accountPrice}</span>}
                                </div>

                                {formData.transactionType.sell && (
                                    <div className="form-group">
                                        <label htmlFor="preferredPayment">Preferred Payment Method</label>
                                        <select
                                            id="preferredPayment"
                                            name="preferredPayment"
                                            value={formData.preferredPayment}
                                            onChange={handleChange}
                                        >
                                            <option value="paypal">PayPal</option>
                                            <option value="bankTransfer">Bank Transfer</option>
                                            <option value="crypto">Cryptocurrency</option>
                                            <option value="escrow">Escrow</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        )}

                        {formData.transactionType.exchange && (
                            <div className="form-section">
                                <h3>Exchange Details</h3>

                                <div className="form-group">
                                    <label htmlFor="exchangeRequirements">What are you looking for in exchange? *</label>
                                    <textarea
                                        id="exchangeRequirements"
                                        name="exchangeRequirements"
                                        rows="3"
                                        placeholder="Describe what type of account you'd like to exchange for"
                                        value={formData.exchangeRequirements}
                                        onChange={handleChange}
                                        className={errors.exchangeRequirements ? 'error' : ''}
                                    ></textarea>
                                    {errors.exchangeRequirements && <span className="error-message">{errors.exchangeRequirements}</span>}
                                </div>
                            </div>
                        )}

                        <div className="form-section">
                            <h3>Contact Information</h3>

                            <div className="form-group">
                                <label htmlFor="contactEmail">Contact Email *</label>
                                <input
                                    type="email"
                                    id="contactEmail"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    className={errors.contactEmail ? 'error' : ''}
                                />
                                {errors.contactEmail && <span className="error-message">{errors.contactEmail}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number (optional)</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="+1 (123) 456-7890"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={errors.phoneNumber ? 'error' : ''}
                                />
                                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                            </div>
                        </div>

                        <div className="form-group checkbox-group">
                            <input
                                type="checkbox"
                                id="termsAgree"
                                name="termsAgree"
                                checked={formData.termsAgree}
                                onChange={handleChange}
                                className={errors.termsAgree ? 'error' : ''}
                            />
                            <label htmlFor="termsAgree">I agree to the Terms and Conditions *</label>
                            {errors.termsAgree && <span className="error-message">{errors.termsAgree}</span>}
                        </div>

                        <button
                            type="submit"
                            className={getSubmitButtonClass()}
                            disabled={!isAnyTransactionSelected()}
                        >
                            {formData.transactionType.sell && !formData.transactionType.valuation && !formData.transactionType.exchange && 'List For Sale'}
                            {!formData.transactionType.sell && formData.transactionType.valuation && !formData.transactionType.exchange && 'Request Valuation'}
                            {!formData.transactionType.sell && !formData.transactionType.valuation && formData.transactionType.exchange && 'Post Exchange Offer'}
                            {((formData.transactionType.sell && formData.transactionType.valuation) ||
                                (formData.transactionType.sell && formData.transactionType.exchange) ||
                                (formData.transactionType.valuation && formData.transactionType.exchange) ||
                                (formData.transactionType.sell && formData.transactionType.valuation && formData.transactionType.exchange)) && 'Submit Listing'}
                        </button>
                    </form>
                    {submitted && (
                        <div className="success-message">
                            Thank you for your submission! Your listing will be reviewed shortly.
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Sell;
