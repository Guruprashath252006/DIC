import React from 'react'
import AnimatedSection from '../components/AnimatedSection'

export default function PrivacyPolicy() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <h1 className="heading-1">Privacy Policy</h1>
            <p className="lead">Last updated: May 06, 2026</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <AnimatedSection>
            <div className="content-rich">
              <h2>1. Introduction</h2>
              <p>Welcome to De Interio Café. We respect your privacy and are committed to protecting your personal data.</p>
              
              <h2>2. Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul>
                <li><strong>Identity Data:</strong> first name, last name.</li>
                <li><strong>Contact Data:</strong> email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting and location.</li>
              </ul>

              <h2>3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul>
                <li>To provide our interior design services.</li>
                <li>To contact you regarding your inquiries.</li>
                <li>To improve our website and user experience.</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way.</p>

              <h2>5. Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us at:</p>
              <p>Email: mohanaraodeinteriocafe@gmail.com</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
