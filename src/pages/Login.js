import React, { useState } from 'react';
import './Login.css';
import { BaseUrl } from '../utils/data';
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        email: '',
        password: ''
    });

    // Add loading state for the submit button
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleConfirmPass = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // console.log('formdata:', formData);
        try {
            // Validate form
            if (isSignup && formData.password !== confirmPassword) {
                alert('Passwords don\'t match. Please try again.');
                return;
            }
            const url = isSignup ? `${BaseUrl}/register` : `${BaseUrl}/login`;
            const method = isSignup ? 'POST' : 'POST';
            const headers = { 'Content-Type': 'application/json' };
            const body = isSignup
                ? JSON.stringify(formData)
                : JSON.stringify({ email: formData.email, password: formData.password });
            const response = await fetch(url, { method, headers, body });
            const data = await response.json();

            if (response.ok) {
                console.log('response:', data.data);
                if (!isSignup) {
                    localStorage.setItem('id', data.data.id);
                    navigate('/Home');
                } else {
                    setIsSignup(false);
                }
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Username"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {isSignup && (
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPass}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                            ? (isSignup ? 'Creating Account...' : 'Signing In...')
                            : (isSignup ? 'Create Account' : 'Sign In')
                        }
                    </button>
                </form>
                <p>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        className="switch-btn"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;