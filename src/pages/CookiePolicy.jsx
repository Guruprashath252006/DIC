import React from 'react'
import AnimatedSection from '../components/AnimatedSection'

export default function CookiePolicy() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <h1 className="heading-1">Cookie Policy</h1>
            <p className="lead">How we use cookies to improve your experience.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <AnimatedSection>
            <div className="content-rich">
              <h2>What Are Cookies?</h2>
              <p>Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
              
              <h2>How We Use Cookies</h2>
              <p>De Interio Café uses cookies for several reasons:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly.</li>
                <li><strong>Performance Cookies:</strong> These cookies collect information about how visitors use a website, for instance which pages visitors go to most often.</li>
                <li><strong>Functional Cookies:</strong> These allow the website to remember choices you make (such as your user name, language or the region you are in).</li>
              </ul>

              <h2>Managing Cookies</h2>
              <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noreferrer">www.aboutcookies.org</a>.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
