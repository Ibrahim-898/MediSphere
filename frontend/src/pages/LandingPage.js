// filepath: src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <div className="landing-nav-logo">M</div>
          MediSphere
        </div>
        <div className="landing-nav-links">
          <Link to="/auth" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title slide-up">
            Hospital Patient Report Management
          </h1>
          <p className="landing-hero-subtitle slide-up stagger-1">
            A comprehensive platform for managing patient reports, lab results, and prescriptions. 
            Streamline healthcare workflows with secure, efficient, and user-friendly tools.
          </p>
          <div className="landing-hero-buttons slide-up stagger-2">
            <Link to="/auth" className="btn btn-light">
              Login to Portal
            </Link>
            <Link to="/auth?tab=register" className="btn btn-outline-light">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-features-title">Platform Features</h2>
        <div className="landing-features-grid">
          <div className="landing-feature-card slide-up stagger-1">
            <div className="landing-feature-icon">📋</div>
            <h3 className="landing-feature-title">Patient Reports</h3>
            <p className="landing-feature-text">
              Patients can securely view their lab reports, test results, and prescriptions online.
            </p>
          </div>
          <div className="landing-feature-card slide-up stagger-2">
            <div className="landing-feature-icon">👨‍⚕️</div>
            <h3 className="landing-feature-title">Doctor Portal</h3>
            <p className="landing-feature-text">
              Doctors can view patient reports, create prescriptions, and manage patient care efficiently.
            </p>
          </div>
          <div className="landing-feature-card slide-up stagger-3">
            <div className="landing-feature-icon">🔬</div>
            <h3 className="landing-feature-title">Lab Management</h3>
            <p className="landing-feature-text">
              Lab assistants can upload and manage lab reports, track test statuses, and update results.
            </p>
          </div>
          <div className="landing-feature-card slide-up stagger-4">
            <div className="landing-feature-icon">🔒</div>
            <h3 className="landing-feature-title">Secure & Private</h3>
            <p className="landing-feature-text">
              Role-based access control ensures data privacy and security for all users.
            </p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p className="landing-footer-text">
          © 2026 MediSphere. All rights reserved. | Hospital Patient Report Management System
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;