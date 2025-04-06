import React from 'react';
import './Privacy.css';
import Footer from '../components/Footer';

const Privacy = () => {
  // Get current date for last updated
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: {lastUpdated}</p>
        </div>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>Introduction</h2>
            <p>
              AccFlipper ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
              your personal information is collected, used, and disclosed by AccFlipper when you use our website
              (www.accflipper.com), mobile application, or any of our services (collectively, the "Services").
            </p>
            <p>
              This Privacy Policy applies to all users of our Services, including buyers, sellers, and visitors. By accessing or
              using our Services, you agree to this Privacy Policy. If you do not agree with our policies and practices, do not
              use our Services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Information We Collect</h2>

            <h3>Information You Provide to Us</h3>
            <p>We collect information you provide directly to us when you:</p>
            <ul>
              <li>Create an account or user profile</li>
              <li>Complete transactions or process payments</li>
              <li>Communicate with other users through our platform</li>
              <li>Contact our customer support</li>
              <li>Respond to surveys or promotions</li>
              <li>Post content or comments</li>
            </ul>

            <p>This information may include:</p>
            <ul>
              <li>Personal identifiers (name, email address, phone number, postal address)</li>
              <li>Account credentials (username and password)</li>
              <li>Profile information (profile picture, biography, preferences)</li>
              <li>Financial information (payment method details, transaction history)</li>
              <li>Communication data (messages sent through our platform)</li>
              <li>Verification documents (ID verification may be required for certain transactions)</li>
            </ul>

            <h3>Information We Collect Automatically</h3>
            <p>When you use our Services, we automatically collect certain information, including:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent on site, links clicked)</li>
              <li>Location information (based on IP address or device settings)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Log data (access times, hardware and software information)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and administer escrow services</li>
              <li>Verify your identity and prevent fraud or unauthorized activities</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
              <li>Detect, investigate, and prevent security incidents and fraudulent transactions</li>
              <li>Debug to identify and repair errors in our Services</li>
              <li>Protect the rights, privacy, safety, and property of AccFlipper and others</li>
              <li>Comply with applicable laws, regulations, and legal processes</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>How We Share Your Information</h2>
            <p>We may share your personal information in the following circumstances:</p>

            <h3>With Other Users</h3>
            <p>
              When you use our Services to buy, sell, or exchange accounts, certain information may be shared with other users
              involved in the transaction. This may include your username, public profile information, and communications
              necessary to complete the transaction.
            </p>

            <h3>With Service Providers</h3>
            <p>
              We share information with third-party service providers who help us operate our business and provide our Services,
              such as payment processors, escrow services, identity verification services, cloud hosting providers, customer
              support tools, and analytics services.
            </p>

            <h3>For Legal Reasons</h3>
            <p>
              We may disclose information if we believe in good faith that disclosure is necessary to:
            </p>
            <ul>
              <li>Comply with applicable laws, regulations, legal processes, or governmental requests</li>
              <li>Protect our rights, privacy, safety, or property</li>
              <li>Protect the rights, privacy, safety, or property of our users or others</li>
              <li>Detect, prevent, or address fraud, security, or technical issues</li>
              <li>Enforce our Terms of Service or other agreements</li>
            </ul>

            <h3>Business Transfers</h3>
            <p>
              If AccFlipper is involved in a merger, acquisition, or sale of all or a portion of its assets, your information
              may be transferred as part of that transaction. We will notify you of any change in ownership or uses of your
              personal information.
            </p>

            <h3>With Your Consent</h3>
            <p>
              We may share your information with third parties when you have given us your consent to do so.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Escrow Services and Payment Processing</h2>
            <p>
              Our platform uses escrow services to facilitate secure transactions between buyers and sellers. When you use these
              services, additional information may be collected directly by our escrow service partners to process payments and
              verify identity in accordance with anti-money laundering regulations.
            </p>
            <p>
              The information collected by escrow services may include:
            </p>
            <ul>
              <li>Full legal name and date of birth</li>
              <li>Government-issued identification documents</li>
              <li>Bank account or payment card details</li>
              <li>Tax identification numbers</li>
              <li>Source of funds information</li>
            </ul>
            <p>
              Our escrow service partners maintain their own privacy policies governing the use and protection of your data.
              We encourage you to review their privacy policies before using their services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information.
              However, please be aware that no method of transmission over the Internet or method of electronic storage is 100%
              secure. While we strive to use commercially acceptable means to protect your personal information, we cannot
              guarantee its absolute security.
            </p>
            <p>
              Our security measures include:
            </p>
            <ul>
              <li>Encryption of sensitive information</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication procedures</li>
              <li>Regular system backups and updates</li>
              <li>Employee training on data security practices</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
              unless a longer retention period is required or permitted by law. When determining how long to retain information, we
              consider:
            </p>
            <ul>
              <li>The nature of the information and the purposes for which it was collected</li>
              <li>Legal and regulatory requirements</li>
              <li>Potential or ongoing legal claims</li>
              <li>Guidance from relevant authorities</li>
            </ul>
            <p>
              When we no longer need to use your information, we will either delete it or anonymize it so that it can no longer be
              associated with you.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Your Choices and Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>

            <h3>Access and Portability</h3>
            <p>
              You may request a copy of the personal information we hold about you and request that we transfer it to another service
              provider where technically feasible.
            </p>

            <h3>Correction</h3>
            <p>
              You may request that we correct inaccurate or incomplete information we hold about you.
            </p>

            <h3>Deletion</h3>
            <p>
              You may request that we delete your personal information, subject to certain exceptions provided by law.
            </p>

            <h3>Restriction and Objection</h3>
            <p>
              You may request that we restrict the processing of your information or object to our processing of your information.
            </p>

            <h3>Opt-Out</h3>
            <p>
              You may opt out of marketing communications by following the unsubscribe instructions included in our emails or
              contacting us directly.
            </p>

            <p>
              To exercise these rights, please contact us at privacy@accflipper.com. We will respond to your request within
              the timeframe required by applicable law.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Google API Services</h2>
            <p>
              Our Services may utilize Google API services. When you connect your Google account to our Services, we access and
              collect information from your Google account in accordance with the Google API Services User Data Policy and our
              data practices described in this Privacy Policy.
            </p>
            <p>
              The information we collect from Google APIs may include:
            </p>
            <ul>
              <li>Basic profile information (name, email address, profile picture)</li>
              <li>Calendar data (for scheduling transactions or appointments)</li>
              <li>Contact information (when you choose to share your contacts)</li>
            </ul>
            <p>
              We use this information only for the features and purposes described to you at the time of consent. Our use and transfer
              to any other app of information received from Google APIs will adhere to the
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
                Google API Services User Data Policy
              </a>, including the Limited Use requirements.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Children's Privacy</h2>
            <p>
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from
              children under 18. If we learn that we have collected personal information from a child under 18, we will take steps to
              delete such information as soon as possible. If you believe that we might have any information from or about a child
              under 18, please contact us at privacy@accflipper.com.
            </p>
          </section>

          <section className="privacy-section">
            <h2>International Data Transfers</h2>
            <p>
              AccFlipper operates globally, which means your information may be transferred to, stored in, and processed in countries
              other than your country of residence. These countries may have data protection laws that are different from the laws of
              your country.
            </p>
            <p>
              When we transfer your information across borders, we implement appropriate safeguards to ensure your information is
              protected in accordance with this Privacy Policy and applicable laws. These safeguards may include:
            </p>
            <ul>
              <li>Standard contractual clauses approved by relevant authorities</li>
              <li>Data protection agreements with our service providers and partners</li>
              <li>Compliance with regional data protection frameworks</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal,
              or regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul>
              <li>Posting the updated policy on our website</li>
              <li>Sending an email notification to the address associated with your account</li>
              <li>Displaying a notice within our Services</li>
            </ul>
            <p>
              Your continued use of our Services after the revised Privacy Policy has become effective indicates that you have read,
              understood, and agreed to the current version.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <address>
              AccFlipper<br />
              Attn: Privacy Officer<br />
              Email: privacy@accflipper.com<br />
              Address: 123 Canal Avenue, Khawaja Banglows, Rahim Yar Khan, Pakistan 64200<br />
              Phone: +92 (305) 845-2080
            </address>
            <p>
              We will respond to your inquiry within a reasonable timeframe.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
