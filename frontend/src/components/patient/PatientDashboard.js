// filepath: src/components/patient/PatientDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const PatientDashboard = () => {
  const { user, token } = useAuth();
  const [reports, setReports] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reports');

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      // Fetch lab reports
      const reportsResponse = await api.lab.getReports(token);
      if (reportsResponse.message !== 'Lab API coming soon') {
        setReports(reportsResponse);
      }

      // Fetch prescriptions
      const prescriptionsResponse = await api.prescriptions.getAll(token);
      if (prescriptionsResponse.message !== 'Prescriptions API coming soon') {
        setPrescriptions(prescriptionsResponse);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <a href="#reports" className={`sidebar-nav-link ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
              <span className="sidebar-nav-icon">📋</span>
              My Reports
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#prescriptions" className={`sidebar-nav-link ${activeTab === 'prescriptions' ? 'active' : ''}`} onClick={() => setActiveTab('prescriptions')}>
              <span className="sidebar-nav-icon">💊</span>
              Prescriptions
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#profile" className="sidebar-nav-link">
              <span className="sidebar-nav-icon">👤</span>
              My Profile
            </a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome, {user?.email}</h1>
            <p className="dashboard-subtitle">Patient Dashboard</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">📋</div>
            <div className="stat-content">
              <h3 className="stat-value">{reports.length}</h3>
              <p className="stat-label">Lab Reports</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">💊</div>
            <div className="stat-content">
              <h3 className="stat-value">{prescriptions.length}</h3>
              <p className="stat-label">Prescriptions</p>
            </div>
          </div>
        </div>

        {activeTab === 'reports' && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">My Lab Reports</h2>
            </div>

            {reports.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h3 className="empty-state-title">No Reports Yet</h3>
                <p className="empty-state-text">Your lab reports will appear here once your doctor orders tests.</p>
              </div>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="report-card">
                  <div className="report-card-header">
                    <h3 className="report-card-title">Lab Report #{report.id}</h3>
                    <span className={`badge badge-${report.status === 'completed' ? 'success' : 'warning'}`}>
                      {report.status || 'Pending'}
                    </span>
                  </div>
                  <div className="report-card-body">
                    <div className="report-info">
                      <div className="report-info-item">
                        <span className="report-info-label">Test Type</span>
                        <span className="report-info-value">{report.testType || 'N/A'}</span>
                      </div>
                      <div className="report-info-item">
                        <span className="report-info-label">Report Date</span>
                        <span className="report-info-value">
                          {report.reportDate ? new Date(report.reportDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="report-info-item">
                        <span className="report-info-label">Lab Specialist</span>
                        <span className="report-info-value">{report.labId || 'N/A'}</span>
                      </div>
                    </div>
                    {report.results && (
                      <div className="report-results">
                        <h4 className="report-results-title">Test Results</h4>
                        {Object.entries(report.results).map(([key, value]) => (
                          <div key={key} className="report-result-item">
                            <span className="report-result-name">{key}</span>
                            <span className="report-result-value">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {report.conclusion && (
                      <div className="report-results">
                        <h4 className="report-results-title">Conclusion</h4>
                        <p>{report.conclusion}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">My Prescriptions</h2>
            </div>

            {prescriptions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💊</div>
                <h3 className="empty-state-title">No Prescriptions</h3>
                <p className="empty-state-text">Your prescriptions will appear here once your doctor creates them.</p>
              </div>
            ) : (
              prescriptions.map((prescription) => (
                <div key={prescription.id} className="prescription-card">
                  <div className="prescription-card-header">
                    <h3 className="prescription-card-title">Prescription #{prescription.id}</h3>
                    <span className="badge badge-success">Active</span>
                  </div>
                  <div className="prescription-card-body">
                    <ul className="medication-list">
                      {prescription.medications && prescription.medications.map((med, index) => (
                        <li key={index} className="medication-item">
                          <div>
                            <span className="medication-name">{med.name}</span>
                            <span className="medication-dosage"> - {med.dosage}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {prescription.instructions && (
                      <div className="prescription-instructions">
                        <h4 className="prescription-instructions-title">Instructions</h4>
                        <p className="prescription-instructions-text">{prescription.instructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientDashboard;