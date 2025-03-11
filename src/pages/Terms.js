import React from 'react';
import './Terms.css';

const Terms = () => {
  // Get current date for last updated
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: {lastUpdated}</p>
      </div>

      <div className="terms-content">
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            Welcome to AccFlipper. These Terms of Service ("Terms") govern your access to and use of AccFlipper's website, 
            mobile application, and services (collectively, the "Services"). Please read these Terms carefully.
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not 
            agree to these Terms, you may not access or use our Services.
          </p>
          <p>
            We may modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms 
            on our website and updating the "Last Updated" date. Your continued use of our Services after any modifications 
            indicates your acceptance of the modified Terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Account Registration and Eligibility</h2>
          <p>
            <strong>2.1 Eligibility:</strong> You must be at least 18 years old to create an account and use our Services. 
            By creating an account, you represent and warrant that you are at least 18 years old and that your use of our 
            Services does not violate any applicable laws or regulations.
          </p>
          <p>
            <strong>2.2 Account Creation:</strong> To access certain features of our Services, you must create an account. 
            You agree to provide accurate, current, and complete information during the registration process and to update 
            such information to keep it accurate, current, and complete.
          </p>
          <p>
            <strong>2.3 Account Security:</strong> You are responsible for maintaining the confidentiality of your account 
            credentials and for all activities that occur under your account. You agree to immediately notify us of any 
            unauthorized use of your account or any other breach of security.
          </p>
          <p>
            <strong>2.4 Verification:</strong> We may require additional verification of your identity, particularly for 
            high-value transactions or as required by applicable laws and regulations. You agree to cooperate with such 
            verification procedures.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Service Description</h2>
          <p>
            AccFlipper provides a platform for the valuation, buying, selling, and exchange of digital accounts ("Digital Assets"). 
            Our Services include:
          </p>
          <ul>
            <li>Account valuation services to determine the market value of Digital Assets</li>
            <li>A marketplace for buying and selling Digital Assets</li>
            <li>Escrow services to facilitate secure transactions between users</li>
            <li>Exchange services to facilitate the trading of Digital Assets between users</li>
          </ul>
          <p>
            <strong>3.1 Limitations:</strong> AccFlipper is a platform that connects buyers and sellers. We do not guarantee the 
            availability, quality, or performance of any Digital Assets listed on our platform. We are not responsible for any 
            disputes between users regarding the quality or performance of Digital Assets.
          </p>
          <p>
            <strong>3.2 Service Availability:</strong> We strive to maintain the availability of our Services but do not guarantee 
            that the Services will be available at all times or without interruption.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. User Conduct and Prohibited Activities</h2>
          <p>
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul>
            <li>Violating any applicable laws, regulations, or third-party rights</li>
            <li>Selling, buying, or exchanging Digital Assets that violate third-party terms of service or that were obtained 
              through unauthorized means</li>
            <li>Attempting to circumvent any security features or technological measures on our Services</li>
            <li>Using our Services for any illegal or unauthorized purpose</li>
            <li>Posting or transmitting malicious code, viruses, or other harmful computer code</li>
            <li>Engaging in fraudulent activities or misrepresenting information</li>
            <li>Interfering with the proper functioning of the Services</li>
            <li>Creating multiple accounts to evade restrictions or suspensions</li>
            <li>Harvesting or collecting information about other users without their consent</li>
            <li>Engaging in any activity that could damage, disable, or impair the Services</li>
          </ul>
          <p>
            We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion, 
            violates this provision, including removing content, terminating accounts, and reporting violators to law enforcement 
            authorities.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Listing and Transaction Policies</h2>
          <p>
            <strong>5.1 Listing Requirements:</strong> All Digital Assets listed on our platform must comply with our listing 
            guidelines. You must have full authority to sell or exchange any Digital Asset you list, and the Digital Asset must 
            be accurately described in your listing.
          </p>
          <p>
            <strong>5.2 Transaction Process:</strong> All transactions on our platform must be conducted through our provided 
            channels. Direct transactions between users outside our platform are prohibited and may result in account suspension.
          </p>
          <p>
            <strong>5.3 Escrow Services:</strong> We offer escrow services to protect both buyers and sellers. By using our 
            Services, you agree to the following escrow process:
          </p>
          <ol>
            <li>Buyer submits payment to AccFlipper's escrow account</li>
            <li>Seller transfers the Digital Asset to the buyer</li>
            <li>Buyer confirms receipt and satisfactory condition of the Digital Asset</li>
            <li>AccFlipper releases the payment to the seller, less applicable fees</li>
          </ol>
          <p>
            <strong>5.4 Fees:</strong> We charge fees for our Services, including transaction fees, escrow fees, and premium 
            service fees. All applicable fees will be displayed before you complete a transaction. We reserve the right to 
            change our fee structure at any time with notice posted on our website.
          </p>
          <p>
            <strong>5.5 Taxes:</strong> You are solely responsible for determining what, if any, taxes apply to your 
            transactions. AccFlipper is not responsible for determining the taxes that apply to your transactions.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Valuation Services</h2>
          <p>
            <strong>6.1 Valuation Methodology:</strong> Our valuation services provide an estimated market value for Digital 
            Assets based on various factors, including historical sales data, market trends, and asset characteristics.
          </p>
          <p>
            <strong>6.2 Limitations:</strong> Valuations provided by AccFlipper are estimates only and do not guarantee that a 
            Digital Asset will sell for the estimated value. The actual sale price may vary based on market conditions, buyer 
            demand, and other factors.
          </p>
          <p>
            <strong>6.3 Third-Party Information:</strong> Our valuations may rely on information provided by third parties. 
            We do not guarantee the accuracy of such information and are not liable for any errors or inaccuracies in our 
            valuations resulting from incorrect third-party information.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Intellectual Property</h2>
          <p>
            <strong>7.1 Our Intellectual Property:</strong> The Services, including all content, features, functionality, and 
            user interfaces, are owned by AccFlipper or its licensors and are protected by copyright, trademark, and other 
            intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without 
            our express written consent.
          </p>
          <p>
            <strong>7.2 Your Content:</strong> You retain ownership of any content you submit to our Services. By submitting 
            content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, 
            translate, and distribute such content in connection with providing and promoting our Services.
          </p>
          <p>
            <strong>7.3 Digital Assets:</strong> AccFlipper does not claim ownership of the Digital Assets listed on our 
            platform. However, by listing a Digital Asset, you grant us permission to display information about the Digital 
            Asset and to facilitate transactions involving the Digital Asset.
          </p>
          <p>
            <strong>7.4 Feedback:</strong> If you provide feedback, suggestions, or ideas about our Services, you grant us 
            the right to use such feedback without restriction and without compensation to you.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Privacy and Data</h2>
          <p>
            Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Services, 
            you agree to our collection and use of information in accordance with our Privacy Policy.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Termination</h2>
          <p>
            <strong>9.1 Termination by You:</strong> You may terminate your account at any time by following the instructions 
            on our website. Termination will not affect any pending transactions or relieve you of any outstanding obligations.
          </p>
          <p>
            <strong>9.2 Termination by Us:</strong> We reserve the right to suspend or terminate your access to our Services 
            at any time and for any reason, including but not limited to:
          </p>
          <ul>
            <li>Violation of these Terms</li>
            <li>Engaging in prohibited activities</li>
            <li>Creating risk or possible legal exposure for AccFlipper</li>
            <li>Extended periods of inactivity</li>
            <li>Suspicion of fraudulent or illegal activities</li>
          </ul>
          <p>
            <strong>9.3 Effect of Termination:</strong> Upon termination, your right to access and use our Services will 
            immediately cease. We may delete your account information and any content associated with your account.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Disclaimers</h2>
          <p>
            <strong>10.1 "AS IS" Basis:</strong> OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT 
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
            FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
          </p>
          <p>
            <strong>10.2 Digital Assets:</strong> AccFlipper does not guarantee the quality, safety, or legality of any Digital 
            Assets listed on our platform. We do not endorse or recommend any particular Digital Asset and are not responsible 
            for any loss or damage resulting from your transactions.
          </p>
          <p>
            <strong>10.3 Third-Party Services:</strong> Our Services may contain links to third-party websites or services that 
            are not owned or controlled by AccFlipper. We have no control over, and assume no responsibility for, the content, 
            privacy policies, or practices of any third-party websites or services.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ACCFLIPPER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, 
            RESULTING FROM:
          </p>
          <ul>
            <li>YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SERVICES;</li>
            <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES;</li>
            <li>ANY CONTENT OBTAINED FROM THE SERVICES; AND</li>
            <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.</li>
          </ul>
          <p>
            IN NO EVENT SHALL ACCFLIPPER'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS RELATING TO THE SERVICES EXCEED THE AMOUNT 
            PAID BY YOU TO ACCFLIPPER FOR THE SERVICES DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE DATE OF THE 
            CLAIM.
          </p>
        </section>

        <section className="terms-section">
          <h2>12. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless AccFlipper, its affiliates, licensors, and service providers, 
            and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, 
            and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees 
            (including reasonable attorneys' fees) arising out of or relating to:
          </p>
          <ul>
            <li>Your violation of these Terms;</li>
            <li>Your use of our Services;</li>
            <li>Your violation of any third-party rights; or</li>
            <li>Your violation of any applicable laws, rules, or regulations.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>13. Dispute Resolution</h2>
          <p>
            <strong>13.1 Governing Law:</strong> These Terms and your use of the Services shall be governed by and construed 
            in accordance with the laws of the state of [State], without giving effect to any choice or conflict of law provision 
            or rule.
          </p>
          <p>
            <strong>13.2 Informal Dispute Resolution:</strong> Before filing a claim against AccFlipper, you agree to attempt 
            to resolve the dispute informally by contacting us at disputes@accflipper.com. We will attempt to resolve the dispute 
            informally by contacting you via email. If the dispute is not resolved within thirty (30) days of submission, either 
            party may proceed with formal resolution methods.
          </p>
          <p>
            <strong>13.3 Arbitration:</strong> Any dispute arising from or relating to these Terms or our Services shall be 
            finally settled by binding arbitration administered by [Arbitration Association] under its Commercial Arbitration 
            Rules, except as modified by these Terms.
          </p>
          <p>
            <strong>13.4 Class Action Waiver:</strong> YOU AND ACCFLIPPER AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER 
            ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR 
            REPRESENTATIVE PROCEEDING.
          </p>
          <p>
            <strong>13.5 Jurisdiction and Venue:</strong> Any legal action or proceeding arising under these Terms shall be brought 
            exclusively in the state or federal courts located in [City, State], and you consent to the personal jurisdiction and 
            venue therein.
          </p>
        </section>

        <section className="terms-section">
          <h2>14. General Provisions</h2>
          <p>
            <strong>14.1 Entire Agreement:</strong> These Terms constitute the entire agreement between you and AccFlipper 
            regarding your use of our Services and supersede all prior agreements and understandings.
          </p>
          <p>
            <strong>14.2 Waiver:</strong> No waiver of any term or condition set forth in these Terms shall be deemed a further 
            or continuing waiver of such term or condition or a waiver of any other term or condition.
          </p>
          <p>
            <strong>14.3 Severability:</strong> If any provision of these Terms is held to be invalid, illegal, or unenforceable, 
            such provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable, while 
            preserving its intent. The remaining provisions shall remain in full force and effect.
          </p>
          <p>
            <strong>14.4 Assignment:</strong> You may not assign or transfer these Terms or any rights or obligations hereunder 
            without our prior written consent. AccFlipper may assign or transfer these Terms without restriction.
          </p>
          <p>
            <strong>14.5 Force Majeure:</strong> AccFlipper shall not be liable for any failure or delay in performing its 
            obligations if such failure or delay is due to causes beyond its reasonable control, including but not limited to 
            natural disasters, acts of war or terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, 
            accidents, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials.
          </p>
          <p>
            <strong>14.6 Contact Information:</strong> Questions or comments about these Terms should be directed to:
          </p>
          <address>
            AccFlipper<br />
            Attn: Legal Department<br />
            Email: legal@accflipper.com<br />
            Address: 123 Canal Avenue, Khawaja Banglows, Rahim Yar Khan, Pakistan 64200<br />
            Phone: +92 (305) 845-2080
          </address>
        </section>

        <section className="terms-section">
          <h2>15. Additional Terms for Specific Services</h2>
          <p>
            We may offer additional services with separate terms that apply in addition to these Terms. Those additional 
            terms will be made available to you before you use the applicable services and will become part of your agreement 
            with us if you use those services.
          </p>
        </section>

        <div className="terms-acceptance">
          <p>
            By using AccFlipper Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
