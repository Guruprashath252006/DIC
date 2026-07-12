import React from 'react'
import AnimatedSection from '../components/AnimatedSection'

export default function TermsAndConditions() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <h1 className="heading-1">Terms & Conditions</h1>
            <p className="lead">Please read these terms carefully before using our services.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <AnimatedSection>
            <div className="content-rich">
              <h2>1. Agreement to Terms</h2>
              <p>By accessing or using the De Interio Café website, you agree to be bound by these Terms and Conditions.</p>
              
              <h2>2. Intellectual Property</h2>
              <p>The content, designs, images, and brand name "De Interio Café" are protected by copyright and intellectual property laws. You may not use, reproduce, or distribute any part of this website without our prior written consent.</p>

              <h2>3. Services</h2>
              <p>De Interio Café provides interior design and consultancy services. All projects are subject to separate service agreements between the company and the client.</p>

              <h2>4. Limitation of Liability</h2>
              <p>De Interio Café shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website or services.</p>

              <h2>5. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Chennai.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
