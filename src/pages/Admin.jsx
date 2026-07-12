import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Lock, LayoutDashboard, Settings, BarChart3, Users, 
  Download, CheckCircle2, XCircle, Trash2, LogOut, MessageSquare, Phone
} from 'lucide-react'
import './Admin.css'

const SEED_INQUIRIES = [
  {
    id: 'seed-1',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@outlook.com',
    phone: '+91 98402 12345',
    service: 'Signature Interior Project',
    budget: '₹10L – ₹25L',
    message: 'Looking for a full interior redesign for my 3BHK apartment in Adyar. Prefer contemporary minimalist theme.',
    date: '18 May 2026',
    status: 'Pending'
  },
  {
    id: 'seed-2',
    name: 'Vikram & Meera Dev',
    email: 'meera.dev@gmail.com',
    phone: '+91 97909 87654',
    service: 'Modular Kitchens',
    budget: '₹2L – ₹5L',
    message: 'Need an L-shaped modular kitchen layout with high-gloss acrylic finish and smart storage solutions.',
    date: '20 May 2026',
    status: 'Resolved'
  },
  {
    id: 'seed-3',
    name: 'Zenith77 Tech Labs',
    email: 'corp@zenith77.com',
    phone: '+91 95000 78674',
    service: 'Signature Interior Project',
    budget: '₹50L+',
    message: 'We require office space planning and interior design for our new 50-seater software development center.',
    date: '21 May 2026',
    status: 'Pending'
  }
]

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('inquiries')
  
  // Dashboard states
  const [inquiries, setInquiries] = useState([])
  const [settings, setSettings] = useState({ whatsappActive: true, chatbotActive: true })
  const [downloads, setDownloads] = useState(142)

  useEffect(() => {
    // Check session
    const logged = sessionStorage.getItem('dic_admin_logged')
    if (logged === 'true') {
      setIsLoggedIn(true)
    }

    // Load inquiries
    const storedInquiries = localStorage.getItem('dic_inquiries')
    if (storedInquiries) {
      try {
        setInquiries(JSON.parse(storedInquiries))
      } catch (e) {
        console.error(e)
      }
    } else {
      localStorage.setItem('dic_inquiries', JSON.stringify(SEED_INQUIRIES))
      setInquiries(SEED_INQUIRIES)
    }

    // Load settings
    const storedSettings = localStorage.getItem('dic_settings')
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings))
      } catch (e) {
        console.error(e)
      }
    }

    // Load downloads
    const storedDownloads = localStorage.getItem('dic_catalog_downloads')
    if (storedDownloads) {
      setDownloads(parseInt(storedDownloads, 10))
    } else {
      localStorage.setItem('dic_catalog_downloads', '142')
    }

    // Setup Storage Update Listener
    const handleStorageUpdate = () => {
      const updatedInq = localStorage.getItem('dic_inquiries')
      if (updatedInq) setInquiries(JSON.parse(updatedInq))
      
      const updatedSet = localStorage.getItem('dic_settings')
      if (updatedSet) setSettings(JSON.parse(updatedSet))

      const updatedDls = localStorage.getItem('dic_catalog_downloads')
      if (updatedDls) setDownloads(parseInt(updatedDls, 10))
    }

    window.addEventListener('storage-update', handleStorageUpdate)
    return () => window.removeEventListener('storage-update', handleStorageUpdate)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setIsLoggedIn(true)
      sessionStorage.setItem('dic_admin_logged', 'true')
      setError('')
    } else {
      setError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('dic_admin_logged')
    setLoginForm({ username: '', password: '' })
  }

  const handleToggleStatus = (id) => {
    const updated = inquiries.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Pending' ? 'Resolved' : 'Pending' }
      }
      return item
    })
    setInquiries(updated)
    localStorage.setItem('dic_inquiries', JSON.stringify(updated))
    window.dispatchEvent(new Event('storage-update'))
  }

  const handleDeleteInquiry = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      const updated = inquiries.filter(item => item.id !== id)
      setInquiries(updated)
      localStorage.setItem('dic_inquiries', JSON.stringify(updated))
      window.dispatchEvent(new Event('storage-update'))
    }
  }

  const handleToggleSetting = (key) => {
    const updatedSettings = { ...settings, [key]: !settings[key] }
    setSettings(updatedSettings)
    localStorage.setItem('dic_settings', JSON.stringify(updatedSettings))
    window.dispatchEvent(new Event('storage-update'))
  }

  if (!isLoggedIn) {
    return (
      <main className="admin-login-page">
        <div className="container admin-login-container">
          <motion.div 
            className="card admin-login-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="admin-login-header">
              <div className="admin-login-icon">
                <Lock size={24} />
              </div>
              <h1 className="heading-2">Admin Portal</h1>
              <p className="body-sm">De Interio Café System Management</p>
            </div>
            
            <form onSubmit={handleLogin} className="admin-login-form">
              {error && <div className="admin-error-msg">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  className="form-control"
                  placeholder="Enter username" 
                  required
                  value={loginForm.username}
                  onChange={e => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-control"
                  placeholder="Enter password" 
                  required
                  value={loginForm.password}
                  onChange={e => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>

              <button type="submit" className="btn btn-primary admin-login-btn">
                AUTHENTICATE
              </button>
            </form>
            <div className="admin-login-hint">
              <span>Hint: Use <strong>admin</strong> / <strong>admin</strong></span>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // Statistics counters
  const totalInquiries = inquiries.length
  const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length
  const resolvedInquiries = inquiries.filter(i => i.status === 'Resolved').length

  return (
    <main className="admin-dashboard-page">
      <div className="container admin-dashboard-container">
        {/* Header */}
        <div className="admin-dashboard-header">
          <div>
            <h1 className="heading-1">Dashboard</h1>
            <p className="lead">Manage consultation requests and live website configurations</p>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost admin-logout-btn">
            <LogOut size={16} /> LOGOUT
          </button>
        </div>

        {/* Analytics Summary */}
        <div className="grid-4 admin-stats-grid">
          <div className="card admin-stat-card glass-card">
            <div className="admin-stat-icon gold">
              <Users size={20} />
            </div>
            <div className="admin-stat-value">{totalInquiries}</div>
            <div className="admin-stat-label">Total Inquiries</div>
          </div>

          <div className="card admin-stat-card glass-card">
            <div className="admin-stat-icon orange">
              <BarChart3 size={20} />
            </div>
            <div className="admin-stat-value">{pendingInquiries}</div>
            <div className="admin-stat-label">Pending Reviews</div>
          </div>

          <div className="card admin-stat-card glass-card">
            <div className="admin-stat-icon green">
              <CheckCircle2 size={20} />
            </div>
            <div className="admin-stat-value">{resolvedInquiries}</div>
            <div className="admin-stat-label">Resolved Consultation</div>
          </div>

          <div className="card admin-stat-card glass-card">
            <div className="admin-stat-icon blue">
              <Download size={20} />
            </div>
            <div className="admin-stat-value">{downloads}</div>
            <div className="admin-stat-label">E-Catalog Downloads</div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="admin-layout-grid">
          {/* Navigation Sidebar */}
          <aside className="admin-sidebar card glass-card">
            <button 
              onClick={() => setActiveTab('inquiries')} 
              className={`admin-nav-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} /> Inquiries
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <Settings size={18} /> Site Settings
            </button>
          </aside>

          {/* Core Panel Content */}
          <section className="admin-main-panel card glass-card">
            {activeTab === 'inquiries' && (
              <div className="admin-panel-content">
                <h2 className="heading-3">Consultation Requests</h2>
                <p className="body-sm panel-subtitle">Real-time submissions from the Contact form</p>

                {inquiries.length === 0 ? (
                  <div className="admin-empty-state">
                    No inquiries received yet.
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Client</th>
                          <th>Service & Budget</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.map(item => (
                          <tr key={item.id} className={item.status === 'Resolved' ? 'resolved-row' : ''}>
                            <td>
                              <div className="client-info">
                                <span className="client-name">{item.name}</span>
                                <span className="client-contact">{item.email}</span>
                                <span className="client-contact">{item.phone}</span>
                              </div>
                            </td>
                            <td>
                              <div className="service-info">
                                <span className="service-badge">{item.service}</span>
                                <span className="budget-tag">{item.budget}</span>
                              </div>
                            </td>
                            <td>
                              <p className="client-message" title={item.message}>
                                {item.message}
                              </p>
                            </td>
                            <td>
                              <span className="inquiry-date">{item.date}</span>
                            </td>
                            <td>
                              <button 
                                onClick={() => handleToggleStatus(item.id)}
                                className={`status-badge ${item.status.toLowerCase()}`}
                                title="Click to toggle status"
                              >
                                {item.status}
                              </button>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button 
                                  onClick={() => handleDeleteInquiry(item.id)}
                                  className="action-btn delete"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="admin-panel-content">
                <h2 className="heading-3">Live Site Settings</h2>
                <p className="body-sm panel-subtitle">Toggle website interactive widgets globally</p>

                <div className="admin-settings-list">
                  <div className="admin-setting-item">
                    <div className="setting-description">
                      <div className="setting-title-row">
                        <MessageSquare size={18} className="setting-icon" />
                        <strong>Floating WhatsApp Button</strong>
                      </div>
                      <p className="body-sm">Toggle the display of the floating WhatsApp button in the bottom right corner of the website.</p>
                    </div>
                    <div className="setting-action">
                      <label className="switch-toggle">
                        <input 
                          type="checkbox" 
                          checked={settings.whatsappActive}
                          onChange={() => handleToggleSetting('whatsappActive')}
                        />
                        <span className="slider-round" />
                      </label>
                    </div>
                  </div>

                  <div className="admin-setting-item">
                    <div className="setting-description">
                      <div className="setting-title-row">
                        <Phone size={18} className="setting-icon" />
                        <strong>AI Chatbot Widget</strong>
                      </div>
                      <p className="body-sm">Toggle the visibility of the interactive AI Assistant chatbot widget globally.</p>
                    </div>
                    <div className="setting-action">
                      <label className="switch-toggle">
                        <input 
                          type="checkbox" 
                          checked={settings.chatbotActive} 
                          onChange={() => handleToggleSetting('chatbotActive')}
                        />
                        <span className="slider-round" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
