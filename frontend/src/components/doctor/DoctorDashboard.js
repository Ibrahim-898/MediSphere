// filepath: src/components/doctor/DoctorDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const DoctorDashboard = () => {
  const { user, token } = useAuth();
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('patients');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptionForm, setPrescriptionForm] = useState({
    medications: [{ name: '', dosage: '' }],
    instructions: '',
  });

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      // Fetch patients (would need proper endpoint)
      const patientsResponse = await api.profile.get(token);
      if (patientsResponse) {
        setPatients([patientsResponse]);
      }

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

  const handleAddMedication = () => {
    setPrescriptionForm((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '' }],
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    const updated = [...prescriptionForm.medications];
    updated[index][field] = value;
    setPrescriptionForm((prev) => ({
      ...prev,
      medications: updated,
    }));
  };

  const handleRemoveMedication = (index) => {
    setPrescriptionForm((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  const handleCreatePrescription = async (e) => {
    e.preventDefault();
    try {
      const result = await api.prescriptions.create(token, {
        patientId: selectedPatient?.id,
        medications: prescriptionForm.medications,
        instructions: prescriptionForm.instructions,
      });
      
      if (result.message) {
        alert('Prescription created successfully!');
        setShowPrescriptionModal(false);
        setPrescriptionForm({ medications: [{ name: '', dosage: '' }], instructions: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating prescription:', error);
      alert('Failed to create prescription');
    }
  };

  const openPrescriptionModal = (patient) => {
    setSelectedPatient(patient);
    setShowPrescriptionModal(true);
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
            <a href="#patients" className={`sidebar-nav-link ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>
              <span className="sidebar-nav-icon">👥</span>
              Patients
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#reports" className={`sidebar-nav-link ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
              <span className="sidebar-nav-icon">📋</span>
              Lab Reports
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a href="#prescriptions" className={`sidebar-nav-link ${activeTab === 'prescriptions' ? 'active' : ''}`} onClick={() => setActiveTab('prescriptions')}>
              <span className="sidebar-nav-icon">💊</span>
              Prescriptions
            </a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome, Dr. {user?.email}</h1>
            <p className="dashboard-subtitle">Doctor Dashboard</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">👥</div>
            <div className="stat-content">
              <h3 className="stat-value">{patients.length}</h3>
              <p className="stat-label">Patients</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">📋</div>
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

        {activeTab === 'patients' && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">Patient List</h2>
            </div>

            {patients.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <h3 className="empty-state-title">No Patients</h3>
                <p className="empty-state-text">Patient records will appear here.</p>
              </div>
            ) : (
              <div className="card">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.email}</td>
                        <td>{patient.role}</td>
                        <td>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => openPrescriptionModal(patient)}
                          >
                            Create Prescription
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">Lab Reports</h2>
            </div>

            {reports.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h3 className="empty-state-title">No Lab Reports</h3>
                <p className="empty-state-text">Lab reports will appear here.</p>
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
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">Prescriptions History</h2>
            </div>

            {prescriptions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💊</div>
                <h3 className="empty-state-title">No Prescriptions</h3>
                <p className="empty-state-text">Prescriptions you create will appear here.</p>
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

      {/* Prescription Modal */}
      <div className={`modal-overlay ${showPrescriptionModal ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-header">
            <h2 className="modal-title">Create Prescription</h2>
            <button className="modal-close" onClick={() => setShowPrescriptionModal(false)}>×</button>
          </div>
          <form onSubmit={handleCreatePrescription}>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Patient</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={selectedPatient?.email || ''} 
                  disabled 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Medications</label>
                {prescriptionForm.medications.map((med, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Medication name"
                      value={med.name}
                      onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      required
                    />
                    {prescriptionForm.medications.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveMedication(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleAddMedication}
                >
                  + Add Medication
                </button>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="instructions">Instructions</label>
                <textarea
                  id="instructions"
                  className="form-control form-textarea"
                  placeholder="Enter instructions for the patient"
                  value={prescriptionForm.instructions}
                  onChange={(e) => setPrescriptionForm((prev) => ({ ...prev, instructions: e.target.value }))}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowPrescriptionModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Prescription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;