import React, { useState } from 'react';
import './Contact.css';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    reason: 'general'
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Form submission successful
      setFormStatus({ submitted: true, submitting: false, error: null });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        reason: 'general'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: false,
        submitting: false,
        error: 'There was an error submitting your message. Please try again.'
      });
    }
  };

  return (
    <>
      <div className="contact-container">
        <section className="contact-header">
          <div className="contact-header-content">
            <h1>Contact Us</h1>
            <p>Get in touch with our team for any inquiries about account trading, valuations, or support.</p>
          </div>
        </section>

        <section className="contact-main">
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon customer-service"></div>
                <h3>Customer Service</h3>
                <p>Our support team is available 24/7 to assist you with any questions or issues.</p>
                <div className="contact-detail">
                  <strong>Email:</strong> support@accflipper.com
                </div>
                <div className="contact-detail">
                  <strong>Phone:</strong> +92 (305) 845-2080
                </div>
                <div className="contact-detail">
                  <strong>Hours:</strong> 24/7
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon business"></div>
                <h3>Business Inquiries</h3>
                <p>For partnerships, press, or business-related matters, contact our business team.</p>
                <div className="contact-detail">
                  <strong>Email:</strong> business@accflipper.com
                </div>
                <div className="contact-detail">
                  <strong>Phone:</strong> +92 (305) 845-2080
                </div>
                <div className="contact-detail">
                  <strong>Hours:</strong> Mon-Fri 9AM-5PM PKT
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon location"></div>
                <h3>Our Location</h3>
                <p>Visit our office for in-person consultations or account valuations.</p>
                <address className="contact-detail">
                  123 Canal Avenue<br />
                  Khawaja Banglows<br />
                  Rahim Yar Khan, Pakistan 64200
                </address>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              {formStatus.submitted ? (
                <div className="form-success">
                  <div className="success-icon"></div>
                  <h3>Thank you for contacting us!</h3>
                  <p>We've received your message and will get back to you as soon as possible, usually within 24 hours.</p>
                  <button
                    className="new-message-btn"
                    onClick={() => setFormStatus({ submitted: false, submitting: false, error: null })}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  {formStatus.error && (
                    <div className="form-error">{formStatus.error}</div>
                  )}

                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your email address"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number (optional)"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason">Inquiry Type *</label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="account-valuation">Account Valuation</option>
                      <option value="buying">Buying Accounts</option>
                      <option value="selling">Selling Accounts</option>
                      <option value="exchange">Account Exchange</option>
                      <option value="support">Technical Support</option>
                      <option value="business">Business Partnership</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Subject of your message"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe your inquiry in detail"
                      rows={5}
                    ></textarea>
                  </div>

                  <div className="form-footer">
                    <p className="privacy-note">
                      By submitting this form, you agree to our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
                    </p>
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={formStatus.submitting}
                    >
                      {formStatus.submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How quickly will I receive a response?</h3>
                <p>We strive to respond to all inquiries within 24 hours during business days. For urgent matters, consider calling our customer service number directly.</p>
              </div>

              <div className="faq-item">
                <h3>Can I get an account valuation over the phone?</h3>
                <p>Initial consultations can be done over the phone, but for accurate valuations, we'll need detailed account information which is best submitted through our secure form.</p>
              </div>

              <div className="faq-item">
                <h3>Do you offer in-person meetings?</h3>
                <p>Yes, for high-value transactions or detailed consultations, we offer in-person meetings at our office in Rahim Yar Khan. Please contact us to schedule an appointment.</p>
              </div>

              <div className="faq-item">
                <h3>Is my information kept confidential?</h3>
                <p>Absolutely. All information shared with us is treated with the highest level of confidentiality and is protected according to our Privacy Policy.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
