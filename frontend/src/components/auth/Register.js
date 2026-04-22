// filepath: src/components/auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Patient',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register(formData.email, formData.password, formData.role);

    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => {
        navigate('/auth?tab=login');
      }, 2000);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const roles = [
    { value: 'Patient', label: 'Patient', icon: '👤' },
    { value: 'Doctor', label: 'Doctor', icon: '👨‍⚕️' },
    { value: 'Lab Specialist', label: 'Lab Assistant', icon: '🔬' },
  ];

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          <h1 className="auth-card-title">Create Account</h1>
          <p className="auth-card-subtitle">Join MediSphere today</p>
        </div>
        <div className="auth-card-body">
          {error && (
            <div className="alert alert-danger alert-dismissible">
              {error}
              <button className="btn-close" onClick={() => setError('')}>×</button>
            </div>
          )}
          {success && (
            <div className="alert alert-success alert-dismissible">
              {success}
              <button className="btn-close" onClick={() => setSuccess('')}>×</button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="role-select-group">
              <label className="role-select-label">Select Your Role</label>
              <div className="role-options">
                {roles.map((role) => (
                  <div key={role.value} className="role-option">
                    <input
                      type="radio"
                      id={role.value}
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={() => handleRoleChange(role.value)}
                    />
                    <label htmlFor={role.value}>
                      <span className="role-option-icon">{role.icon}</span>
                      <span className="role-option-text">{role.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block auth-submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p className="auth-footer">
            Already have an account? <button className="btn-link" onClick={() => navigate('/auth?tab=login')}>Sign in here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;