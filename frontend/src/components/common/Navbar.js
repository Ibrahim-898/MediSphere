// filepath: src/components/common/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'Patient':
        return '/patient/dashboard';
      case 'Doctor':
        return '/doctor/dashboard';
      case 'Lab Specialist':
        return '/lab/dashboard';
      case 'Admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="navbar-logo">M</div>
        MediSphere
      </Link>

      {isAuthenticated ? (
        <div className="navbar-user">
          <div className="navbar-user-info">
            <div className="navbar-user-name">{user?.email}</div>
            <div className="navbar-user-role">{user?.role}</div>
          </div>
          <Link to={getDashboardLink()} className="btn btn-outline">
            Dashboard
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      ) : (
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/auth" className="btn btn-primary">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;