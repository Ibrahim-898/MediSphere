// filepath: src/components/lab/LabDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const LabDashboard = () => {
  const { user, token } = useAuth();
  const [labTests, setLabTests] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tests');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [reportForm, setReportForm] = useState({
    results: {},
    conclusion: '',
  });
  const [newResultKey, setNewResultKey] = useState('');
  const [newResultValue, setNewResultValue] = useState('');

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      // Fetch lab tests
      const testsResponse = await api.lab.getReports(token);
      if (testsResponse.message !== 'Lab API coming soon') {
        setLabTests(testsResponse);
      }

      // Fetch existing reports
      const reportsResponse = await api.lab.getReports(token);
      if (reportsResponse.message !== 'Lab API coming soon') {
        setReports(reportsResponse);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResult = () => {
    if (newResultKey && newResultValue) {
      setReportForm((prev) => ({
        ...prev,
        results: { ...prev.results, [newResultKey]: newResultValue },
      }));
      setNewResultKey('');
      setNewResultValue('');
    }
  };

  const handleRemoveResult = (key) => {
    const updatedResults = { ...reportForm.results };
    delete updatedResults[key];
    setReportForm((prev) => ({
      ...prev,
      results: updatedResults,
    }));
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    try {
      const result = await api.lab.createReport(token, {
        testId: selectedTest?.id,
        results: reportForm.results,
        reportDate: new Date().toISOString(),
        conclusion: reportForm.conclusion,
      });
      
      if (result.message || result.id) {
        alert('Report created successfully!');
        setShowReportModal(false);
        setReportForm({ results: {}, conclusion: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating report:', error);
      alert('Failed to create report');
    }
  };

  const openReportModal = (test) => {
    setSelectedTest(test);
    setReportForm({ results: {}, conclusion: '' });
    setShowReportModal(true);
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
            <a href="#tests" className={`sidebar-nav-link ${activeTab === 'tests' ? 'active' : ''}`} onClick={() => setActiveTab('tests')}>
              <span className="sidebar-nav-icon">🧪</span>
              Lab Tests
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#reports" className={`sidebar-nav-link ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
              <span className="sidebar-nav-icon">📋</span>
              Reports
            </a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome, Lab Assistant</h1>
            <p className="dashboard-subtitle">Lab Dashboard</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon warning">🧪</div>
            <div className="stat-content">
              <h3 className="stat-value">{labTests.filter(t => t.status !== 'completed').length}</h3>
              <p className="stat-label">Pending Tests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">✅</div>
            <div className="stat-content">
              <h3 className="stat-value">{labTests.filter(t => t.status === 'completed').length}</h3>
              <p className="stat-label">Completed Tests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">📋</div>
            <div className="stat-content">
              <h3 className="stat-value">{reports.length}</h3>
              <p className="stat-label">Total Reports</p>
            </div>
          </div>
        </div>

        {activeTab === 'tests' && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">Lab Tests</h2>
            </div>

            {labTests.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🧪</div>
                <h3 className="empty-state-title">No Lab Tests</h3>
                <p className="empty-state-text">Lab tests assigned to you will appear here.</p>
              </div>
            ) : (
              labTests.map((test) => (
                <div key={test.id} className="report-card">
                  <div className="report-card-header">
                    <h3 className="report-card-title">Test #{test.id} - {test.testType || 'Lab Test'}</h3>
                    <span className={`badge badge-${test.status === 'completed' ? 'success' : test.status === 'testing' ? 'warning' : 'primary'}`}>
                      {test.status || 'ordered'}
                    </span>
                  </div>
                  <div className="report-card-body">
                    <div className="report-info">
                      <div className="report-info-item">
                        <span className="report-info-label">Test Type</span>
                        <span className="report-info-value">{test.testType || 'N/A'}</span>
                      </div>
                      <div className="report-info-item">
                        <span className="report-info-label">Patient ID</span>
                        <span className="report-info-value">{test.patientId || 'N/A'}</span>
                      </div>
                      <div className="report-info-item">
                        <span className="report-info-label">Doctor ID</span>
                        <span className="report-info-value">{test.doctorId || 'N/A'}</span>
                      </div>
                      <div className="report-info-item">
                        <span className="report-info-label">Sample Collected</span>
                        <span className="report-info-value">
                          {test.sampleCollected ? new Date(test.sampleCollected).toLocaleDateString() : 'Not collected'}
                        </span>
                      </div>
                    </div>
                    {test.notes && (
                      <div className="report-results">
                        <h4 className="report-results-title">Notes</h4>
                        <p>{test.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="report-card-footer">
                    {test.status !== 'completed' && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => openReportModal(test)}
                      >
                        Upload Report
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">Uploaded Reports</h2>
            </div>

            {reports.filter(r => r.status === 'completed').length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h3 className="empty-state-title">No Reports Uploaded</h3>
                <p className="empty-state-text">Reports you upload will appear here.</p>
              </div>
            ) : (
              reports.filter(r => r.status === 'completed').map((report) => (
                <div key={report.id} className="report-card">
                  <div className="report-card-header">
                    <h3 className="report-card-title">Report #{report.id}</h3>
                    <span className="badge badge-success">Completed</span>
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
      </main>

      {/* Report Upload Modal */}
      <div className={`modal-overlay ${showReportModal ? 'active' : ''}`}>
        <div className="modal" style={{ maxWidth: '600px' }}>
          <div className="modal-header">
            <h2 className="modal-title">Upload Lab Report</h2>
            <button className="modal-close" onClick={() => setShowReportModal(false)}>×</button>
          </div>
          <form onSubmit={handleCreateReport}>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Test</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={`Test #${selectedTest?.id} - ${selectedTest?.testType || 'Lab Test'}`}
                  disabled 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Test Results</label>
                <div style={{ marginBottom: '15px' }}>
                  {Object.entries(reportForm.results).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: '#f8f9fa', borderRadius: '4px', marginBottom: '8px' }}>
                      <span><strong>{key}:</strong> {value}</span>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveResult(key)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Result name (e.g., Hemoglobin)"
                    value={newResultKey}
                    onChange={(e) => setNewResultKey(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Value (e.g., 14.5 g/dL)"
                    value={newResultValue}
                    onChange={(e) => setNewResultValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleAddResult}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="conclusion">Conclusion</label>
                <textarea
                  id="conclusion"
                  className="form-control form-textarea"
                  placeholder="Enter conclusion/remarks"
                  value={reportForm.conclusion}
                  onChange={(e) => setReportForm((prev) => ({ ...prev, conclusion: e.target.value }))}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowReportModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Upload Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;