import React from 'react';
import '../styles/components.css';

export const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

export const ErrorMessage = ({ message, onDismiss }) => (
  <div className="error-message">
    <div className="error-content">
      <span className="error-icon">⚠️</span>
      <div className="error-text">
        <h4>Error</h4>
        <p>{message}</p>
      </div>
      {onDismiss && (
        <button className="error-close" onClick={onDismiss}>✕</button>
      )}
    </div>
  </div>
);

export const SuccessMessage = ({ message, onDismiss }) => (
  <div className="success-message">
    <div className="success-content">
      <span className="success-icon">✓</span>
      <p>{message}</p>
      {onDismiss && (
        <button className="success-close" onClick={onDismiss}>✕</button>
      )}
    </div>
  </div>
);

export const EmptyState = ({ title, description, action }) => (
  <div className="empty-state">
    <div className="empty-state-icon">📋</div>
    <h3>{title}</h3>
    <p>{description}</p>
    {action && <div>{action}</div>}
  </div>
);

export const Button = ({ 
  children, 
  variant = "primary", 
  size = "medium", 
  disabled = false,
  ...props 
}) => (
  <button 
    className={`btn btn-${variant} btn-${size}`} 
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </>
  );
};

export const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

export const Badge = ({ status }) => {
  const badgeClass = status === "Present" ? "badge-success" : "badge-danger";
  return <span className={`badge ${badgeClass}`}>{status}</span>;
};
